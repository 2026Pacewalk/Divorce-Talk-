import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Home, Headphones, BookOpen, Plus, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

type BottomItem = {
  label: string;
  to: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  match: string[];
  isCenter?: boolean;
};

const items: BottomItem[] = [
  { label: "Feed", to: "/community", icon: Home, match: ["/community"] },
  { label: "Rooms", to: "/rooms", icon: Headphones, match: ["/rooms"] },
  { label: "Create", to: "/community?compose=1", icon: Plus, isCenter: true, match: [] },
  { label: "Journal", to: "/journal", icon: BookOpen, match: ["/journal"] },
  { label: "Profile", to: "/profile", icon: User, match: ["/profile"] },
];

export default function BottomNav() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[95] lg:hidden pointer-events-none"
      aria-label="Mobile bottom navigation"
    >
      <div
        className="pointer-events-auto mx-auto mb-3 mt-2 max-w-[420px] px-3"
        style={{ paddingBottom: "max(0px, env(safe-area-inset-bottom))" }}
      >
        <div className="relative rounded-3xl bg-[var(--dt-card)] border border-[var(--dt-border-light)] shadow-2xl ring-1 ring-[var(--dt-text)]/5">
          <ul className="grid grid-cols-5 px-1.5 py-1.5">
            {items.map((it) => {
              const Icon = it.icon;
              const active =
                !it.isCenter &&
                it.match.some((p) => location.pathname.startsWith(p));

              if (it.isCenter) {
                return (
                  <li key={it.label} className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => navigate(it.to)}
                      aria-label="Create"
                      className="relative -mt-7 grid place-items-center w-14 h-14 rounded-full bg-[var(--dt-primary)] text-white shadow-dt-glow hover:bg-[var(--dt-primary-hover)] active:scale-95 transition-all"
                    >
                      <span className="absolute inset-0 rounded-full ring-4 ring-[var(--dt-card)]" />
                      <Plus size={22} strokeWidth={2.5} className="relative" />
                    </button>
                  </li>
                );
              }

              return (
                <li key={it.label} className="flex justify-center">
                  <Link
                    to={it.to}
                    className="relative w-full flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-2xl"
                  >
                    {active && (
                      <motion.span
                        layoutId="bn-active"
                        className="absolute inset-x-3 inset-y-1 rounded-2xl bg-[var(--dt-primary-light)]/70"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span
                      className={`relative grid place-items-center w-7 h-7 ${
                        active
                          ? "text-[var(--dt-primary)]"
                          : "text-[var(--dt-text-muted)]"
                      }`}
                    >
                      <Icon size={18} />
                    </span>
                    <span
                      className={`relative text-[10px] font-medium ${
                        active
                          ? "text-[var(--dt-primary)]"
                          : "text-[var(--dt-text-muted)]"
                      }`}
                    >
                      {it.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
