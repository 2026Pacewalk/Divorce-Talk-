import { motion } from "framer-motion";
import { Link } from "react-router";
import { Shield, Heart, Handshake } from "lucide-react";
import DemoLoginButtons from "@/components/DemoLoginButtons";

const FloatingParticles = () => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: 4 + Math.random() * 6,
    left: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 12,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[var(--dt-primary)]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: "-10px",
            opacity: 0.15,
          }}
          animate={{
            y: [0, -800],
            x: [0, Math.sin(p.id) * 40, Math.sin(p.id + 1) * -30, 0],
            opacity: [0.1, 0.35, 0.2, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--dt-bg)] via-[var(--dt-bg)]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--dt-bg)]/30 to-transparent" />
      </div>

      <FloatingParticles />

      {/* Content */}
      <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center pt-20">
        <motion.p
          className="text-[12px] font-medium text-[var(--dt-text-secondary)] uppercase tracking-[0.08em] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A safe space for emotional healing
        </motion.p>

        <motion.h1
          className="font-serif text-[36px] sm:text-[48px] md:text-[56px] leading-[1.15] tracking-[-0.02em] text-[var(--dt-text)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Some heartbreaks are too heavy to carry alone.
        </motion.h1>

        <motion.p
          className="text-[16px] md:text-[18px] leading-[1.6] text-[var(--dt-text-secondary)] mt-5 max-w-[520px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          A safe anonymous community for people navigating divorce, separation
          and emotional rebuilding.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link
            to="/community"
            className="px-8 py-3.5 rounded-full bg-[var(--dt-primary)] text-white text-[15px] font-medium hover:bg-[var(--dt-primary-hover)] hover:scale-[1.02] transition-all duration-200 shadow-dt-sm hover:shadow-dt-glow"
          >
            Start Talking
          </Link>
          <Link
            to="/login?tab=join"
            className="px-8 py-3.5 rounded-full border-[1.5px] border-[var(--dt-border)] text-[var(--dt-text)] text-[15px] font-medium hover:border-[var(--dt-primary)] hover:bg-[var(--dt-card)] transition-all duration-200"
          >
            Join Anonymously
          </Link>
          <DemoLoginButtons variant="hero" />
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.1 }}
        >
          {[
            { icon: Shield, text: "100% Anonymous" },
            { icon: Heart, text: "Peer Support" },
            { icon: Handshake, text: "Non-Judgmental" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 text-[var(--dt-text-muted)]"
            >
              <item.icon size={14} className="text-[var(--dt-primary)]" />
              <span className="text-[12px] font-medium">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
