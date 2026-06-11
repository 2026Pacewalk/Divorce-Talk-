import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  ChevronDown,
  Heart,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useDemoMode } from "@/hooks/useDemoMode";
import MegaMenu from "./MegaMenu";
import MobileDrawer from "./MobileDrawer";
import CommandPalette from "./CommandPalette";
import NotificationsPopover from "./NotificationsPopover";
import ProfileDropdown from "./ProfileDropdown";
import ThemeToggle from "./ThemeToggle";

const primaryNav = [
  { label: "Home", to: "/" },
  { label: "Heart Out", to: "/community" },
  { label: "Listening Rooms", to: "/rooms" },
  { label: "Journal", to: "/journal" },
  { label: "Check-In", to: "/check-in" },
  { label: "Stories", to: "/stories" },
  { label: "Safety", to: "/safety" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { isDemoMode } = useDemoMode();
  const location = useLocation();
  const megaCloseTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mega menu on route change
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  const openMega = () => {
    if (megaCloseTimer.current) {
      window.clearTimeout(megaCloseTimer.current);
      megaCloseTimer.current = null;
    }
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (megaCloseTimer.current) window.clearTimeout(megaCloseTimer.current);
    megaCloseTimer.current = window.setTimeout(() => setMegaOpen(false), 140);
  };

  const showDemoBadge = isDemoMode;

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-[height,background-color,backdrop-filter,border-color,box-shadow] duration-300 ${
          scrolled
            ? "h-[60px] bg-[var(--dt-card)]/75 backdrop-blur-2xl border-b border-[var(--dt-border-light)] shadow-dt-sm"
            : "h-[72px] bg-[var(--dt-bg)]/40 backdrop-blur-xl border-b border-transparent"
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto h-full px-4 md:px-8 flex items-center gap-3">
          {/* Logo + tagline */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="DivorceTalk.in home"
          >
            <span
              className="relative grid place-items-center w-9 h-9 rounded-2xl bg-gradient-to-br from-[var(--dt-primary)] to-[#D9B8A8] text-white shadow-dt-sm group-hover:shadow-dt-glow transition-shadow"
              aria-hidden
            >
              <Heart size={16} strokeWidth={2.4} className="fill-white/15" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-serif text-[19px] text-[var(--dt-text)] tracking-tight">
                DivorceTalk<span className="text-[var(--dt-primary)]">.in</span>
              </span>
              <span className="hidden sm:block text-[10.5px] text-[var(--dt-text-muted)] tracking-wide mt-1">
                a softer place on the internet
              </span>
            </span>
          </Link>

          {/* Center nav (lg+) */}
          <nav className="hidden lg:flex items-center gap-1 mx-auto" aria-label="Primary">
            {primaryNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-[13px] font-medium rounded-full transition-colors ${
                    isActive
                      ? "text-[var(--dt-primary)]"
                      : "text-[var(--dt-text-secondary)] hover:text-[var(--dt-text)]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="header-active"
                        className="absolute inset-0 rounded-full bg-[var(--dt-primary-light)]/60"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* Mega menu trigger */}
            <div
              className="relative"
              onMouseEnter={openMega}
              onMouseLeave={scheduleCloseMega}
            >
              <button
                type="button"
                onClick={() => setMegaOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={megaOpen}
                className={`flex items-center gap-1 px-3 py-2 text-[13px] font-medium rounded-full transition-colors ${
                  megaOpen
                    ? "text-[var(--dt-primary)] bg-[var(--dt-primary-light)]/60"
                    : "text-[var(--dt-text-secondary)] hover:text-[var(--dt-text)]"
                }`}
              >
                Explore
                <ChevronDown
                  size={13}
                  className={`transition-transform ${megaOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {megaOpen && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+10px)]"
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleCloseMega}
                  >
                    <MegaMenu
                      onItemClick={() => setMegaOpen(false)}
                      onOpenSearch={() => setSearchOpen(true)}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-1 ml-auto">
            {showDemoBadge && (
              <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full bg-[var(--dt-primary)] text-white">
                <Sparkles size={9} /> Demo
              </span>
            )}

            <NotificationsPopover />
            <ThemeToggle />

            {/* Auth area */}
            <div className="hidden md:flex items-center gap-2 ml-1">
              {isAuthenticated ? (
                <ProfileDropdown />
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[13px] font-medium text-[var(--dt-text-secondary)] hover:text-[var(--dt-text)] px-3 py-2 rounded-full transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/login?tab=join"
                    className="relative inline-flex items-center gap-1.5 text-[12.5px] font-semibold px-4 py-2 rounded-full bg-[var(--dt-primary)] text-white hover:bg-[var(--dt-primary-hover)] shadow-dt-sm hover:shadow-dt-glow transition-all duration-200 hover:scale-[1.02]"
                  >
                    Join anonymously
                    <span className="hidden lg:inline text-[9px] uppercase tracking-wider opacity-80">
                      free
                    </span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu trigger */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden grid place-items-center w-10 h-10 rounded-full text-[var(--dt-text)] hover:bg-[var(--dt-bg)]/70 transition-colors"
            >
              <Menu size={19} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onOpenSearch={() => {
          setMobileOpen(false);
          setSearchOpen(true);
        }}
      />
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
