import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Handshake, Sprout, MessageCircle } from "lucide-react";
import { Link } from "react-router";

const samplePosts = [
  {
    username: "StillBreathing",
    time: "2 hours ago",
    mood: "Lonely • Hopeful",
    content:
      "Today I removed our wedding photos from the wall. I didn't cry this time. Small steps, right?",
    support: 42,
    relate: 18,
    stayStrong: 12,
    comments: 8,
  },
  {
    username: "RebuildingSlowly",
    time: "5 hours ago",
    mood: "Healing",
    content:
      "I finally slept peacefully after weeks of tossing and turning. Small wins matter more than people realize.",
    support: 67,
    relate: 31,
    stayStrong: 24,
    comments: 12,
  },
  {
    username: "QuietWarrior",
    time: "8 hours ago",
    mood: "Confused • Lonely",
    content:
      "Some days I miss the idea of us more than the reality. Is that normal? It feels like I'm grieving a version of my life that never really existed.",
    support: 89,
    relate: 56,
    stayStrong: 34,
    comments: 15,
  },
];

const moodColors: Record<string, string> = {
  Hopeful: "bg-[var(--dt-secondary-light)] text-[var(--dt-secondary)]",
  Healing: "bg-[#E8F5E9] text-[#4A7C59]",
  Lonely: "bg-[var(--dt-primary-light)] text-[var(--dt-primary)]",
  Confused: "bg-[#FFF3E0] text-[#B5835A]",
};

function MoodBadge({ mood }: { mood: string }) {
  const moods = mood.split(" • ");
  return (
    <div className="flex gap-1.5 flex-wrap">
      {moods.map((m) => (
        <span
          key={m}
          className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
            moodColors[m] || "bg-[var(--dt-border-light)] text-[var(--dt-text-muted)]"
          }`}
        >
          {m}
        </span>
      ))}
    </div>
  );
}

function PostCard({
  post,
  index,
}: {
  post: (typeof samplePosts)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-6 md:p-7 shadow-dt-sm hover:shadow-dt-md hover:-translate-y-0.5 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[var(--dt-primary-light)] flex items-center justify-center text-[var(--dt-primary)] text-[13px] font-semibold">
          {post.username.charAt(0)}
        </div>
        <div>
          <span className="text-[14px] font-medium text-[var(--dt-text)]">
            u/{post.username}
          </span>
          <span className="text-[var(--dt-text-muted)] mx-2">·</span>
          <span className="text-[12px] text-[var(--dt-text-muted)]">
            {post.time}
          </span>
        </div>
      </div>

      <MoodBadge mood={post.mood} />

      <p className="text-[15px] text-[var(--dt-text)] mt-4 leading-relaxed">
        {post.content}
      </p>

      <div className="flex items-center gap-5 mt-5 pt-4 border-t border-[var(--dt-border-light)]">
        <button className="flex items-center gap-1.5 text-[13px] text-[var(--dt-text-muted)] hover:text-[var(--dt-primary)] transition-colors">
          <Heart size={15} />
          <span>{post.support} Support</span>
        </button>
        <button className="flex items-center gap-1.5 text-[13px] text-[var(--dt-text-muted)] hover:text-[var(--dt-secondary)] transition-colors">
          <Handshake size={15} />
          <span>{post.relate} Relate</span>
        </button>
        <button className="flex items-center gap-1.5 text-[13px] text-[var(--dt-text-muted)] hover:text-[#4A7C59] transition-colors">
          <Sprout size={15} />
          <span>{post.stayStrong} Stay Strong</span>
        </button>
        <span className="ml-auto flex items-center gap-1.5 text-[12px] text-[var(--dt-text-muted)]">
          <MessageCircle size={13} />
          {post.comments}
        </span>
      </div>
    </motion.div>
  );
}

export default function PreviewFeed() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section className="py-12 md:py-16 px-6 md:px-12 bg-[var(--dt-bg)]">
      <div className="max-w-[800px] mx-auto">
        <motion.div
          ref={headerRef}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-[28px] md:text-[40px] text-[var(--dt-text)]">
            You're not alone in this
          </h2>
          <p className="text-[16px] text-[var(--dt-text-secondary)] mt-3">
            Real stories from people walking the same path
          </p>
        </motion.div>

        <div className="flex flex-col gap-5 mt-8">
          {samplePosts.map((post, i) => (
            <PostCard key={post.username} post={post} index={i} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/community"
            className="inline-block px-8 py-3 rounded-full border-[1.5px] border-[var(--dt-primary)] text-[var(--dt-primary)] text-[14px] font-medium hover:bg-[var(--dt-primary)] hover:text-white transition-all duration-200"
          >
            See More Stories
          </Link>
        </div>
      </div>
    </section>
  );
}
