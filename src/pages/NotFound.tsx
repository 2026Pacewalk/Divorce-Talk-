import { Link } from "react-router";
import { motion } from "framer-motion";
import { Heart, ArrowLeft, MessageSquareHeart, Headphones, BookOpen, Sparkles } from "lucide-react";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";

const detours: { to: string; label: string; desc: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { to: "/community", label: "Heart Out", desc: "Read what others are feeling today.", icon: MessageSquareHeart },
  { to: "/rooms", label: "Listening rooms", desc: "Slip into a gentle group room.", icon: Headphones },
  { to: "/journal", label: "Private journal", desc: "A locked diary, only for you.", icon: BookOpen },
  { to: "/check-in", label: "Relationship check-in", desc: "A 2-minute self-reflection.", icon: Sparkles },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--dt-bg)]">
      <Navbar />
      <main className="pt-[88px] px-6 md:px-12 pb-16">
        <section className="max-w-[820px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--dt-primary-light)]/40 via-[var(--dt-card)] to-[var(--dt-secondary-light)]/40 border border-[var(--dt-border-light)] shadow-2xl ring-1 ring-[var(--dt-text)]/5 p-8 md:p-14 text-center"
          >
            <span
              className="absolute inset-0 opacity-[0.14] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, rgba(200,143,122,0.5), transparent 50%), radial-gradient(circle at 80% 70%, rgba(167,178,159,0.5), transparent 50%)",
              }}
            />
            <span className="relative inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--dt-text-muted)]">
              <Heart size={11} className="text-[var(--dt-primary)]" />
              You took a quiet turn
            </span>
            <h1 className="relative font-serif text-[44px] md:text-[64px] leading-[1.05] text-[var(--dt-text)] mt-4">
              The page you were holding onto isn't here.
            </h1>
            <p className="relative text-[15px] md:text-[16px] text-[var(--dt-text-secondary)] mt-4 max-w-[520px] mx-auto leading-relaxed">
              That's okay. Sometimes we lose our way for a moment. Here are a few
              soft places you can land instead.
            </p>
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 mt-7">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[13.5px] font-semibold px-6 py-3 rounded-full bg-[var(--dt-primary)] text-white hover:bg-[var(--dt-primary-hover)] shadow-dt-sm hover:shadow-dt-glow transition-all"
              >
                <ArrowLeft size={14} />
                Back to home
              </Link>
              <Link
                to="/community"
                className="inline-flex items-center gap-2 text-[13.5px] font-semibold px-6 py-3 rounded-full bg-[var(--dt-card)] border border-[var(--dt-border)] text-[var(--dt-text)] hover:bg-[var(--dt-bg)] transition-all"
              >
                Enter community
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-8">
            {detours.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={d.to}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * (i + 1), duration: 0.35 }}
                >
                  <Link
                    to={d.to}
                    className="group flex items-start gap-3 p-4 rounded-2xl bg-[var(--dt-card)] border border-[var(--dt-border-light)] hover:border-[var(--dt-primary)]/40 hover:-translate-y-0.5 transition-all"
                  >
                    <span className="grid place-items-center shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--dt-primary-light)]/70 to-[var(--dt-secondary-light)]/70 text-[var(--dt-primary)]">
                      <Icon size={16} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[14px] font-semibold text-[var(--dt-text)] group-hover:text-[var(--dt-primary)] transition-colors">
                        {d.label}
                      </span>
                      <span className="block text-[12px] text-[var(--dt-text-secondary)] mt-0.5">
                        {d.desc}
                      </span>
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
