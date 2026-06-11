import { useDemoMode } from "@/hooks/useDemoMode";
import { RotateCcw, LogOut, Sparkles } from "lucide-react";

export default function DemoBanner() {
  const { isDemoMode, demoUser, exitDemo, resetDemo } = useDemoMode();

  if (!isDemoMode) return null;

  const role =
    demoUser?.role === "admin"
      ? "Admin"
      : demoUser?.role === "moderator"
        ? demoUser?.isListener
          ? "Listener"
          : "Moderator"
        : null;

  return (
    <div
      className="fixed top-[72px] left-0 right-0 z-[90] bg-[#C88F7A] text-white"
      role="region"
      aria-label="Demo mode notice"
    >
      {/* Inner dashed border sits ~6px inside the strip edges, matching the mock */}
      <div className="mx-1.5 my-1 rounded-md border border-dashed border-white/55">
        <div className="px-2.5 sm:px-4 py-1.5 flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Status — compact on mobile, full on tablet+ */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="grid place-items-center w-6 h-6 rounded-full bg-white/15 shrink-0">
              <Sparkles size={12} />
            </span>
            <p className="text-[12px] sm:text-[13px] font-semibold leading-tight min-w-0 truncate">
              {/* Mobile: "Demo · username [role]" */}
              <span className="sm:hidden">
                Demo &middot;{" "}
                <span className="font-bold">{demoUser?.username}</span>
              </span>
              {/* Tablet+ : "Demo Mode — Signed in as username" */}
              <span className="hidden sm:inline">
                Demo Mode — Signed in as{" "}
                <span className="font-bold">{demoUser?.username}</span>
              </span>
              {role && (
                <span className="ml-1.5 hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full bg-white/20 text-[9.5px] font-semibold tracking-wide uppercase align-middle">
                  {role}
                </span>
              )}
            </p>

            {/* Description — only when there's actual room (xl+, ~1280px+) */}
            <span aria-hidden className="hidden xl:inline h-4 w-px bg-white/40 shrink-0 mx-2" />
            <p className="hidden xl:block text-[12.5px] text-white/85 truncate shrink min-w-0">
              You are exploring demo data. No real data is saved.
            </p>
          </div>

          {/* Actions — icon-only on mobile, full labels from sm+ */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={resetDemo}
              aria-label="Reset demo data"
              className="inline-flex items-center gap-1.5 text-[12px] font-medium h-7 sm:h-8 px-2 sm:px-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/30 hover:border-white/55 transition-colors"
            >
              <RotateCcw size={12} />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
            <button
              type="button"
              onClick={exitDemo}
              aria-label="Exit demo mode"
              className="inline-flex items-center gap-1.5 text-[12px] font-medium h-7 sm:h-8 px-2 sm:px-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/30 hover:border-white/55 transition-colors"
            >
              <LogOut size={12} />
              <span className="hidden sm:inline">Exit Demo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
