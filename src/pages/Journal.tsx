import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import { useDemoMode } from "@/hooks/useDemoMode";
import { demoJournalEntries } from "@/lib/demoData";
import Navbar from "@/sections/Navbar";
import {
  BookOpen,
  PenLine,
  Lock,
  Save,
  X,
  Sparkles,
  Calendar,
  Heart,
} from "lucide-react";

const prompts = [
  "What hurt today?",
  "What are you afraid of?",
  "What do you wish you could say?",
  "What are you grateful for right now?",
  "What does healing look like to you?",
  "Describe how your body feels today.",
  "What would you tell yourself a year ago?",
  "What do you need more of in your life?",
  "Write about a moment of peace you had.",
  "What are you holding onto that you need to release?",
];

const moodOptions = ["hopeful", "numb", "anxious", "lonely", "healing", "angry", "exhausted", "calm"];

const moodEmojis: Record<string, string> = {
  hopeful: "✨", numb: "🌫️", anxious: "🌊", lonely: "🌙",
  healing: "🌱", angry: "🔥", exhausted: "😔", calm: "🍃",
};

export default function Journal() {
  const { isAuthenticated, user } = useAuth();
  const { isDemoMode } = useDemoMode();
  const [showNew, setShowNew] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<string | undefined>();
  const [prompt, setPrompt] = useState("");
  const [saved, setSaved] = useState(false);

  const { data: entries } = trpc.journal.list.useQuery(undefined, {
    enabled: isAuthenticated && !isDemoMode,
  });

  const displayEntries = isDemoMode ? { items: demoJournalEntries } : entries;

  const createEntry = trpc.journal.create.useMutation({
    onSuccess: () => {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setShowNew(false);
        setTitle("");
        setContent("");
        setMood(undefined);
        setPrompt("");
      }, 1500);
    },
  });

  const handleSave = () => {
    if (!content.trim()) return;
    createEntry.mutate({ title: title || undefined, content, mood: mood || undefined, prompt: prompt || undefined });
  };

  const randomPrompt = () => {
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--dt-bg)]">
        <Navbar />
        <main className="pt-[88px] px-6 flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-[400px]">
            <Lock size={40} className="mx-auto text-[var(--dt-primary)] mb-4" />
            <h2 className="font-serif text-[24px] text-[var(--dt-text)]">Your Private Space</h2>
            <p className="text-[var(--dt-text-secondary)] mt-3">Sign in to access your personal journal. Everything stays private.</p>
            <Link to="/login" className="inline-block mt-6 px-8 py-3 rounded-full bg-[var(--dt-primary)] text-white text-[14px] font-medium hover:bg-[var(--dt-primary-hover)] transition-colors">
              Sign In to Journal
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--dt-bg)]">
      <Navbar />
      <main className="pt-[88px] px-4 sm:px-6 md:px-12 py-8 sm:py-12">
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-10">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[var(--dt-primary-light)] flex items-center justify-center mb-4">
              <BookOpen size={24} className="text-[var(--dt-primary)]" />
            </div>
            <h1 className="font-serif text-[32px] text-[var(--dt-text)]">Private Journal</h1>
            <p className="text-[16px] text-[var(--dt-text-secondary)] mt-2">
              This space is only yours. No one else can see what you write here.
            </p>
          </div>

          {/* New Entry */}
          <motion.div
            className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-6 shadow-dt-sm"
            layout
          >
            {saved ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 mx-auto rounded-full bg-[var(--dt-secondary-light)] flex items-center justify-center mb-3"
                >
                  <Heart size={24} className="text-[var(--dt-secondary)]" />
                </motion.div>
                <p className="text-[var(--dt-text-secondary)]">Entry saved. You're doing great.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <PenLine size={16} className="text-[var(--dt-primary)]" />
                    <span className="text-[13px] font-medium text-[var(--dt-text)]">New Entry</span>
                  </div>
                  <button
                    onClick={randomPrompt}
                    className="flex items-center gap-1.5 text-[12px] text-[var(--dt-primary)] hover:underline"
                  >
                    <Sparkles size={12} />
                    Get a prompt
                  </button>
                </div>

                {prompt && (
                  <div className="mb-4 p-3 rounded-xl bg-[var(--dt-primary-light)]/50 text-[14px] text-[var(--dt-primary)] italic flex items-center justify-between">
                    <span>{prompt}</span>
                    <button onClick={() => setPrompt("")} className="ml-2">
                      <X size={14} />
                    </button>
                  </div>
                )}

                <input
                  type="text"
                  placeholder="Title (optional)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mb-3 px-4 py-2.5 rounded-xl bg-[var(--dt-bg)] border border-[var(--dt-border)] text-[var(--dt-text)] placeholder:text-[var(--dt-text-muted)] text-[14px] focus:outline-none focus:border-[var(--dt-primary)]"
                />
                <textarea
                  placeholder="Write freely..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--dt-bg)] border border-[var(--dt-border)] text-[var(--dt-text)] placeholder:text-[var(--dt-text-muted)] text-[14px] resize-none focus:outline-none focus:border-[var(--dt-primary)]"
                />

                <div className="flex flex-wrap gap-2 mt-3">
                  {moodOptions.map((m) => (
                    <button
                      key={m}
                      onClick={() => setMood(mood === m ? undefined : m)}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                        mood === m
                          ? "bg-[var(--dt-primary)] text-white"
                          : "bg-[var(--dt-bg)] text-[var(--dt-text-secondary)] border border-[var(--dt-border)] hover:border-[var(--dt-primary)]"
                      }`}
                    >
                      {moodEmojis[m]} {m.charAt(0).toUpperCase() + m.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-5">
                  <span className="text-[12px] text-[var(--dt-text-muted)] flex items-center gap-1">
                    <Lock size={12} />
                    Private — only you can see this
                  </span>
                  <button
                    onClick={handleSave}
                    disabled={!content.trim() || createEntry.isPending}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--dt-primary)] text-white text-[13px] font-medium hover:bg-[var(--dt-primary-hover)] disabled:opacity-40 transition-all"
                  >
                    <Save size={14} />
                    {createEntry.isPending ? "Saving..." : "Save Entry"}
                  </button>
                </div>
              </>
            )}
          </motion.div>

          {/* Past Entries */}
          <div className="mt-8">
            <h3 className="text-[12px] font-semibold uppercase tracking-wider text-[var(--dt-text-muted)] mb-4">
              Your Journey
            </h3>
            {(!displayEntries?.items || displayEntries.items.length === 0) && (
              <p className="text-[14px] text-[var(--dt-text-muted)] text-center py-8">
                Your journal is empty. Write your first entry above.
              </p>
            )}
            <div className="space-y-3">
              {displayEntries?.items?.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-xl p-5 shadow-dt-sm hover:shadow-dt-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar size={13} className="text-[var(--dt-text-muted)]" />
                    <span className="text-[12px] text-[var(--dt-text-muted)]">
                      {new Date(entry.createdAt).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    {entry.mood && (
                      <span className="px-2 py-0.5 rounded-full bg-[var(--dt-primary-light)] text-[var(--dt-primary)] text-[11px] font-medium">
                        {moodEmojis[entry.mood]} {entry.mood}
                      </span>
                    )}
                  </div>
                  {entry.title && (
                    <h4 className="font-serif text-[16px] text-[var(--dt-text)] mb-1">{entry.title}</h4>
                  )}
                  {entry.prompt && (
                    <p className="text-[12px] text-[var(--dt-primary)] italic mb-2">{entry.prompt}</p>
                  )}
                  <p className="text-[14px] text-[var(--dt-text-secondary)] leading-relaxed line-clamp-3">
                    {entry.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
