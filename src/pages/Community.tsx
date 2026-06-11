import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import { useDemoMode } from "@/hooks/useDemoMode";
import { demoPosts } from "@/lib/demoData";
import Navbar from "@/sections/Navbar";
import {
  Heart, Handshake, Sprout, MessageCircle,
  Plus, Users, TrendingUp, Quote, AlertTriangle,
  X, Send, Search,
} from "lucide-react";

const moodOptions = ["numb", "anxious", "angry", "lonely", "hopeful", "exhausted", "healing"];

// Fallback category list used when the server query hasn't returned yet,
// when the DB is unavailable, or in demo mode. Mirrors db/seed.ts.
const fallbackCategories: { slug: string; name: string }[] = [
  { slug: "toxic-marriage", name: "Toxic Marriage" },
  { slug: "emotional-neglect", name: "Emotional Neglect" },
  { slug: "separation", name: "Separation" },
  { slug: "infidelity", name: "Infidelity" },
  { slug: "in-laws", name: "In-Laws" },
  { slug: "loneliness", name: "Loneliness" },
  { slug: "staying-for-kids", name: "Staying for Kids" },
  { slug: "confusion", name: "Confusion" },
  { slug: "recovery", name: "Recovery" },
];

const moodColors: Record<string, string> = {
  hopeful: "bg-[var(--dt-secondary-light)] text-[var(--dt-secondary)]",
  healing: "bg-[#E8F5E9] text-[#4A7C59]",
  lonely: "bg-[var(--dt-primary-light)] text-[var(--dt-primary)]",
  anxious: "bg-[#FFF3E0] text-[#B5835A]",
  numb: "bg-[#ECEFF1] text-[#78909C]",
  angry: "bg-[#FFEBEE] text-[#B57171]",
  exhausted: "bg-[#F3E5F5] text-[#9E7CB1]",
};

function MoodBadge({ mood }: { mood: string | null }) {
  if (!mood) return null;
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${moodColors[mood] || "bg-[var(--dt-border-light)] text-[var(--dt-text-muted)]"}`}>
      {mood.charAt(0).toUpperCase() + mood.slice(1)}
    </span>
  );
}

function PostCard({ post, onReact }: { post: any; onReact?: (type: string) => void }) {
  const [showComments, setShowComments] = useState(false);
  const { isDemoMode } = useDemoMode();
  const utils = trpc.useUtils();
  const reactMutation = trpc.post.react.useMutation({
    onSuccess: () => { utils.post.list.invalidate(); },
  });

  const handleReact = (type: string) => {
    if (isDemoMode) {
      onReact?.(type);
      return;
    }
    reactMutation.mutate({ postId: post.id, type: type as any });
  };

  return (
    <motion.div
      layout
      className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-6 shadow-dt-sm hover:shadow-dt-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[var(--dt-primary-light)] flex items-center justify-center text-[var(--dt-primary)] text-[13px] font-semibold">
            {post.author?.username?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-medium text-[var(--dt-text)]">
              u/{post.author?.username || "Anonymous"}
            </span>
            <span className="text-[12px] text-[var(--dt-text-muted)]">
              {post.timeAgo || new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <MoodBadge mood={post.mood} />
      </div>

      {post.title && (
        <h3 className="font-serif text-[18px] text-[var(--dt-text)] mt-4">
          {post.title}
        </h3>
      )}
      <p className="text-[15px] text-[var(--dt-text)] mt-3 leading-relaxed">
        {post.content}
      </p>

      <div className="flex items-center gap-4 mt-5 pt-4 border-t border-[var(--dt-border-light)]">
        <button
          onClick={() => handleReact("support")}
          className={`flex items-center gap-1.5 text-[13px] transition-colors ${
            post.userReaction === "support"
              ? "text-[var(--dt-primary)] font-medium"
              : "text-[var(--dt-text-muted)] hover:text-[var(--dt-primary)]"
          }`}
        >
          <Heart size={15} className={post.userReaction === "support" ? "fill-current" : ""} />
          <span>{post.reactions?.support || post.supportCount || 0} Support</span>
        </button>
        <button
          onClick={() => handleReact("relate")}
          className={`flex items-center gap-1.5 text-[13px] transition-colors ${
            post.userReaction === "relate"
              ? "text-[var(--dt-secondary)] font-medium"
              : "text-[var(--dt-text-muted)] hover:text-[var(--dt-secondary)]"
          }`}
        >
          <Handshake size={15} className={post.userReaction === "relate" ? "fill-current" : ""} />
          <span>{post.reactions?.relate || post.relateCount || 0} Relate</span>
        </button>
        <button
          onClick={() => handleReact("stayStrong")}
          className={`flex items-center gap-1.5 text-[13px] transition-colors ${
            post.userReaction === "stayStrong"
              ? "text-[#4A7C59] font-medium"
              : "text-[var(--dt-text-muted)] hover:text-[#4A7C59]"
          }`}
        >
          <Sprout size={15} />
          <span>{post.reactions?.stayStrong || post.stayStrongCount || 0} Stay Strong</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="ml-auto flex items-center gap-1.5 text-[12px] text-[var(--dt-text-muted)] hover:text-[var(--dt-primary)] transition-colors"
        >
          <MessageCircle size={13} />
          {post.commentCount || 0}
        </button>
      </div>

      {/* Comments */}
      <AnimatePresence>
        {showComments && post.comments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-[var(--dt-border-light)] space-y-3">
              {post.comments.map((c: any) => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-[var(--dt-secondary-light)] flex items-center justify-center text-[10px] text-[var(--dt-secondary)] font-semibold flex-shrink-0">
                    {c.username?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <span className="text-[12px] font-medium text-[var(--dt-text)]">u/{c.username}</span>
                    <p className="text-[13px] text-[var(--dt-text-secondary)] mt-0.5">{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CreatePostModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<string | undefined>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const { data: serverCategories } = trpc.category.list.useQuery();
  // Use whatever the server returns; otherwise fall back to the seed list so
  // the dropdown is never empty (demo mode, DB down, first paint).
  const categories =
    serverCategories && serverCategories.length > 0
      ? serverCategories
      : fallbackCategories;
  const [category, setCategory] = useState(categories[0]?.slug ?? "toxic-marriage");

  const createPost = trpc.post.create.useMutation({
    onSuccess: () => {
      utils.post.list.invalidate();
      onClose();
    },
  });

  const handleSubmit = () => {
    if (!content.trim()) return;
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    createPost.mutate({
      title: title || undefined,
      content,
      category,
      mood: mood || undefined,
      isAnonymous: true,
    });
  };

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[var(--dt-text)]/30 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative bg-[var(--dt-elevated)] rounded-2xl shadow-dt-xl w-full max-w-[560px] max-h-[85vh] overflow-y-auto"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between p-6 border-b border-[var(--dt-border-light)]">
          <h3 className="font-serif text-[20px] text-[var(--dt-text)]">Share Your Thoughts</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--dt-bg)] transition-colors">
            <X size={20} className="text-[var(--dt-text-muted)]" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <input
            type="text"
            placeholder="Optional title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[var(--dt-card)] border border-[var(--dt-border)] text-[var(--dt-text)] placeholder:text-[var(--dt-text-muted)] text-[15px] focus:outline-none focus:border-[var(--dt-primary)] focus:ring-1 focus:ring-[var(--dt-primary)] transition-all"
          />
          <textarea
            placeholder="What would you like to share?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full px-4 py-3 rounded-xl bg-[var(--dt-card)] border border-[var(--dt-border)] text-[var(--dt-text)] placeholder:text-[var(--dt-text-muted)] text-[15px] resize-none focus:outline-none focus:border-[var(--dt-primary)] focus:ring-1 focus:ring-[var(--dt-primary)] transition-all"
          />

          <div>
            <label className="text-[12px] font-medium text-[var(--dt-text-muted)] uppercase tracking-wider mb-2 block">
              How are you feeling?
            </label>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(mood === m ? undefined : m)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                    mood === m
                      ? "bg-[var(--dt-primary)] text-white"
                      : "bg-[var(--dt-card)] text-[var(--dt-text-secondary)] border border-[var(--dt-border)] hover:border-[var(--dt-primary)]"
                  }`}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[12px] font-medium text-[var(--dt-text-muted)] uppercase tracking-wider mb-2 block">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--dt-card)] border border-[var(--dt-border)] text-[var(--dt-text)] text-[14px] focus:outline-none focus:border-[var(--dt-primary)]"
            >
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[12px] text-[var(--dt-text-muted)] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--dt-primary)]" />
              Posting anonymously
            </span>
            <button
              onClick={handleSubmit}
              disabled={!content.trim() || createPost.isPending}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--dt-primary)] text-white text-[14px] font-medium hover:bg-[var(--dt-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send size={14} />
              {createPost.isPending ? "Sharing..." : "Share"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function LeftSidebar() {
  const { data: categories } = trpc.category.list.useQuery();
  const { data: affirmation } = trpc.affirmation.daily.useQuery();

  return (
    <div className="space-y-5">
      <div className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-5 shadow-dt-sm sticky top-[88px]">
        <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--dt-text-muted)] mb-4">
          Communities
        </h4>
        <div className="space-y-1">
          {categories?.map((cat) => (
            <Link
              key={cat.slug}
              to={`/community?category=${cat.slug}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] text-[var(--dt-text-secondary)] hover:bg-[var(--dt-bg)] hover:text-[var(--dt-text)] transition-colors"
            >
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color || "var(--dt-primary)" }} />
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {affirmation && (
        <div className="bg-gradient-to-br from-[var(--dt-primary-light)] to-[var(--dt-secondary-light)] rounded-2xl p-5 sticky top-[400px]">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--dt-primary)] mb-2">
            Today's Affirmation
          </p>
          <p className="text-[14px] font-serif italic text-[var(--dt-text)] leading-relaxed">
            &ldquo;{affirmation.text}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}

function RightSidebar() {
  return (
    <div className="space-y-5">
      <div className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-5 shadow-dt-sm sticky top-[88px]">
        <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--dt-text-muted)] mb-4">
          Community Pulse
        </h4>
        <div className="space-y-3">
          {[
            { icon: Users, label: "234 Online", color: "text-[var(--dt-primary)]" },
            { icon: Heart, label: "12 Volunteers", color: "text-[var(--dt-secondary)]" },
            { icon: Handshake, label: "48 Helping now", color: "text-[#4A7C59]" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <stat.icon size={16} className={stat.color} />
              <span className="text-[14px] text-[var(--dt-text-secondary)]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-[var(--dt-secondary-light)] to-[var(--dt-primary-light)] rounded-2xl p-6 shadow-dt-sm">
        <Quote size={24} className="text-[var(--dt-primary)]/30 mb-3" />
        <p className="text-[14px] font-serif italic text-[var(--dt-text)] leading-relaxed">
          &ldquo;The darkest night produces the brightest stars. Your healing is coming.&rdquo;
        </p>
        <p className="text-[11px] text-[var(--dt-text-muted)] mt-3">&mdash; DivorceTalk Community</p>
      </div>

      <div className="bg-[rgba(220,90,90,0.06)] border border-[rgba(220,90,90,0.1)] rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={16} className="text-[#C85A5A]" />
          <h4 className="text-[13px] font-medium text-[#C85A5A]">Need Immediate Help?</h4>
        </div>
        <p className="text-[12px] text-[var(--dt-text-muted)] mb-3">
          If you&apos;re in crisis, please reach out to professional services.
        </p>
        <Link to="/emergency" className="text-[12px] font-medium text-[#C85A5A] hover:underline">
          View Emergency Resources &rarr;
        </Link>
      </div>
    </div>
  );
}

export default function Community() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || undefined;
  const [showCreate, setShowCreate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useAuth();
  const { isDemoMode } = useDemoMode();

  // Server data
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    trpc.post.list.useInfiniteQuery(
      { limit: 10, category: category || undefined },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  const serverPosts = data?.pages.flatMap((p) => p.items) || [];

  // Demo data
  const displayPosts = isDemoMode
    ? demoPosts
        .filter((p) => !category || p.category === category)
        .filter((p) => !searchQuery || p.content.toLowerCase().includes(searchQuery.toLowerCase()) || p.title?.toLowerCase().includes(searchQuery.toLowerCase()))
    : serverPosts;

  // Infinite scroll observer
  const loadMoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage && !isDemoMode) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, isDemoMode]);

  return (
    <div className="min-h-screen bg-[var(--dt-bg)]">
      <Navbar />

      <main className="pt-[88px] px-4 md:px-8 pb-8">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr_280px] gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block">
            <LeftSidebar />
          </div>

          {/* Center Feed */}
          <div className="min-w-0">
            {/* Search bar */}
            <div className="mb-4">
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dt-text-muted)]" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--dt-card)] border border-[var(--dt-border-light)] text-[var(--dt-text)] placeholder:text-[var(--dt-text-muted)] text-[14px] focus:outline-none focus:border-[var(--dt-primary)] transition-all"
                />
              </div>
            </div>

            {/* Create Post Trigger */}
            <div
              onClick={() => setShowCreate(true)}
              className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-4 shadow-dt-sm cursor-pointer hover:shadow-dt-md transition-all mb-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--dt-primary-light)] flex items-center justify-center text-[var(--dt-primary)] text-sm font-semibold flex-shrink-0">
                {isAuthenticated ? "Y" : "?"}
              </div>
              <span className="text-[14px] text-[var(--dt-text-muted)] flex-1">
                What would you like to share?
              </span>
              <button className="px-4 py-2 rounded-full bg-[var(--dt-primary)] text-white text-[13px] font-medium hover:bg-[var(--dt-primary-hover)] transition-colors flex-shrink-0">
                Post
              </button>
            </div>

            {/* Posts */}
            <div className="space-y-4">
              <AnimatePresence>
                {displayPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </AnimatePresence>
            </div>

            {isLoading && !isDemoMode && (
              <div className="space-y-4 mt-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-[var(--dt-card)] rounded-2xl p-6 animate-shimmer h-[180px]" />
                ))}
              </div>
            )}

            {!isLoading && displayPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[var(--dt-text-muted)] text-[15px]">
                  No posts yet. Be the first to share your story.
                </p>
              </div>
            )}

            <div ref={loadMoreRef} className="h-10" />

            {isFetchingNextPage && (
              <div className="text-center py-4">
                <div className="inline-block w-5 h-5 border-2 border-[var(--dt-primary)] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block">
            <RightSidebar />
          </div>
        </div>
      </main>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreate && <CreatePostModal onClose={() => setShowCreate(false)} />}
      </AnimatePresence>

      {/* Mobile FAB — only show for unauthenticated users (the BottomNav
          provides the Create button for authenticated mobile users). */}
      {!isAuthenticated && (
        <Link
          to="/login?tab=join"
          aria-label="Join to share your story"
          className="fixed bottom-6 right-4 lg:hidden grid place-items-center w-14 h-14 rounded-full bg-[var(--dt-primary)] text-white shadow-2xl ring-4 ring-[var(--dt-card)] hover:bg-[var(--dt-primary-hover)] active:scale-95 transition-all z-[60]"
        >
          <Plus size={22} strokeWidth={2.5} />
        </Link>
      )}
    </div>
  );
}


