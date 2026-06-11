import { useDemoMode } from "@/hooks/useDemoMode";
import { RotateCcw, LogOut, Sparkles } from "lucide-react";

export default function DemoBanner() {
  const { isDemoMode, demoUser, exitDemo, resetDemo } = useDemoMode();

  if (!isDemoMode) return null;

  return (
    <div className="fixed top-[72px] left-0 right-0 z-[90] bg-gradient-to-r from-[var(--dt-primary)] to-[#D9B8A8] text-white px-4 py-2">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={14} />
          <span className="text-[12px] font-medium">
            Demo Mode — Signed in as{" "}
            <span className="font-semibold">{demoUser?.username}</span>
            {demoUser?.role === "admin" && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded bg-white/20 text-[10px]">
                Admin
              </span>
            )}
            {demoUser?.role === "moderator" && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded bg-white/20 text-[10px]">
                Moderator
              </span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetDemo}
            className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 transition-colors"
          >
            <RotateCcw size={11} />
            Reset
          </button>
          <button
            onClick={exitDemo}
            className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 transition-colors"
          >
            <LogOut size={11} />
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
