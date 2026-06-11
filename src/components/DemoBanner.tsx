import { useDemoMode } from "@/hooks/useDemoMode";
import { RotateCcw, LogOut, Sparkles } from "lucide-react";

export default function DemoBanner() {
  const { isDemoMode, demoUser, exitDemo, resetDemo } = useDemoMode();

  if (!isDemoMode) return null;

  return (
    <div
      className="fixed top-[72px] left-0 right-0 z-[90] bg-[#C88F7A] text-white"
      role="region"
      aria-label="Demo mode notice"
    >
      {/* Inner dashed border ~6px inside the strip edges, matching the design mock */}
      <div className="mx-1.5 my-1.5 rounded-md border-2 border-dashed border-white/55">
        <div className="px-3 sm:px-5 py-2 flex flex-wrap items-center gap-x-3 gap-y-2">
          {/* Left — status pill */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="grid place-items-center w-7 h-7 rounded-full bg-white/15 shrink-0">
              <Sparkles size={14} />
            </span>
            <p className="text-[13.5px] font-semibold leading-tight whitespace-nowrap">
              Demo Mode — Signed in as{" "}
              <span className="font-bold">{demoUser?.username}</span>
              {demoUser?.role === "admin" && (
                <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-semibold tracking-wide uppercase align-middle">
                  Admin
                </span>
              )}
              {demoUser?.role === "moderator" && (
                <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-semibold tracking-wide uppercase align-middle">
                  {demoUser?.isListener ? "Listener" : "Moderator"}
                </span>
              )}
            </p>
          </div>

          {/* Divider + description, desktop-only */}
          <div className="hidden md:flex items-center gap-3 flex-1 min-w-0">
            <span aria-hidden className="h-5 w-px bg-white/45 shrink-0" />
            <p className="text-[13px] text-white/90 truncate">
              You are exploring demo data. No real data is saved.
            </p>
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-2 ml-auto shrink-0">
            <button
              type="button"
              onClick={resetDemo}
              className="inline-flex items-center gap-1.5 text-[12.5px] font-medium px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/35 hover:border-white/55 transition-colors"
            >
              <RotateCcw size={12} />
              Reset Demo
            </button>
            <button
              type="button"
              onClick={exitDemo}
              className="inline-flex items-center gap-1.5 text-[12.5px] font-medium px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/35 hover:border-white/55 transition-colors"
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
