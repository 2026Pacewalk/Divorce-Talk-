import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Home,
  MessageSquareHeart,
  Headphones,
  Quote,
  Sparkles,
  Users,
  BookOpen,
  LayoutDashboard,
  LogIn,
  ShieldCheck,
  LifeBuoy,
  Lock,
  Phone,
  Mail,
  Info,
  Map,
  FileCode2,
  ArrowUpRight,
  Heart,
  HandHeart,
} from "lucide-react";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";

type Item = {
  label: string;
  to: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

type Section = {
  badge: string;
  heading: string;
  intro: string;
  items: Item[];
};

const sections: Section[] = [
  {
    badge: "Start here",
    heading: "First steps",
    intro:
      "Pages that meet you where you are. Whether you want to read, listen, write, or just look around.",
    items: [
      { label: "Home", to: "/", desc: "The front door — a quiet welcome and the gentle paths in.", icon: Home },
      { label: "About", to: "/about", desc: "Why we built DivorceTalk, and who's behind the curtain.", icon: Info },
      { label: "Login & Join", to: "/login", desc: "Sign in or join anonymously in 10 seconds. Demo roles available.", icon: LogIn },
    ],
  },
  {
    badge: "Community",
    heading: "Find your people",
    intro: "Anonymous spaces to share, listen, and feel less alone.",
    items: [
      { label: "Heart Out", to: "/community", desc: "The community feed. Read what others are feeling, share if you'd like.", icon: MessageSquareHeart },
      { label: "Listening Rooms", to: "/rooms", desc: "Group spaces held by listeners — silent marriages, betrayal recovery, co-parenting and more.", icon: Headphones },
      { label: "Stories", to: "/stories", desc: "Real journeys — staying, leaving, healing.", icon: Quote },
      { label: "Relationship Check-In", to: "/check-in", desc: "A gentle 2-minute self-reflection. No judgment, no sign-up.", icon: Sparkles },
      { label: "Hear Me", to: "/hear-me", desc: "Request a trained volunteer listener. Free, confidential.", icon: HandHeart },
    ],
  },
  {
    badge: "Your space",
    heading: "Just for you",
    intro: "Private tools that travel with you, on your own terms.",
    items: [
      { label: "Private Journal", to: "/journal", desc: "A locked diary only you can read.", icon: BookOpen },
      { label: "Dashboard", to: "/profile", desc: "Your posts, saved stories, healing journey, and settings.", icon: LayoutDashboard },
    ],
  },
  {
    badge: "Safety & support",
    heading: "We've got you",
    intro:
      "Boundaries, transparency, and immediate help when you need it most.",
    items: [
      { label: "Community Guidelines", to: "/guidelines", desc: "How we speak to each other here. The five rules that keep this soft.", icon: ShieldCheck },
      { label: "Safety Policy", to: "/safety", desc: "How we protect your anonymity and handle crisis situations.", icon: LifeBuoy },
      { label: "Privacy Policy", to: "/privacy", desc: "Your identity never leaves DivorceTalk. No advertisers, no data brokers.", icon: Lock },
      { label: "Crisis Support", to: "/emergency", desc: "Immediate professional helplines, 24×7, India. iCall, Vandrevala, NIMHANS.", icon: Phone },
      { label: "Contact us", to: "/contact", desc: "Reach the team — support, partnership, press, or quiet questions.", icon: Mail },
    ],
  },
];

export default function Sitemap() {
  return (
    <div className="min-h-screen bg-[var(--dt-bg)]">
      <Navbar />
      <main className="pt-[88px] px-4 sm:px-6 md:px-12 pb-12 sm:pb-16">
        <div className="max-w-[1100px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl border border-[var(--dt-border-light)] bg-gradient-to-br from-[var(--dt-primary-light)]/40 via-[var(--dt-card)] to-[var(--dt-secondary-light)]/40 shadow-2xl ring-1 ring-[var(--dt-text)]/5 p-7 sm:p-10 mb-8"
          >
            <span
              aria-hidden
              className="absolute inset-0 opacity-[0.12] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 18% 22%, rgba(200,143,122,0.5), transparent 50%), radial-gradient(circle at 82% 78%, rgba(167,178,159,0.5), transparent 50%)",
              }}
            />
            <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-[600px]">
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--dt-text-muted)]">
                  <Map size={11} className="text-[var(--dt-primary)]" />
                  Sitemap
                </span>
                <h1 className="font-serif text-[34px] sm:text-[44px] leading-[1.05] text-[var(--dt-text)] mt-3">
                  Every page on DivorceTalk, in one calm place.
                </h1>
                <p className="text-[14.5px] text-[var(--dt-text-secondary)] mt-4 leading-relaxed max-w-[520px]">
                  We grouped the site by what you might be looking for — start
                  here, community, your space, safety. Pick a soft place to land.
                </p>
              </div>

              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener"
                aria-label="View the raw XML sitemap (opens in a new tab)"
                className="group inline-flex items-center gap-2 text-[13px] font-semibold px-5 py-3 rounded-full bg-[var(--dt-primary)] text-white hover:bg-[var(--dt-primary-hover)] shadow-dt-sm hover:shadow-dt-glow transition-all shrink-0"
              >
                <FileCode2 size={14} />
                View sitemap.xml
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {sections.map((section, si) => (
              <motion.section
                key={section.heading}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: si * 0.05 }}
                className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-5 sm:p-6 shadow-dt-sm"
                aria-labelledby={`sitemap-heading-${si}`}
              >
                <p className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-[var(--dt-text-muted)]">
                  {section.badge}
                </p>
                <h2
                  id={`sitemap-heading-${si}`}
                  className="font-serif text-[22px] text-[var(--dt-text)] mt-1 leading-tight"
                >
                  {section.heading}
                </h2>
                <p className="text-[12.5px] text-[var(--dt-text-secondary)] mt-1.5 leading-relaxed">
                  {section.intro}
                </p>

                <ul className="mt-5 flex flex-col gap-1">
                  {section.items.map(({ label, to, desc, icon: Icon }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        className="group flex items-start gap-3 p-2.5 -mx-1 rounded-xl hover:bg-[var(--dt-bg)]/70 transition-colors"
                      >
                        <span className="grid place-items-center shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--dt-primary-light)]/60 to-[var(--dt-secondary-light)]/60 text-[var(--dt-primary)] group-hover:scale-105 transition-transform">
                          <Icon size={15} />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-[var(--dt-text)] group-hover:text-[var(--dt-primary)] transition-colors">
                            {label}
                            <ArrowUpRight
                              size={11}
                              className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                            />
                          </span>
                          <span className="block mt-0.5 text-[12px] leading-snug text-[var(--dt-text-secondary)]">
                            {desc}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.section>
            ))}
          </div>

          {/* Footer strip — quiet reassurance + raw sitemap fallback */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3 px-5 py-4 rounded-2xl bg-[var(--dt-card)] border border-[var(--dt-border-light)]"
          >
            <p className="text-[12.5px] text-[var(--dt-text-secondary)] inline-flex items-center gap-2">
              <Heart size={12} className="text-[var(--dt-primary)]" />
              You don't have to figure out where to start. We'll meet you in the middle.
            </p>
            <div className="flex items-center gap-2 text-[11.5px] text-[var(--dt-text-muted)]">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1 hover:text-[var(--dt-primary)] transition-colors"
              >
                <FileCode2 size={11} />
                sitemap.xml
              </a>
              <span>·</span>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener"
                className="hover:text-[var(--dt-primary)] transition-colors"
              >
                robots.txt
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
