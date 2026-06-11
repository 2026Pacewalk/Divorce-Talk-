import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[110] origin-left bg-gradient-to-r from-[var(--dt-primary)] via-[#D9B8A8] to-[var(--dt-secondary)] pointer-events-none"
    />
  );
}
