import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/sections/Navbar";
import { Ear, Send, Heart, Shield, AlertTriangle, Clock, MessageCircle } from "lucide-react";

export default function HearMe() {
  const { isAuthenticated } = useAuth();
  const [urgency, setUrgency] = useState<"low" | "medium" | "high" | "crisis">("medium");
  const [feeling, setFeeling] = useState("");
  const [communication, setCommunication] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const createRequest = trpc.listener.create.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feeling.trim()) return;
    createRequest.mutate({ urgency, feeling, communication: communication || undefined });
  };

  return (
    <div className="min-h-screen bg-[var(--dt-bg)]">
      <Navbar />
      <main className="pt-[88px] px-4 sm:px-6 md:px-12 py-8 sm:py-12">
        <div className="max-w-[600px] mx-auto">
          <div className="text-center mb-10">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[var(--dt-secondary-light)] flex items-center justify-center mb-4">
              <Ear size={24} className="text-[var(--dt-secondary)]" />
            </div>
            <h1 className="font-serif text-[32px] text-[var(--dt-text)]">
              Need someone to simply listen?
            </h1>
            <p className="text-[15px] text-[var(--dt-text-secondary)] mt-3 max-w-[450px] mx-auto leading-relaxed">
              This is not therapy. This is not legal advice. This is a human
              being who will sit with you in what you're going through.
            </p>
          </div>

          {submitted ? (
            <motion.div
              className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-8 text-center shadow-dt-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-[var(--dt-secondary-light)] flex items-center justify-center mb-4">
                <Heart size={24} className="text-[var(--dt-secondary)]" />
              </div>
              <h3 className="font-serif text-[22px] text-[var(--dt-text)] mb-2">
                We've received your request
              </h3>
              <p className="text-[14px] text-[var(--dt-text-secondary)] leading-relaxed">
                A volunteer listener will reach out to you soon. In the meantime,
                you're welcome to explore the community or journal your thoughts.
                You are not alone.
              </p>
              <div className="flex gap-3 justify-center mt-6">
                <Link
                  to="/community"
                  className="px-6 py-2.5 rounded-full bg-[var(--dt-primary)] text-white text-[13px] font-medium hover:bg-[var(--dt-primary-hover)] transition-colors"
                >
                  Community Feed
                </Link>
                <Link
                  to="/journal"
                  className="px-6 py-2.5 rounded-full border border-[var(--dt-border)] text-[var(--dt-text)] text-[13px] font-medium hover:bg-[var(--dt-card)] transition-colors"
                >
                  Write in Journal
                </Link>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Urgency */}
              <div className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-6 shadow-dt-sm">
                <label className="text-[12px] font-semibold uppercase tracking-wider text-[var(--dt-text-muted)] mb-4 block">
                  How urgent is this?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "low" as const, label: "Just need to talk", color: "#A7B29F" },
                    { value: "medium" as const, label: "It's been heavy", color: "#D4A574" },
                    { value: "high" as const, label: "Really struggling", color: "#C88F7A" },
                    { value: "crisis" as const, label: "In crisis", color: "#BF8F9E" },
                  ].map((u) => (
                    <button
                      key={u.value}
                      type="button"
                      onClick={() => setUrgency(u.value)}
                      className={`p-3 rounded-xl text-[13px] font-medium text-center transition-all border ${
                        urgency === u.value
                          ? "border-[var(--dt-primary)] bg-[var(--dt-primary-light)] text-[var(--dt-primary)]"
                          : "border-[var(--dt-border)] text-[var(--dt-text-secondary)] hover:border-[var(--dt-primary)]/50"
                      }`}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feeling */}
              <div className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-6 shadow-dt-sm">
                <label className="text-[12px] font-semibold uppercase tracking-wider text-[var(--dt-text-muted)] mb-3 block">
                  What are you feeling right now?
                </label>
                <textarea
                  value={feeling}
                  onChange={(e) => setFeeling(e.target.value)}
                  placeholder="Say what you cannot say elsewhere..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--dt-bg)] border border-[var(--dt-border)] text-[var(--dt-text)] placeholder:text-[var(--dt-text-muted)] text-[14px] resize-none focus:outline-none focus:border-[var(--dt-primary)]"
                  required
                />
              </div>

              {/* Communication */}
              <div className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-6 shadow-dt-sm">
                <label className="text-[12px] font-semibold uppercase tracking-wider text-[var(--dt-text-muted)] mb-3 block">
                  How would you prefer to connect?
                </label>
                <input
                  type="text"
                  value={communication}
                  onChange={(e) => setCommunication(e.target.value)}
                  placeholder="Email, or any preference..."
                  className="w-full px-4 py-3 rounded-xl bg-[var(--dt-bg)] border border-[var(--dt-border)] text-[var(--dt-text)] placeholder:text-[var(--dt-text-muted)] text-[14px] focus:outline-none focus:border-[var(--dt-primary)]"
                />
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[rgba(220,90,90,0.04)]">
                <AlertTriangle size={16} className="text-[#C85A5A] flex-shrink-0 mt-0.5" />
                <p className="text-[12px] text-[var(--dt-text-muted)] leading-relaxed">
                  If you're in immediate danger or having thoughts of self-harm,
                  please call emergency services (112) or visit our{" "}
                  <Link to="/emergency" className="text-[#C85A5A] hover:underline">
                    Emergency Help page
                  </Link>
                  .
                </p>
              </div>

              <button
                type="submit"
                disabled={!feeling.trim() || createRequest.isPending}
                className="w-full py-3.5 rounded-full bg-[var(--dt-primary)] text-white text-[14px] font-medium hover:bg-[var(--dt-primary-hover)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[var(--dt-primary)] transition-all flex items-center justify-center gap-2"
              >
                <Send size={14} />
                {createRequest.isPending
                  ? "Submitting..."
                  : !feeling.trim()
                    ? "Share a little about how you're feeling first"
                    : "Request a Listener"}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
