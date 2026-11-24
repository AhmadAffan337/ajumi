"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MessagesSquare, X } from "lucide-react";
import { cn } from "@/lib/utils";

// The panel (and its code) is only downloaded the first time someone opens the chat.
const ChatPanel = dynamic(() => import("./ChatPanel"), { ssr: false });

/** Floating chat button. Sits above the mobile CTA bar on phones. */
export function ChatLauncher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  if (pathname.startsWith("/seo-manager")) return null;

  const toggle = () => {
    setHasOpened(true);
    setOpen((o) => !o);
  };

  return (
    <>
      {/* Stays mounted after the first open so the conversation survives closing the panel. */}
      {hasOpened && <ChatPanel open={open} onClose={() => setOpen(false)} />}
      <button
        type="button"
        onClick={toggle}
        aria-label={open ? "Close chat" : "Ask us a question"}
        aria-expanded={open}
        className={cn(
          "fixed z-[60] right-4 md:right-6 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] md:bottom-6",
          "flex items-center justify-center w-14 h-14 rounded-full bg-ember text-black",
          "shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        )}
      >
        {open ? <X className="w-6 h-6" /> : <MessagesSquare className="w-6 h-6" />}
      </button>
    </>
  );
}
