import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Heart, ShieldCheck, Users } from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Anonymous",
    desc: "Your identity stays private. Always.",
    color: "#C88F7A",
  },
  {
    icon: Heart,
    title: "Compassionate",
    desc: "Kindness-first conversations. No exceptions.",
    color: "#BF8F9E",
  },
  {
    icon: ShieldCheck,
    title: "Moderated",
    desc: "Safe emotional environment maintained 24/7.",
    color: "#A7B29F",
  },
  {
    icon: Users,
    title: "Human",
    desc: "Real people. Real healing. No bots.",
    color: "#8FA3BF",
  },
];

function ValueCard({
  value,
  index,
}: {
  value: (typeof values)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const Icon = value.icon;

  return (
    <motion.div
      ref={ref}
      className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-8 flex items-start gap-5 shadow-dt-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${value.color}18` }}
      >
        <Icon size={26} style={{ color: value.color }} />
      </div>
      <div>
        <h4 className="font-sans text-[18px] font-medium text-[var(--dt-text)]">
          {value.title}
        </h4>
        <p className="text-[14px] text-[var(--dt-text-secondary)] mt-1.5 leading-relaxed">
          {value.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Values() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section className="py-12 md:py-16 px-6 md:px-12 bg-gradient-to-b from-[var(--dt-bg)] to-[var(--dt-secondary-light)]/15">
      <div className="max-w-[1000px] mx-auto">
        <motion.div
          ref={headerRef}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-[28px] md:text-[40px] text-[var(--dt-text)]">
            Built on Trust
          </h2>
          <p className="text-[16px] text-[var(--dt-text-secondary)] mt-3">
            The values that keep our community safe
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-9">
          {values.map((v, i) => (
            <ValueCard key={v.title} value={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
