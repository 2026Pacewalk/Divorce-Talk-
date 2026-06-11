import { useState } from "react";
import { useNavigate } from "react-router";
import { useDemoMode } from "@/hooks/useDemoMode";
import { demoUsers } from "@/lib/demoData";
import { Sparkles, ChevronDown, Shield, Ear, HeartHandshake, HandHeart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type DemoEntry = (typeof demoUsers)[number];

const iconForEntry = (u: DemoEntry) => {
  if (u.role === "admin") return Shield;
  if (u.isListener) return HandHeart;
  if (u.role === "moderator") return Ear;
  return HeartHandshake;
};

export default function DemoLoginButtons({ variant = "hero" }: { variant?: "hero" | "login" | "compact" }) {
  const { enterDemo } = useDemoMode();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogin = (user: DemoEntry) => {
    enterDemo({
      id: Math.floor(Math.random() * 10000),
      username: user.username,
      email: user.email,
      role: user.role,
      bio: user.bio,
    });
    setShowDropdown(false);
    navigate("/community");
    window.location.reload();
  };

  if (variant === "compact") {
    return (
      <button
        onClick={() => handleLogin(demoUsers[0])}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--dt-primary-light)] text-[var(--dt-primary)] text-[13px] font-medium hover:bg-[var(--dt-primary)] hover:text-white transition-all"
      >
        <Sparkles size={14} />
        Try Demo
      </button>
    );
  }

  if (variant === "login") {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[var(--dt-border)]" />
          <span className="text-[11px] text-[var(--dt-text-muted)] uppercase tracking-wider">or step into a demo role</span>
          <div className="flex-1 h-px bg-[var(--dt-border)]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {demoUsers.map((u) => {
            const Icon = iconForEntry(u);
            return (
              <button
                key={u.email}
                onClick={() => handleLogin(u)}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--dt-bg)] border border-[var(--dt-border)] hover:border-[var(--dt-primary)] hover:bg-[var(--dt-primary-light)]/30 transition-all text-left"
              >
                <span className="grid place-items-center shrink-0 w-9 h-9 rounded-xl bg-[var(--dt-primary-light)] text-[var(--dt-primary)]">
                  <Icon size={15} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-semibold text-[var(--dt-text)] truncate">{u.label}</p>
                  <p className="text-[10.5px] text-[var(--dt-text-muted)] truncate">{u.email}</p>
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-[10.5px] text-[var(--dt-text-muted)] text-center px-2">
          One click signs you in as that role. No real password needed — your demo session lives only on this device.
        </p>
      </div>
    );
  }

  // Hero variant
  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-[1.5px] border-[var(--dt-primary)] text-[var(--dt-primary)] text-[14px] font-medium hover:bg-[var(--dt-primary)] hover:text-white transition-all"
      >
        <Sparkles size={16} />
        Explore Demo
        <ChevronDown size={14} className={`transition-transform ${showDropdown ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {showDropdown && (
          <>
            <div className="fixed inset-0 z-[150]" onClick={() => setShowDropdown(false)} />
            <motion.div
              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[280px] bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl shadow-dt-xl z-[200] overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <div className="p-3">
                <p className="text-[11px] text-[var(--dt-text-muted)] uppercase tracking-wider px-3 py-2">
                  Step into a demo role
                </p>
                {demoUsers.map((u) => {
                  const Icon = iconForEntry(u);
                  return (
                    <button
                      key={u.email}
                      onClick={() => handleLogin(u)}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[var(--dt-bg)] transition-colors text-left"
                    >
                      <div className="w-9 h-9 rounded-full bg-[var(--dt-primary-light)] flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-[var(--dt-primary)]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-medium text-[var(--dt-text)] truncate">{u.label}</p>
                        <p className="text-[11px] text-[var(--dt-text-muted)] truncate">{u.email}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
