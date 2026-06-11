import { motion } from "framer-motion";

const messages = [
  "You are not weak for needing support.",
  "Healing takes time. Be patient with yourself.",
  "You don't have to explain everything here.",
  "Someone understands your pain. You're not alone.",
  "Your feelings are valid, always.",
  "It's okay to not be okay.",
];

export default function ReassuranceStrip() {
  return (
    <section className="relative py-12 overflow-hidden bg-gradient-to-r from-[var(--dt-bg)] via-[var(--dt-primary-light)]/10 to-[var(--dt-bg)]">
      <div className="flex animate-scroll-x hover:[animation-play-state:paused]">
        {[...messages, ...messages, ...messages].map((msg, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center gap-6 px-8"
          >
            <span className="text-[15px] md:text-[17px] font-serif italic text-[var(--dt-text)] whitespace-nowrap">
              {msg}
            </span>
            <span className="w-[6px] h-[6px] rounded-full bg-[var(--dt-primary)]/40 flex-shrink-0" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll-x {
          animation: scroll-x 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
