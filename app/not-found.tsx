import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <PageShell
      eyebrow="404 Error"
      title={
        <>
          Page <span className="text-ember italic">Not Found</span>
        </>
      }
      intro="The page you are looking for doesn't exist, was removed, or the URL was mistyped."
    >
      <div className="px-8 md:px-14 max-w-[1500px] mx-auto pb-32 flex flex-col items-center text-center">
        <div className="p-12 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl max-w-lg w-full space-y-6">
          <div className="font-display text-8xl font-bold tracking-tighter text-ember animate-pulse">
            404
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Double-check the web address or navigate back to one of the main sections of our site.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-ember text-black font-semibold text-xs uppercase tracking-widest hover:bg-ember/90 transition-all shadow-lg shadow-ember/20"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-semibold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
