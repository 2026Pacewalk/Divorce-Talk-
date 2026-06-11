import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router";

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-16 md:py-20 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--dt-text)]/50" />
      </div>

      <motion.div
        ref={ref}
        className="relative z-10 max-w-[600px] mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <h2 className="font-serif text-[28px] md:text-[40px] text-white leading-[1.2]">
          Healing begins when someone finally listens.
        </h2>
        <p className="text-[16px] md:text-[18px] text-white/80 mt-5">
          Join thousands of people who found the courage to speak.
        </p>

        <motion.div
          className="mt-10"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Link
            to="/community"
            className="inline-block px-10 py-4 rounded-full bg-white text-[var(--dt-text)] text-[15px] font-medium hover:bg-[var(--dt-primary-light)] transition-colors duration-200 shadow-lg"
          >
            Enter Community
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
