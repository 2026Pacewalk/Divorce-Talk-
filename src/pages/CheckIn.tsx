import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/sections/Navbar";
import { HeartPulse, ArrowRight, RotateCcw, Sparkles } from "lucide-react";

const questions = [
  { text: "Do you feel emotionally safe in your relationship?", dimension: "safety" },
  { text: "Do you feel heard when you express yourself?", dimension: "communication" },
  { text: "Are conflicts recurring without resolution?", dimension: "conflict" },
  { text: "Do you feel trapped or stuck?", dimension: "freedom" },
  { text: "Are you staying in the relationship out of fear?", dimension: "fear" },
  { text: "Do you still feel like yourself?", dimension: "identity" },
  { text: "Is there emotional intimacy between you?", dimension: "intimacy" },
  { text: "Do you feel respected and valued?", dimension: "respect" },
];

const results = {
  thriving: {
    title: "You're in a good place",
    desc: "Your responses suggest your relationship has strong foundations. Keep nurturing the connection and communication that makes it work.",
    color: "#8FBF7A",
    bgColor: "#E8F5E9",
  },
  moderate: {
    title: "Some areas need attention",
    desc: "Your relationship has strengths, but there are areas where you might benefit from better communication or support. Consider having an honest conversation with your partner or seeking guidance.",
    color: "#D4A574",
    bgColor: "#FFF3E0",
  },
  struggling: {
    title: "You're carrying a lot",
    desc: "Your responses suggest you're experiencing significant emotional distress. Please know that what you're feeling is valid, and support is available. Consider reaching out to the community or a professional.",
    color: "#C88F7A",
    bgColor: "var(--dt-primary-light)",
  },
  crisis: {
    title: "You need support right now",
    desc: "Your responses indicate you may be in a high-distress situation. Your safety and wellbeing matter most. Please reach out for help — you don't have to go through this alone.",
    color: "#BF8F9E",
    bgColor: "#FFEBEE",
  },
};

type ResultKey = keyof typeof results;

export default function CheckIn() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [current]: value });
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const score = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 3;
  const percentage = score / maxScore;

  const getResult = (): ResultKey => {
    if (percentage >= 0.7) return "thriving";
    if (percentage >= 0.45) return "moderate";
    if (percentage >= 0.25) return "struggling";
    return "crisis";
  };

  const result = showResult ? results[getResult()] : null;

  const reset = () => {
    setCurrent(0);
    setAnswers({});
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-[var(--dt-bg)]">
      <Navbar />
      <main className="pt-[88px] px-4 sm:px-6 md:px-12 py-8 sm:py-12">
        <div className="max-w-[600px] mx-auto">
          <div className="text-center mb-10">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F0E6DC] flex items-center justify-center mb-4">
              <HeartPulse size={24} className="text-[#B5835A]" />
            </div>
            <h1 className="font-serif text-[32px] text-[var(--dt-text)]">
              Relationship Check-In
            </h1>
            <p className="text-[14px] text-[var(--dt-text-muted)] mt-2 max-w-[400px] mx-auto">
              A gentle self-assessment. This is not a diagnosis — just a moment to check in with yourself.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-8 shadow-dt-sm"
              >
                {/* Progress */}
                <div className="flex items-center gap-2 mb-8">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all ${
                        i <= current ? "bg-[var(--dt-primary)]" : "bg-[var(--dt-border)]"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-[12px] text-[var(--dt-text-muted)] mb-2">
                  Question {current + 1} of {questions.length}
                </p>
                <h3 className="font-serif text-[22px] text-[var(--dt-text)] mb-8 leading-[1.4]">
                  {questions[current].text}
                </h3>

                <div className="space-y-3">
                  {[
                    { value: 3, label: "Yes, absolutely", emoji: "✨" },
                    { value: 2, label: "Sometimes", emoji: "🌤️" },
                    { value: 1, label: "Rarely", emoji: "🌫️" },
                    { value: 0, label: "Not at all", emoji: "🌧️" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className="w-full flex items-center gap-4 p-4 rounded-xl bg-[var(--dt-bg)] border border-[var(--dt-border)] hover:border-[var(--dt-primary)] hover:bg-[var(--dt-primary-light)]/30 transition-all text-left"
                    >
                      <span className="text-[20px]">{option.emoji}</span>
                      <span className="text-[14px] text-[var(--dt-text)]">{option.label}</span>
                      <ArrowRight size={16} className="ml-auto text-[var(--dt-text-muted)]" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-8 shadow-dt-sm text-center"
              >
                <div
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: result?.bgColor }}
                >
                  <Sparkles size={24} style={{ color: result?.color }} />
                </div>
                <h3 className="font-serif text-[24px] text-[var(--dt-text)] mb-3">
                  {result?.title}
                </h3>
                <p className="text-[15px] text-[var(--dt-text-secondary)] leading-relaxed">
                  {result?.desc}
                </p>

                <div className="flex flex-wrap gap-3 justify-center mt-8">
                  <Link
                    to="/hear-me"
                    className="px-6 py-2.5 rounded-full bg-[var(--dt-primary)] text-white text-[13px] font-medium hover:bg-[var(--dt-primary-hover)] transition-colors"
                  >
                    Talk to Someone
                  </Link>
                  <Link
                    to="/journal"
                    className="px-6 py-2.5 rounded-full border border-[var(--dt-border)] text-[var(--dt-text)] text-[13px] font-medium hover:bg-[var(--dt-card)] transition-colors"
                  >
                    Journal Your Thoughts
                  </Link>
                </div>

                <button
                  onClick={reset}
                  className="flex items-center gap-2 mx-auto mt-6 text-[13px] text-[var(--dt-text-muted)] hover:text-[var(--dt-text)] transition-colors"
                >
                  <RotateCcw size={14} />
                  Take again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
