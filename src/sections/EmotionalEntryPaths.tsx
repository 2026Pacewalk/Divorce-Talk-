import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router";
import { Heart, Ear, BookOpen, Users, ArrowRight } from "lucide-react";

const paths = [
  {
    title: "My relationship is falling apart",
    subtitle: "Share what you cannot say elsewhere",
    cta: "Anonymous Feed",
    href: "/community",
    icon: Heart,
    gradient: "from-[#C88F7A]/20 to-[#D9B8A8]/20",
    iconBg: "bg-[var(--dt-primary-light)]",
    iconColor: "text-[var(--dt-primary)]",
  },
  {
    title: "I feel alone and need someone to listen",
    subtitle: "A human who will simply hear you",
    cta: "Request a Listener",
    href: "/hear-me",
    icon: Ear,
    gradient: "from-[#A7B29F]/20 to-[#C88F7A]/10",
    iconBg: "bg-[var(--dt-secondary-light)]",
    iconColor: "text-[var(--dt-secondary)]",
  },
  {
    title: "I don't know what I'm feeling",
    subtitle: "Gently explore your emotions",
    cta: "Journal & Check-in",
    href: "/journal",
    icon: BookOpen,
    gradient: "from-[#D9B8A8]/20 to-[#A7B29F]/15",
    iconBg: "bg-[#F0E6DC]",
    iconColor: "text-[#B5835A]",
  },
  {
    title: "I just want to read others' stories",
    subtitle: "Find comfort in shared experiences",
    cta: "Explore Stories",
    href: "/community",
    icon: Users,
    gradient: "from-[#E0E5DC]/30 to-[#F0D9CF]/20",
    iconBg: "bg-[var(--dt-secondary-light)]",
    iconColor: "text-[var(--dt-secondary)]",
  },
];

export default function EmotionalEntryPaths() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 md:py-16 px-6 md:px-12" ref={ref}>
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          className="text-center mb-9"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[12px] font-medium text-[var(--dt-text-muted)] uppercase tracking-[0.1em] mb-3">
            Where do you need support?
          </p>
          <h2 className="font-serif text-[28px] md:text-[36px] text-[var(--dt-text)]">
            Find your path forward
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {paths.map((path, i) => (
            <motion.div
              key={path.href + path.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={path.href}
                className="group block bg-gradient-to-br rounded-2xl p-7 border border-[var(--dt-border-light)] hover:border-[var(--dt-primary)]/30 transition-all duration-300 hover:shadow-dt-md"
              >
                <div className={`w-12 h-12 rounded-xl ${path.iconBg} flex items-center justify-center mb-5`}>
                  <path.icon size={22} className={path.iconColor} />
                </div>
                <h3 className="font-serif text-[20px] text-[var(--dt-text)] group-hover:text-[var(--dt-primary)] transition-colors">
                  {path.title}
                </h3>
                <p className="text-[14px] text-[var(--dt-text-secondary)] mt-2 leading-relaxed">
                  {path.subtitle}
                </p>
                <div className="flex items-center gap-2 mt-5 text-[13px] font-medium text-[var(--dt-primary)]">
                  <span>{path.cta}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
