"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MAX_HISTORY_MESSAGES, MAX_QUESTION_CHARS, SITE_NAME } from "@/lib/chatbot/config";
import { parseEvent, type ChatMessage, type Source } from "@/lib/chatbot/protocol";
import { SUGGESTED_QUESTIONS } from "@/lib/chatbot/suggested-questions";

type UIMessage = ChatMessage & {
  id: number;
  sources?: Source[];
  status?: "streaming" | "done" | "error";
};

const GREETING = `Hi! I'm the ${SITE_NAME} assistant. Ask me about our services, pricing, or the industries we work with.`;
const NETWORK_ERROR = "Sorry, something went wrong. Please try again, or reach out through our contact page.";

let nextId = 1;

export default function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const updateMessage = (id: number, patch: (m: UIMessage) => Partial<UIMessage>) =>
    setMessages((all) => all.map((m) => (m.id === id ? { ...m, ...patch(m) } : m)));

  const send = useCallback(
    async (raw: string) => {
      const question = raw.trim().slice(0, MAX_QUESTION_CHARS);
      if (!question || busy) return;

      const userMessage: UIMessage = { id: nextId++, role: "user", content: question };
      const replyId = nextId++;
      const history: ChatMessage[] = [...messages, userMessage]
        .filter((m) => m.content && m.status !== "error")
        .slice(-MAX_HISTORY_MESSAGES)
        .map(({ role, content }) => ({ role, content }));
      // The API expects the window to start with a user message.
      while (history.length && history[0].role !== "user") history.shift();

      setMessages((all) => [...all, userMessage, { id: replyId, role: "assistant", content: "", status: "streaming" }]);
      setInput("");
      setBusy(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          const data = (await res.json().catch(() => null)) as { error?: string } | null;
          updateMessage(replyId, () => ({ content: data?.error ?? NETWORK_ERROR, status: "error" }));
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const event = line.trim() ? parseEvent(line) : null;
            if (!event) continue;
            if (event.type === "sources") updateMessage(replyId, () => ({ sources: event.sources }));
            else if (event.type === "delta") updateMessage(replyId, (m) => ({ content: m.content + event.text }));
            else if (event.type === "error")
              updateMessage(replyId, (m) => ({
                content: m.content ? `${m.content}\n\n${event.message}` : event.message,
                status: "error",
              }));
          }
        }
        updateMessage(replyId, (m) => ({
          status: m.status === "error" ? "error" : "done",
          content: m.content || NETWORK_ERROR,
        }));
      } catch {
        if (!controller.signal.aborted) updateMessage(replyId, () => ({ content: NETWORK_ERROR, status: "error" }));
      } finally {
        setBusy(false);
        inputRef.current?.focus();
      }
    },
    [busy, messages]
  );

  const showSuggestions = !messages.some((m) => m.role === "user");

  return (
    <div
      role="dialog"
      aria-label={`${SITE_NAME} chat assistant`}
      aria-hidden={!open}
      className={cn(
        "fixed z-[60] flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]/95 backdrop-blur-xl",
        "shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-200",
        "inset-x-3 bottom-[calc(10rem+env(safe-area-inset-bottom))] h-[min(65vh,560px)]",
        "md:inset-x-auto md:right-6 md:bottom-24 md:w-[390px] md:h-[min(70vh,600px)]",
        open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3 invisible"
      )}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
        <div>
          <p className="text-sm font-semibold text-white">{SITE_NAME} Assistant</p>
          <p className="text-[11px] text-white/45">Answers come from our website. Please don&apos;t share sensitive info.</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" aria-live="polite">
        <Bubble role="assistant">{GREETING}</Bubble>

        {showSuggestions && (
          <div className="flex flex-wrap gap-2 pt-1">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                disabled={busy}
                className="text-left text-xs px-3 py-1.5 rounded-full border border-ember/40 text-ember hover:bg-ember/10 disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className="space-y-1.5">
            <Bubble role={m.role} error={m.status === "error"}>
              {m.content || (m.status === "streaming" ? <TypingDots /> : null)}
            </Bubble>
            {m.role === "assistant" && m.status !== "streaming" && m.sources && m.sources.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pl-1">
                <span className="text-[11px] text-white/40">Read more:</span>
                {m.sources.map((s) => (
                  <Link
                    key={s.url}
                    href={s.url}
                    onClick={onClose}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.06] text-white/75 hover:text-ember hover:bg-white/10"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <form
        className="flex items-end gap-2 p-3 border-t border-white/10"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          rows={1}
          maxLength={MAX_QUESTION_CHARS}
          placeholder="Ask a question…"
          aria-label="Your question"
          className="flex-1 resize-none max-h-28 rounded-xl bg-white/[0.05] border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-ember/60"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          aria-label="Send"
          className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-ember text-black disabled:opacity-40"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

function Bubble({ role, error, children }: { role: ChatMessage["role"]; error?: boolean; children: React.ReactNode }) {
  return (
    <div className={cn("flex", role === "user" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words",
          role === "user" ? "bg-ember text-black rounded-br-md" : "bg-white/[0.06] text-white/85 rounded-bl-md",
          error && "border border-red-400/30"
        )}
      >
        {children}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1 py-1" aria-label="Assistant is typing">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}
