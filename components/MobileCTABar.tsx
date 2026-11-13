"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, MessageSquareText } from "lucide-react";
import { TEL_HREF, SMS_HREF, WHATSAPP_HREF } from "@/lib/contact";

/** Sticky bottom bar shown on phones only, so the next step is always one tap away. */
export function MobileCTABar() {
  const pathname = usePathname();
  if (pathname.startsWith("/seo-manager")) return null;

  const iconBtn =
    "flex items-center justify-center w-12 h-12 rounded-full border border-white/15 bg-white/[0.04] text-white/80 active:bg-ember/20";

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-50 flex items-center gap-2 px-4 pt-3 border-t border-white/10 bg-[#050505]/95 backdrop-blur-xl"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <Link
        href="/contact"
        className="flex-1 flex items-center justify-center h-12 rounded-full bg-ember text-black text-sm font-semibold tracking-wide"
      >
        Book a Call
      </Link>
      <a href={TEL_HREF} aria-label="Call us" className={iconBtn}>
        <Phone className="w-5 h-5" />
      </a>
      <a href={SMS_HREF} aria-label="Text us" className={iconBtn}>
        <MessageSquareText className="w-5 h-5" />
      </a>
      <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp us" className={iconBtn}>
        <MessageCircle className="w-5 h-5" />
      </a>
    </div>
  );
}
