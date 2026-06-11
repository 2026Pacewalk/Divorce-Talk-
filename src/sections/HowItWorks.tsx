import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Create an anonymous identity",
    desc: "No real names required. Pick a username that feels right for you.",
    img: "/howitworks-anonymous.jpg",
  },
  {
    num: "02",
    title: "Share freely",
    desc: "Post emotions, thoughts and experiences safely without fear of judgment.",
    img: "/howitworks-share.jpg",
  },
  {
    num: "03",
    title: "Receive support",
    desc: "Connect with people who genuinely understand what you're going through.",
    img: "/howitworks-support.jpg",
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-8 text-center shadow-dt-sm hover:shadow-dt-md hover:-translate-y-0.5 transition-all duration-300"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <div className="w-[120px] h-[120px] mx-auto rounded-xl overflow-hidden">
        <img
          src={step.img}
          alt={step.title}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="inline-block mt-6 px-3 py-1 rounded-full bg-[var(--dt-primary-light)] text-[var(--dt-primary)] text-[12px] font-semibold">
        {step.num}
      </span>
      <h4 className="font-serif text-[20px] text-[var(--dt-text)] mt-4">
        {step.title}
      </h4>
      <p className="text-[14px] text-[var(--dt-text-secondary)] mt-2 leading-relaxed">
        {step.desc}
      </p>
    </motion.div>
  );
}

export default function HowItWorks() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section className="py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          ref={headerRef}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-[28px] md:text-[40px] text-[var(--dt-text)]">
            How It Works
          </h2>
          <p className="text-[16px] text-[var(--dt-text-secondary)] mt-3">
            Three simple steps to begin your healing journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-9">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
