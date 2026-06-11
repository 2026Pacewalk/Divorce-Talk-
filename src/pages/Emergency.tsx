import Navbar from "@/sections/Navbar";
import { motion } from "framer-motion";
import { Phone, Heart, AlertTriangle } from "lucide-react";

const emergencyNumbers = [
  { name: "National Emergency", number: "112", desc: "For immediate danger or life-threatening situations" },
  { name: "Mental Health Helpline", number: "1860-2662-345 / 1800-599-0019", desc: "24/7 confidential emotional support" },
  { name: "Women's Helpline", number: "181", desc: "Domestic violence and women's safety" },
  { name: "Men's Support Line", number: "1800-599-0019", desc: "Support for men in crisis" },
  { name: "Child Helpline", number: "1098", desc: "Support for children and co-parenting concerns" },
];

export default function Emergency() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--dt-bg)] to-[var(--dt-primary-light)]/20">
      <Navbar />
      <main className="pt-[88px] px-4 sm:px-6 md:px-12 pb-12 sm:pb-16">
        <div className="max-w-[700px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Heart size={32} className="mx-auto text-[var(--dt-primary)] mb-4" />
            <h1 className="font-serif text-[36px] md:text-[48px] text-[var(--dt-text)]">
              You Are Not Alone
            </h1>
            <p className="text-[16px] text-[var(--dt-text-secondary)] mt-4 leading-relaxed">
              If you're in immediate danger, please contact emergency services right away.
              Your safety is the most important thing.
            </p>
          </motion.div>

          <div className="mt-12 space-y-4 text-left">
            {emergencyNumbers.map((item, i) => (
              <motion.div
                key={item.name}
                className="bg-[var(--dt-card)] border-l-4 border-[var(--dt-primary)] rounded-r-xl p-6 shadow-dt-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[16px] font-medium text-[var(--dt-text)]">
                      {item.name}
                    </h3>
                    <p className="text-[13px] text-[var(--dt-text-muted)] mt-1">{item.desc}</p>
                  </div>
                  <a
                    href={`tel:${item.number.replace(/[^0-9]/g, "")}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--dt-primary-light)] text-[var(--dt-primary)] text-[14px] font-medium hover:bg-[var(--dt-primary)] hover:text-white transition-colors"
                  >
                    <Phone size={14} />
                    {item.number}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 bg-[var(--dt-card)] rounded-2xl p-8 shadow-dt-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <AlertTriangle size={24} className="mx-auto text-[#B5835A] mb-3" />
            <h3 className="font-serif text-[20px] text-[var(--dt-text)] mb-3">
              Remember
            </h3>
            <p className="text-[15px] text-[var(--dt-text-secondary)] leading-relaxed">
              This feeling is temporary, even if it doesn't feel that way right now.
              You have survived every difficult day so far, and that is proof of your strength.
              There are people who want to help — all you need to do is reach out.
              Your story isn't over yet.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
