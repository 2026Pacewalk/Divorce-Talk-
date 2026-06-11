import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useDemoMode } from "@/hooks/useDemoMode";
import { demoJournalEntries, demoPosts, demoComments, demoSavedPosts } from "@/lib/demoData";
import Navbar from "@/sections/Navbar";
import {
  FileText, MessageCircle, Bookmark, TrendingUp,
  Award, Sprout, Heart, Handshake,
} from "lucide-react";

const tabs = [
  { id: "posts", label: "Posts", icon: FileText },
  { id: "comments", label: "Comments", icon: MessageCircle },
  { id: "saved", label: "Saved", icon: Bookmark },
  { id: "journey", label: "Healing Journey", icon: TrendingUp },
];

const badges = [
  { name: "Listener", icon: Sprout, color: "#8FBF7A" },
  { name: "Compassionate Voice", icon: Heart, color: "#C88F7A" },
  { name: "Safe Space Contributor", icon: Handshake, color: "#A7B29F" },
  { name: "7-Day Streak", icon: Award, color: "#D4A574" },
];

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { isDemoMode } = useDemoMode();
  const [activeTab, setActiveTab] = useState("posts");

  // Get demo posts for this user
  const userDemoPosts = isDemoMode
    ? demoPosts.filter((_, i) => i % 3 === 0).slice(0, 6)
    : [];

  const userDemoJournal = isDemoMode ? demoJournalEntries : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--dt-bg)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--dt-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--dt-bg)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[var(--dt-text-secondary)] mb-4">Please sign in to view your profile</p>
          <Link to="/login" className="px-6 py-2.5 rounded-full bg-[var(--dt-primary)] text-white text-[14px] font-medium hover:bg-[var(--dt-primary-hover)] transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--dt-bg)]">
      <Navbar />

      <main className="pt-[88px] px-4 md:px-8 pb-12">
        <div className="max-w-[800px] mx-auto">
          {/* Header Card */}
          <motion.div
            className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-6 md:p-10 shadow-dt-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--dt-primary-light)] to-[var(--dt-secondary-light)] flex items-center justify-center text-[28px] font-serif text-[var(--dt-primary)]">
                {user?.username?.charAt(0)?.toUpperCase()}
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="font-serif text-[28px] text-[var(--dt-text)]">
                  u/{user?.username}
                </h1>
                <p className="text-[12px] text-[var(--dt-text-muted)] mt-1">
                  Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "recently"}
                </p>
                <p className="text-[15px] text-[var(--dt-text-secondary)] mt-3 italic leading-relaxed">
                  {user?.bio || "Still writing my story..."}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: "Posts Shared", value: isDemoMode ? 24 : 0 },
              { label: "Support Given", value: isDemoMode ? 156 : 0 },
              { label: "Communities", value: isDemoMode ? 5 : 0 },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-xl p-5 text-center shadow-dt-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <p className="font-serif text-[24px] text-[var(--dt-primary)]">{stat.value}</p>
                <p className="text-[11px] text-[var(--dt-text-muted)] mt-1 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            {badges.map((badge) => (
              <span
                key={badge.name}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--dt-primary-light)] text-[var(--dt-primary)] text-[13px] font-medium"
              >
                <badge.icon size={14} style={{ color: badge.color }} />
                {badge.name}
              </span>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-8 border-b border-[var(--dt-border)]">
            <div className="flex flex-wrap sm:flex-nowrap gap-0 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 text-[13px] font-medium whitespace-nowrap transition-colors relative ${
                    activeTab === tab.id
                      ? "text-[var(--dt-primary)]"
                      : "text-[var(--dt-text-muted)] hover:text-[var(--dt-text)]"
                  }`}
                >
                  <tab.icon size={15} />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--dt-primary)]" layoutId="profile-tab" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "posts" && (
              <div className="space-y-4">
                {isDemoMode && userDemoPosts.map((post) => (
                  <div key={post.id} className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-xl p-5 shadow-dt-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[12px] text-[var(--dt-text-muted)]">{post.timeAgo}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[var(--dt-primary-light)] text-[var(--dt-primary)] text-[11px]">{post.mood}</span>
                    </div>
                    {post.title && <h4 className="font-serif text-[16px] text-[var(--dt-text)] mb-1">{post.title}</h4>}
                    <p className="text-[14px] text-[var(--dt-text-secondary)] line-clamp-2">{post.content}</p>
                    <div className="flex gap-4 mt-3 text-[12px] text-[var(--dt-text-muted)]">
                      <span>{post.supportCount} support</span>
                      <span>{post.relateCount} relate</span>
                      <span>{post.commentCount} comments</span>
                    </div>
                  </div>
                ))}
                {!isDemoMode && (
                  <div className="text-center py-16">
                    <FileText size={32} className="mx-auto text-[var(--dt-border)] mb-3" />
                    <p className="text-[var(--dt-text-muted)] text-[14px]">Your posts will appear here</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === "comments" && (
              <div className="space-y-3">
                {isDemoMode && demoComments.map((c) => (
                  <div
                    key={c.id}
                    className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-xl p-4 sm:p-5 shadow-dt-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] text-[var(--dt-text-muted)]">
                        On <span className="text-[var(--dt-text)] font-medium">u/{c.postAuthor}</span>'s post
                      </span>
                      <span className="text-[11px] text-[var(--dt-text-muted)] shrink-0">{c.timeAgo}</span>
                    </div>
                    <p className="font-serif text-[14px] text-[var(--dt-text)] mt-1.5 leading-snug">
                      "{c.postTitle}"
                    </p>
                    <p className="text-[14px] text-[var(--dt-text-secondary)] mt-3 leading-relaxed border-l-2 border-[var(--dt-primary-light)] pl-3 italic">
                      {c.content}
                    </p>
                    <div className="flex items-center gap-1.5 mt-3 text-[12px] text-[var(--dt-text-muted)]">
                      <Heart size={11} className="text-[var(--dt-primary)]" />
                      {c.supportCount} support
                    </div>
                  </div>
                ))}
                {!isDemoMode && (
                  <div className="text-center py-16">
                    <MessageCircle size={32} className="mx-auto text-[var(--dt-border)] mb-3" />
                    <p className="text-[var(--dt-text-muted)] text-[14px]">Your comments will appear here</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === "saved" && (
              <div className="space-y-3">
                {isDemoMode && demoSavedPosts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-xl p-4 sm:p-5 shadow-dt-sm hover:border-[var(--dt-primary)]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="text-[var(--dt-primary)] font-medium uppercase tracking-wider">
                        {p.category}
                      </span>
                      <span className="text-[var(--dt-text-muted)] inline-flex items-center gap-1">
                        <Bookmark size={11} className="text-[var(--dt-primary)]" />
                        {p.savedAt}
                      </span>
                    </div>
                    <h4 className="font-serif text-[16px] text-[var(--dt-text)] mt-2 leading-snug">
                      {p.title}
                    </h4>
                    <p className="text-[13px] text-[var(--dt-text-secondary)] mt-2 leading-relaxed line-clamp-3">
                      {p.excerpt}
                    </p>
                    <p className="text-[11px] text-[var(--dt-text-muted)] mt-2.5">
                      from <span className="text-[var(--dt-text)] font-medium">u/{p.author}</span>
                    </p>
                  </div>
                ))}
                {!isDemoMode && (
                  <div className="text-center py-16">
                    <Bookmark size={32} className="mx-auto text-[var(--dt-border)] mb-3" />
                    <p className="text-[var(--dt-text-muted)] text-[14px]">Posts you save will appear here</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === "journey" && (
              <div className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-8 shadow-dt-sm">
                <h3 className="font-serif text-[20px] text-[var(--dt-text)] mb-4">Your Healing Journey</h3>
                <div className="space-y-4">
                  {[
                    { milestone: "Joined DivorceTalk", date: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Recently", done: true },
                    { milestone: "First post shared", date: isDemoMode ? "May 10, 2025" : "Coming soon", done: isDemoMode },
                    { milestone: "Received 10 support reactions", date: isDemoMode ? "May 12, 2025" : "Coming soon", done: isDemoMode },
                    { milestone: "Started journaling", date: isDemoMode ? "May 15, 2025" : "Coming soon", done: isDemoMode },
                    { milestone: "7-day check-in streak", date: isDemoMode ? "May 22, 2025" : "Coming soon", done: isDemoMode },
                    { milestone: "Requested a listener", date: isDemoMode ? "May 24, 2025" : "Coming soon", done: isDemoMode },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-4 p-4 rounded-xl ${item.done ? "bg-[var(--dt-primary-light)]/50" : "bg-[var(--dt-bg)]"}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? "bg-[var(--dt-primary)] text-white" : "bg-[var(--dt-border)] text-[var(--dt-text-muted)]"}`}>
                        {item.done ? "✓" : i + 1}
                      </div>
                      <div>
                        <p className={`text-[14px] font-medium ${item.done ? "text-[var(--dt-text)]" : "text-[var(--dt-text-muted)]"}`}>{item.milestone}</p>
                        <p className="text-[11px] text-[var(--dt-text-muted)]">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Journal entries in journey tab */}
                {isDemoMode && userDemoJournal.length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-[14px] font-medium text-[var(--dt-text)] mb-4">Recent Journal Entries</h4>
                    <div className="space-y-3">
                      {userDemoJournal.slice(0, 5).map((entry) => (
                        <div key={entry.id} className="p-4 rounded-xl bg-[var(--dt-bg)] border border-[var(--dt-border-light)]">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[11px] text-[var(--dt-text-muted)]">{entry.dateLabel}</span>
                            <span className="px-2 py-0.5 rounded-full bg-[var(--dt-primary-light)] text-[var(--dt-primary)] text-[10px]">{entry.mood}</span>
                          </div>
                          {entry.prompt && <p className="text-[11px] text-[var(--dt-primary)] italic mb-1">{entry.prompt}</p>}
                          <p className="text-[13px] text-[var(--dt-text-secondary)] line-clamp-2">{entry.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
