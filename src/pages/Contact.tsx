import { useState } from "react";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import { Mail, Clock, Send, Lock, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";

type Submission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
};

const STORAGE_KEY = "divorcetalk_contact_drafts";

function saveDraft(s: Submission) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list: Submission[] = raw ? JSON.parse(raw) : [];
    list.unshift(s);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 20)));
  } catch {
    // localStorage may be unavailable in private mode — silently ignore.
  }
}

export default function Contact() {
  const [submitted, setSubmitted] = useState<Submission | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [error, setError] = useState<string | null>(null);
  const submitMutation = trpc.contact.submit.useMutation();

  const validate = (): string | null => {
    if (!form.name.trim()) return "Please share what we can call you.";
    if (!form.email.trim()) return "Please leave an email so we can reply.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "That email doesn't look quite right.";
    if (!form.subject.trim()) return "A short subject helps us route this gently.";
    if (form.message.trim().length < 10) return "Tell us a little more — even a sentence or two.";
    return null;
  };

  const submitting = submitMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    const submission: Submission = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ...form,
      submittedAt: new Date().toISOString(),
    };
    // Always keep a local copy in case the server-side fails — your message
    // never just disappears.
    saveDraft(submission);
    try {
      await submitMutation.mutateAsync(form);
      setSubmitted(submission);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "We couldn't reach the server. Your message is saved on your device.";
      setError(msg);
    }
  };

  const reset = () => {
    setSubmitted(null);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[var(--dt-bg)]">
      <Navbar />
      <main className="pt-[88px] px-4 sm:px-6 md:px-12 pb-12 sm:pb-16">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {/* Left - Info */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--dt-text-muted)]">
                Reach out
              </p>
              <h1 className="font-serif text-[34px] md:text-[44px] text-[var(--dt-text)] mt-2 leading-[1.05]">
                We're here for you.
              </h1>
              <p className="text-[15px] text-[var(--dt-text-secondary)] mt-4 leading-relaxed">
                For support, partnership, or quiet questions. We read every message
                a human at a time.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--dt-primary-light)] flex items-center justify-center flex-shrink-0">
                    <Mail size={17} className="text-[var(--dt-primary)]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[var(--dt-text)]">Email</p>
                    <p className="text-[13.5px] text-[var(--dt-text-secondary)]">hello@divorcetalk.in</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--dt-secondary-light)] flex items-center justify-center flex-shrink-0">
                    <Clock size={17} className="text-[var(--dt-secondary)]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[var(--dt-text)]">Response time</p>
                    <p className="text-[13.5px] text-[var(--dt-text-secondary)]">Within 24–48 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--dt-bg)] border border-[var(--dt-border-light)] flex items-center justify-center flex-shrink-0">
                    <Lock size={16} className="text-[var(--dt-text-muted)]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[var(--dt-text)]">Privacy</p>
                    <p className="text-[13.5px] text-[var(--dt-text-secondary)]">
                      Your message is private. We never share what you write.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <motion.div
              className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-6 sm:p-8 shadow-dt-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[var(--dt-secondary-light)] flex items-center justify-center mb-4">
                    <Send size={22} className="text-[var(--dt-secondary)]" />
                  </div>
                  <h3 className="font-serif text-[22px] text-[var(--dt-text)] mb-2">
                    Thank you, {submitted.name.split(" ")[0]}.
                  </h3>
                  <p className="text-[14px] text-[var(--dt-text-secondary)] max-w-[320px] mx-auto leading-relaxed">
                    Your note is sitting safely with us. We read every message and
                    we'll reply to <span className="font-medium text-[var(--dt-text)]">{submitted.email}</span> within
                    a day or two.
                  </p>
                  <div className="mt-4 inline-flex items-start gap-2 text-left px-4 py-3 rounded-xl bg-[var(--dt-bg)] border border-[var(--dt-border-light)] max-w-[360px]">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--dt-text-muted)] shrink-0 mt-0.5">
                      Re:
                    </span>
                    <p className="text-[13px] text-[var(--dt-text)] leading-snug">{submitted.subject}</p>
                  </div>
                  <button
                    onClick={reset}
                    className="mt-6 inline-flex items-center gap-1.5 text-[12.5px] font-medium px-4 py-2 rounded-full bg-[var(--dt-card)] border border-[var(--dt-border)] text-[var(--dt-text)] hover:bg-[var(--dt-bg)] transition-colors"
                  >
                    <ArrowLeft size={12} />
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--dt-text-muted)]">
                      Your name
                    </span>
                    <input
                      type="text"
                      placeholder="What can we call you?"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-1.5 w-full px-4 py-3 rounded-xl bg-[var(--dt-bg)] border border-[var(--dt-border)] text-[var(--dt-text)] placeholder:text-[var(--dt-text-muted)] text-[14px] focus:outline-none focus:border-[var(--dt-primary)] transition-all"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--dt-text-muted)]">
                      Your email
                    </span>
                    <input
                      type="email"
                      placeholder="you@quiet.place"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-1.5 w-full px-4 py-3 rounded-xl bg-[var(--dt-bg)] border border-[var(--dt-border)] text-[var(--dt-text)] placeholder:text-[var(--dt-text-muted)] text-[14px] focus:outline-none focus:border-[var(--dt-primary)] transition-all"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--dt-text-muted)]">
                      Subject
                    </span>
                    <input
                      type="text"
                      placeholder="A short summary"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="mt-1.5 w-full px-4 py-3 rounded-xl bg-[var(--dt-bg)] border border-[var(--dt-border)] text-[var(--dt-text)] placeholder:text-[var(--dt-text-muted)] text-[14px] focus:outline-none focus:border-[var(--dt-primary)] transition-all"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--dt-text-muted)]">
                      Your message
                    </span>
                    <textarea
                      placeholder="Say it however you'd like to say it."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      className="mt-1.5 w-full px-4 py-3 rounded-xl bg-[var(--dt-bg)] border border-[var(--dt-border)] text-[var(--dt-text)] placeholder:text-[var(--dt-text-muted)] text-[14px] resize-none focus:outline-none focus:border-[var(--dt-primary)] transition-all"
                    />
                  </label>

                  {error && (
                    <div className="text-[12.5px] text-[#B5835A] bg-[#FFF3E0] border border-[#FFE0B2] rounded-xl px-3 py-2">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-full bg-[var(--dt-primary)] text-white text-[14px] font-medium hover:bg-[var(--dt-primary-hover)] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <span className="w-3 h-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Send message
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-[var(--dt-text-muted)] text-center">
                    We read every message a real human at a time.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
