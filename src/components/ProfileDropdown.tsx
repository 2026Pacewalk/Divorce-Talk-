import { Link } from "react-router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LayoutDashboard,
  BookOpen,
  Bookmark,
  Settings,
  LogOut,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useDemoMode } from "@/hooks/useDemoMode";

export default function ProfileDropdown() {
  const { user, logout, isAdmin } = useAuth();
  const { isDemoMode } = useDemoMode();
  const initial = user?.username?.charAt(0)?.toUpperCase() || "U";

  const items: { label: string; to: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { label: "Dashboard", to: "/profile", icon: LayoutDashboard },
    { label: "Journal", to: "/journal", icon: BookOpen },
    { label: "Saved Posts", to: "/profile?tab=saved", icon: Bookmark },
    { label: "Settings", to: "/profile?tab=settings", icon: Settings },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Open profile menu"
          className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-[var(--dt-bg)]/70 transition-colors group"
        >
          <span className="relative grid place-items-center w-8 h-8 rounded-full bg-gradient-to-br from-[var(--dt-primary-light)] to-[var(--dt-secondary-light)] text-[var(--dt-primary)] text-[12px] font-semibold ring-2 ring-[var(--dt-card)] shadow-dt-sm">
            {initial}
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#7CB87A] ring-2 ring-[var(--dt-card)]" />
          </span>
          <span className="hidden md:flex flex-col items-start leading-tight">
            <span className="text-[12px] font-semibold text-[var(--dt-text)] max-w-[110px] truncate">
              {user?.username}
            </span>
            <span className="text-[10px] text-[var(--dt-text-muted)]">
              {isDemoMode ? "Demo · safe to explore" : "Signed in"}
            </span>
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={10}
        className="z-[110] w-[260px] p-0 overflow-hidden rounded-2xl border-[var(--dt-border-light)] bg-[var(--dt-card)] shadow-2xl ring-1 ring-[var(--dt-text)]/5"
      >
        <div className="px-4 py-4 bg-gradient-to-br from-[var(--dt-primary-light)]/50 via-transparent to-[var(--dt-secondary-light)]/50">
          <div className="flex items-center gap-3">
            <span className="relative grid place-items-center w-11 h-11 rounded-full bg-[var(--dt-card)] text-[var(--dt-primary)] text-[15px] font-semibold shadow-dt-sm">
              {initial}
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-[var(--dt-text)] truncate">
                {user?.username}
              </p>
              <p className="text-[11px] text-[var(--dt-text-secondary)] truncate">
                {isDemoMode ? (
                  <span className="inline-flex items-center gap-1">
                    <Sparkles size={10} /> Demo session
                  </span>
                ) : (
                  user?.email || "Anonymous member"
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="p-1.5">
          {items.map(({ label, to, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-[var(--dt-text-secondary)] hover:text-[var(--dt-text)] hover:bg-[var(--dt-bg)]/60 transition-colors"
            >
              <Icon size={14} className="text-[var(--dt-text-muted)]" />
              {label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-[var(--dt-text-secondary)] hover:text-[var(--dt-primary)] hover:bg-[var(--dt-primary-light)]/40 transition-colors"
            >
              <ShieldCheck size={14} />
              Admin
            </Link>
          )}
        </div>

        <div className="p-1.5 border-t border-[var(--dt-border-light)]">
          <button
            type="button"
            onClick={() => logout()}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-[var(--dt-text-secondary)] hover:text-[var(--dt-primary)] hover:bg-[var(--dt-primary-light)]/40 transition-colors"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
