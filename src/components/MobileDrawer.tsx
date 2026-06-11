import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MessageSquareHeart,
  Headphones,
  Sparkles,
  Heart,
  Quote,
  BookOpen,
  Bookmark,
  LayoutDashboard,
  ShieldCheck,
  Phone,
  LogOut,
  Sun,
  Moon,
  Users,
  ArrowRight,
  Search,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";
import { useDemoMode } from "@/hooks/useDemoMode";

type Props = {
  open: boolean;
  onClose: () => void;
  onOpenSearch?: () => void;
};

const groups: {
  heading: string;
  items: {
    label: string;
    to: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    desc?: string;
  }[];
}[] = [
  {
    heading: "Need support",
    items: [
      { label: "I need to talk", to: "/community?compose=1", icon: MessageSquareHeart, desc: "Write it out" },
      { label: "Hear Me", to: "/hear-me", icon: Users, desc: "Ask for a listener" },
      { label: "Relationship check-in", to: "/check-in", icon: Sparkles, desc: "2-min self-reflection" },
    ],
  },
  {
    heading: "Community",
    items: [
      { label: "Heart Out", to: "/community", icon: Heart },
      { label: "Listening rooms", to: "/rooms", icon: Headphones },
      { label: "Stories", to: "/stories", icon: Quote },
    ],
  },
  {
    heading: "My space",
    items: [
      { label: "Private journal", to: "/journal", icon: BookOpen },
      { label: "Saved posts", to: "/profile?tab=saved", icon: Bookmark },
      { label: "Dashboard", to: "/profile", icon: LayoutDashboard },
    ],
  },
  {
    heading: "Safety",
    items: [
      { label: "Community rules", to: "/guidelines", icon: ShieldCheck },
      { label: "Crisis help", to: "/emergency", icon: Phone, desc: "If you need help now" },
    ],
  },
];

export default function MobileDrawer({ open, onClose, onOpenSearch }: Props) {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { isDemoMode } = useDemoMode();
  const { resolvedTheme, setTheme } = useTheme();
  const location = useLocation();
  const isDark = resolvedTheme === "dark";

  const initial = user?.username?.charAt(0)?.toUpperCase() || "U";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="absolute inset-0 bg-[var(--dt-text)]/30 backdrop-blur-md"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute top-0 right-0 bottom-0 w-full max-w-[420px] bg-[var(--dt-card)]/95 backdrop-blur-2xl border-l border-[var(--dt-border-light)] shadow-dt-lg flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            <div className="px-5 pt-5 pb-4 bg-gradient-to-br from-[var(--dt-primary-light)]/40 via-transparent to-[var(--dt-secondary-light)]/40 border-b border-[var(--dt-border-light)]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="relative grid place-items-center w-12 h-12 rounded-full bg-[var(--dt-card)] text-[var(--dt-primary)] text-[16px] font-semibold shadow-dt-sm ring-2 ring-[var(--dt-card)]">
                    {isAuthenticated ? initial : "·"}
                    {isAuthenticated && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#7CB87A] ring-2 ring-[var(--dt-card)]" />
                    )}
                  </span>
                  <div className="min-w-0">
                    {isAuthenticated ? (
                      <>
                        <p className="text-[15px] font-semibold text-[var(--dt-text)] truncate">
                          {user?.username}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {isDemoMode ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[var(--dt-primary)] text-white">
                              <Sparkles size={9} /> Demo mode
                            </span>
                          ) : (
                            <span className="text-[11px] text-[var(--dt-text-secondary)]">
                              Signed in · anonymous
                            </span>
                          )}
                          {isAdmin && (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[var(--dt-secondary)] text-white">
                              Admin
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="font-serif text-[18px] text-[var(--dt-text)] leading-tight">
                          Welcome, gentle one.
                        </p>
                        <p className="text-[11px] text-[var(--dt-text-secondary)] mt-0.5">
                          You can be here without saying a word.
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={onClose}
                  className="grid place-items-center w-9 h-9 rounded-full text-[var(--dt-text-secondary)] hover:text-[var(--dt-text)] hover:bg-[var(--dt-card)]/80 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {!isAuthenticated && (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Link
                    to="/login?tab=join"
                    onClick={onClose}
                    className="text-center text-[13px] font-medium px-4 py-2.5 rounded-full bg-[var(--dt-primary)] text-white hover:bg-[var(--dt-primary-hover)] transition-colors shadow-dt-sm"
                  >
                    Join anonymously
                  </Link>
                  <Link
                    to="/login"
                    onClick={onClose}
                    className="text-center text-[13px] font-medium px-4 py-2.5 rounded-full bg-[var(--dt-card)] border border-[var(--dt-border)] text-[var(--dt-text)] hover:bg-[var(--dt-bg)] transition-colors"
                  >
                    Log in
                  </Link>
                </div>
              )}
            </div>

            {onOpenSearch && (
              <div className="px-4 pt-4">
                <button
                  type="button"
                  onClick={onOpenSearch}
                  aria-label="Open search"
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-[var(--dt-bg)]/70 border border-[var(--dt-border-light)] text-left hover:bg-[var(--dt-bg)] hover:border-[var(--dt-primary)]/40 transition-all group"
                >
                  <span className="grid place-items-center w-9 h-9 rounded-xl bg-[var(--dt-card)] text-[var(--dt-primary)] shadow-dt-sm group-hover:shadow-dt-glow transition-shadow">
                    <Search size={15} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[13px] font-semibold text-[var(--dt-text)]">
                      Search the quiet
                    </span>
                    <span className="block text-[11px] text-[var(--dt-text-muted)] truncate">
                      Pages, stories, rooms, resources…
                    </span>
                  </span>
                  <kbd className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--dt-card)] border border-[var(--dt-border-light)] text-[var(--dt-text-muted)]">
                    ⌘K
                  </kbd>
                </button>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-3 py-4">
              {groups.map((group) => (
                <div key={group.heading} className="mb-5 last:mb-0">
                  <p className="px-2 mb-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-[var(--dt-text-muted)]">
                    {group.heading}
                  </p>
                  <div className="flex flex-col">
                    {group.items.map(({ label, to, icon: Icon, desc }) => {
                      const active = location.pathname === to.split("?")[0];
                      return (
                        <Link
                          key={label}
                          to={to}
                          onClick={onClose}
                          className={`group flex items-center gap-3 px-3 py-3 rounded-2xl transition-colors ${
                            active
                              ? "bg-[var(--dt-primary-light)]/60 text-[var(--dt-primary)]"
                              : "text-[var(--dt-text)] hover:bg-[var(--dt-bg)]/70"
                          }`}
                        >
                          <span className={`grid place-items-center shrink-0 w-10 h-10 rounded-xl ${
                            active
                              ? "bg-[var(--dt-card)] text-[var(--dt-primary)]"
                              : "bg-[var(--dt-bg)] text-[var(--dt-text-secondary)] group-hover:text-[var(--dt-primary)]"
                          }`}>
                            <Icon size={16} />
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block text-[14px] font-medium truncate">{label}</span>
                            {desc && (
                              <span className="block text-[11px] text-[var(--dt-text-muted)] truncate">
                                {desc}
                              </span>
                            )}
                          </span>
                          <ArrowRight size={14} className="text-[var(--dt-text-muted)] group-hover:text-[var(--dt-primary)] transition-colors" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-3 py-3 border-t border-[var(--dt-border-light)] bg-[var(--dt-bg)]/40">
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--dt-card)] border border-[var(--dt-border-light)] text-[12px] font-medium text-[var(--dt-text)] hover:bg-[var(--dt-bg)] transition-colors"
                >
                  {isDark ? <Sun size={13} /> : <Moon size={13} />}
                  {isDark ? "Light mode" : "Dark mode"}
                </button>
                {isAuthenticated && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      logout();
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-full text-[12px] font-medium text-[var(--dt-text-secondary)] hover:text-[var(--dt-primary)] hover:bg-[var(--dt-card)] transition-colors"
                  >
                    <LogOut size={13} />
                    Sign out
                  </button>
                )}
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
