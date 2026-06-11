import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router";
import { Quote } from "lucide-react";

export default function WhyExists() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 md:py-16 px-6 md:px-12 bg-gradient-to-b from-[var(--dt-bg)] to-[var(--dt-primary-light)]/20" ref={ref}>
      <div className="max-w-[800px] mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Quote size={28} className="mx-auto text-[var(--dt-primary)]/30 mb-6" />
          <h2 className="font-serif text-[24px] md:text-[32px] text-[var(--dt-text)] leading-[1.4]">
            People post emotional pain on Instagram stories, WhatsApp statuses,
            and random social feeds because they have nowhere safer to go.
          </h2>
          <p className="font-serif text-[20px] md:text-[24px] text-[var(--dt-primary)] mt-6 italic">
            Divorce Talk exists to create a healthier space.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full border border-[var(--dt-primary)] text-[var(--dt-primary)] text-[14px] font-medium hover:bg-[var(--dt-primary)] hover:text-white transition-all"
          >
            Learn Our Story
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
