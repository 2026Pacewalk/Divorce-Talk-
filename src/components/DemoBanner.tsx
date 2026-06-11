import { useDemoMode } from "@/hooks/useDemoMode";
import { RotateCcw, LogOut, Sparkles } from "lucide-react";

export default function DemoBanner() {
  const { isDemoMode, demoUser, exitDemo, resetDemo } = useDemoMode();

  if (!isDemoMode) return null;

  return (
    <div className="fixed top-[72px] left-0 right-0 z-[90] px-2 sm:px-4 pt-1.5 pb-1 pointer-events-none">
      <div className="pointer-events-auto max-w-[1400px] mx-auto rounded-xl bg-gradient-to-r from-[var(--dt-primary)] via-[#D6A492] to-[#D9B8A8] text-white shadow-dt-sm ring-1 ring-white/20 ring-offset-0 outline outline-1 outline-dashed outline-white/55 outline-offset-2">
        <div className="px-3 sm:px-5 py-2.5 flex flex-wrap items-center gap-x-3 gap-y-2">
          {/* Left: status */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="grid place-items-center w-6 h-6 rounded-full bg-white/15 shrink-0">
              <Sparkles size={13} />
            </span>
            <p className="text-[13px] font-semibold leading-tight truncate">
              Demo Mode — Signed in as{" "}
              <span className="font-bold">{demoUser?.username}</span>
              {demoUser?.role === "admin" && (
                <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-semibold tracking-wide uppercase">
                  Admin
                </span>
              )}
              {demoUser?.role === "moderator" && (
                <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-semibold tracking-wide uppercase">
                  {demoUser?.isListener ? "Listener" : "Moderator"}
                </span>
              )}
            </p>
          </div>

          {/* Divider + description (desktop only — too long for mobile) */}
          <div className="hidden md:flex items-center gap-3 flex-1 min-w-0">
            <span aria-hidden className="h-4 w-px bg-white/35 shrink-0" />
            <p className="text-[12.5px] text-white/85 truncate">
              You are exploring demo data. No real data is saved.
            </p>
          </div>

          {/* Right: buttons */}
          <div className="flex items-center gap-2 ml-auto shrink-0">
            <button
              type="button"
              onClick={resetDemo}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 border border-white/30 transition-colors"
            >
              <RotateCcw size={12} />
              Reset Demo
            </button>
            <button
              type="button"
              onClick={exitDemo}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 border border-white/30 transition-colors"
            >
              <LogOut size={12} />
              Exit Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
