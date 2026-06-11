import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  ShieldCheck,
  Lock,
  EyeOff,
  Phone,
  Mail,
  Instagram,
  Twitter,
  Send,
  ArrowRight,
  Quote,
} from "lucide-react";
import BackToTop from "@/components/BackToTop";
import ThemeToggle from "@/components/ThemeToggle";

const columns: {
  heading: string;
  links: { label: string; to: string; badge?: string }[];
}[] = [
  {
    heading: "Community",
    links: [
      { label: "Heart Out", to: "/community" },
      { label: "Listening Rooms", to: "/rooms" },
      { label: "Stories", to: "/stories" },
      { label: "Check-In", to: "/check-in" },
      { label: "Hear Me", to: "/hear-me" },
    ],
  },
  {
    heading: "Healing tools",
    links: [
      { label: "Journal", to: "/journal" },
      { label: "Mood Tracker", to: "/journal?tab=mood" },
      { label: "Saved Stories", to: "/stories?saved=1" },
      { label: "Daily Prompts", to: "/journal?tab=prompts" },
      { label: "Listener Requests", to: "/hear-me" },
    ],
  },
  {
    heading: "Safety & trust",
    links: [
      { label: "Community Guidelines", to: "/guidelines" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Safety Policy", to: "/safety" },
      { label: "Crisis Help", to: "/emergency", badge: "24×7" },
      { label: "Report Content", to: "/safety#report" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Login", to: "/login" },
      { label: "Sign up", to: "/login?tab=join" },
      { label: "Dashboard", to: "/profile" },
      { label: "Demo Access", to: "/login?demo=1" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

const trustItems = [
  { icon: EyeOff, label: "Anonymous by default" },
  { icon: Lock, label: "End-to-end encrypted journal" },
  { icon: ShieldCheck, label: "Human-moderated rooms" },
  { icon: Heart, label: "Free, forever, for those who need it" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    window.setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer className="relative mt-12">
      {/* Top emotional CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--dt-primary-light)] via-[var(--dt-bg)] to-[var(--dt-secondary-light)]" />
        <div
          className="absolute inset-0 opacity-[0.18] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 22%, rgba(200,143,122,0.45), transparent 45%), radial-gradient(circle at 82% 78%, rgba(167,178,159,0.45), transparent 45%)",
          }}
        />
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 py-12 md:py-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-[12px] font-medium px-3 py-1.5 rounded-full bg-[var(--dt-card)]/80 backdrop-blur border border-[var(--dt-border-light)] text-[var(--dt-text-secondary)]"
          >
            <Sparkles size={11} className="text-[var(--dt-primary)]" />
            You are not alone tonight
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-serif text-[34px] md:text-[52px] leading-[1.05] text-[var(--dt-text)] mt-5 max-w-[760px] mx-auto"
          >
            You don't have to carry this alone.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[15px] md:text-[17px] text-[var(--dt-text-secondary)] mt-5 max-w-[560px] mx-auto leading-relaxed"
          >
            Join anonymously and find people who understand the weight of the
            words you haven't said out loud yet.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
          >
            <Link
              to="/community"
              className="inline-flex items-center gap-2 text-[14px] font-semibold px-7 py-3.5 rounded-full bg-[var(--dt-primary)] text-white shadow-dt-sm hover:shadow-dt-glow hover:bg-[var(--dt-primary-hover)] hover:-translate-y-0.5 transition-all"
            >
              Enter community
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/login?demo=1"
              className="inline-flex items-center gap-2 text-[14px] font-semibold px-7 py-3.5 rounded-full bg-[var(--dt-card)] border border-[var(--dt-border)] text-[var(--dt-text)] hover:bg-[var(--dt-bg)] hover:-translate-y-0.5 transition-all"
            >
              <Sparkles size={14} className="text-[var(--dt-primary)]" />
              Try demo (no signup)
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-[var(--dt-card)] border-y border-[var(--dt-border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustItems.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 text-[12px] text-[var(--dt-text-secondary)]"
            >
              <span className="grid place-items-center w-9 h-9 rounded-full bg-[var(--dt-primary-light)]/70 text-[var(--dt-primary)]">
                <Icon size={14} />
              </span>
              <span className="leading-snug font-medium text-[var(--dt-text)]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Main footer */}
      <section className="bg-[var(--dt-bg)] border-b border-[var(--dt-border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand + newsletter */}
          <div className="md:col-span-4 flex flex-col">
            <Link to="/" className="flex items-center gap-2.5 group">
              <span className="grid place-items-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--dt-primary)] to-[#D9B8A8] text-white shadow-dt-sm group-hover:shadow-dt-glow transition-shadow">
                <Heart size={17} strokeWidth={2.4} />
              </span>
              <span className="font-serif text-[24px] text-[var(--dt-text)] tracking-tight">
                DivorceTalk<span className="text-[var(--dt-primary)]">.in</span>
              </span>
            </Link>
            <p className="mt-4 text-[14px] leading-relaxed text-[var(--dt-text-secondary)] max-w-[340px]">
              A safe, anonymous support community for people navigating
              relationship distress, separation fears, and emotional healing.
            </p>

            <form onSubmit={onSubscribe} className="mt-7">
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[var(--dt-text-muted)]">
                A gentle letter, once a week
              </p>
              <p className="text-[12.5px] text-[var(--dt-text-secondary)] mt-1.5 max-w-[320px]">
                One soft prompt and one community story. No marketing. Unsubscribe in one click.
              </p>
              <div className="mt-3 flex items-center gap-2 p-1 rounded-full bg-[var(--dt-card)] border border-[var(--dt-border-light)] focus-within:border-[var(--dt-primary)] focus-within:shadow-dt-glow transition-all">
                <Mail size={14} className="text-[var(--dt-text-muted)] ml-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@quiet.place"
                  className="flex-1 bg-transparent text-[13px] text-[var(--dt-text)] placeholder:text-[var(--dt-text-muted)] outline-none py-2"
                  aria-label="Email for the weekly letter"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 text-[12px] font-semibold px-4 py-2 rounded-full bg-[var(--dt-primary)] text-white hover:bg-[var(--dt-primary-hover)] transition-colors"
                >
                  {submitted ? "Sent ♥" : "Subscribe"}
                  {!submitted && <Send size={11} />}
                </button>
              </div>
              {submitted && (
                <p className="mt-2 text-[11px] text-[var(--dt-secondary)]">
                  Welcome. Look for the first letter on Sunday morning.
                </p>
              )}
            </form>
          </div>

          {/* Link columns */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.heading}>
                <h4 className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--dt-text-muted)] mb-4">
                  {col.heading}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="inline-flex items-center gap-1.5 text-[13.5px] text-[var(--dt-text-secondary)] hover:text-[var(--dt-primary)] transition-colors"
                      >
                        {link.label}
                        {link.badge && (
                          <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[var(--dt-primary-light)] text-[var(--dt-primary)]">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crisis quick-access strip */}
      <section className="bg-[var(--dt-card)] border-b border-[var(--dt-border-light)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className="grid place-items-center shrink-0 w-10 h-10 rounded-full bg-[var(--dt-primary-light)] text-[var(--dt-primary)]">
            <Phone size={16} />
          </span>
          <div className="flex-1">
            <p className="text-[13.5px] font-semibold text-[var(--dt-text)]">
              In crisis right now?
            </p>
            <p className="text-[12px] text-[var(--dt-text-secondary)] mt-0.5">
              You deserve immediate, professional support. We can point you to
              someone who can take the next breath with you.
            </p>
          </div>
          <Link
            to="/emergency"
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-full bg-[var(--dt-primary)] text-white hover:bg-[var(--dt-primary-hover)] transition-colors"
          >
            Get crisis help
            <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* Bottom strip: copyright + theme + social */}
      <section className="bg-[var(--dt-bg)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-7 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-[12px] text-[var(--dt-text-muted)]">
              &copy; {new Date().getFullYear()} DivorceTalk.in &middot; Made
              with <Heart size={11} className="inline -mt-0.5 text-[var(--dt-primary)]" /> for those who need it.
            </p>
            <p className="text-[11px] text-[var(--dt-text-muted)]/80 mt-2 max-w-[640px] leading-relaxed">
              This platform offers peer emotional support and is not a
              replacement for professional therapy or crisis intervention.
              If you are in immediate danger, please contact local emergency
              services.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              aria-label="Contact us on Instagram"
              title="We'll add Instagram soon — drop us a note for now"
              className="grid place-items-center w-9 h-9 rounded-full bg-[var(--dt-card)] border border-[var(--dt-border-light)] text-[var(--dt-text-secondary)] hover:text-[var(--dt-primary)] hover:bg-[var(--dt-primary-light)]/40 transition-colors"
            >
              <Instagram size={14} />
            </Link>
            <Link
              to="/contact"
              aria-label="Contact us on X (formerly Twitter)"
              title="We'll add X soon — drop us a note for now"
              className="grid place-items-center w-9 h-9 rounded-full bg-[var(--dt-card)] border border-[var(--dt-border-light)] text-[var(--dt-text-secondary)] hover:text-[var(--dt-primary)] hover:bg-[var(--dt-primary-light)]/40 transition-colors"
            >
              <Twitter size={14} />
            </Link>
            <Link
              to="/stories"
              aria-label="Read stories"
              className="grid place-items-center w-9 h-9 rounded-full bg-[var(--dt-card)] border border-[var(--dt-border-light)] text-[var(--dt-text-secondary)] hover:text-[var(--dt-primary)] hover:bg-[var(--dt-primary-light)]/40 transition-colors"
            >
              <Quote size={14} />
            </Link>
            <span className="mx-1 h-5 w-px bg-[var(--dt-border-light)]" />
            <ThemeToggle compact />
          </div>
        </div>
      </section>

      <BackToTop />
    </footer>
  );
}
