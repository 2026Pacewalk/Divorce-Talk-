import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import { BookOpen, ArrowRight, Search } from "lucide-react";

const categories = [
  { slug: "staying-for-children", name: "Staying for Children", count: 24 },
  { slug: "emotionally-absent", name: "Emotionally Absent Spouse", count: 18 },
  { slug: "silent-marriage", name: "Silent Marriage", count: 15 },
  { slug: "communication-breakdown", name: "Communication Breakdown", count: 22 },
  { slug: "emotional-loneliness", name: "Emotional Loneliness", count: 31 },
  { slug: "healing-journeys", name: "Healing Journeys", count: 12 },
  { slug: "starting-over", name: "Starting Over", count: 19 },
  { slug: "co-parenting", name: "Co-parenting After Separation", count: 14 },
];

const featuredStories = [
  {
    title: "I stayed for ten years because I thought it was best for my kids.",
    excerpt: "My therapist asked me one question: 'What are you teaching your children about love?' That broke me open.",
    category: "Staying for Children",
    readTime: "6 min read",
    author: "QuietRiver",
  },
  {
    title: "My husband was in the room but never really there.",
    excerpt: "Emotional absence is harder to explain than physical absence. How do you describe the loneliness of someone sitting right beside you?",
    category: "Emotionally Absent Spouse",
    readTime: "5 min read",
    author: "HealingSoul",
  },
  {
    title: "We stopped talking about anything that mattered.",
    excerpt: "First it was the big things. Then the small things. Eventually we were just two people sharing a house, sharing nothing.",
    category: "Silent Marriage",
    readTime: "7 min read",
    author: "StillBreathing",
  },
  {
    title: "I rebuilt my life at 42. It was terrifying and beautiful.",
    excerpt: "The first year was survival. The second year was learning who I was. The third year, I started to feel like myself again.",
    category: "Healing Journeys",
    readTime: "8 min read",
    author: "BetterDaysAhead",
  },
  {
    title: "Emotional loneliness is a strange kind of pain.",
    excerpt: "You can be surrounded by people and feel utterly alone. You can be in a marriage and feel like you're living a solo life.",
    category: "Emotional Loneliness",
    readTime: "4 min read",
    author: "SilentBloom",
  },
  {
    title: "Learning to co-parent when you still love each other but can't be together.",
    excerpt: "The hardest part wasn't the separation. It was learning to be a team for our daughter when we couldn't be a team for each other.",
    category: "Co-parenting After Separation",
    readTime: "6 min read",
    author: "RebuildingHeart",
  },
];

export default function Stories() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = featuredStories.filter((s) => {
    const matchesCategory = !activeCategory || s.category === categories.find(c => c.slug === activeCategory)?.name;
    const matchesSearch = !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[var(--dt-bg)]">
      <Navbar />
      <main className="pt-[88px] px-4 sm:px-6 md:px-12 py-8 sm:py-12">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-10">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[var(--dt-primary-light)] flex items-center justify-center mb-4">
              <BookOpen size={24} className="text-[var(--dt-primary)]" />
            </div>
            <h1 className="font-serif text-[32px] md:text-[40px] text-[var(--dt-text)]">
              Stories & Resources
            </h1>
            <p className="text-[16px] text-[var(--dt-text-secondary)] mt-3 max-w-[500px] mx-auto">
              Real stories from real people. You're not the only one feeling this.
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-[500px] mx-auto mb-10">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dt-text-muted)]" />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-[var(--dt-card)] border border-[var(--dt-border)] text-[var(--dt-text)] placeholder:text-[var(--dt-text-muted)] text-[14px] focus:outline-none focus:border-[var(--dt-primary)] transition-all"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                !activeCategory
                  ? "bg-[var(--dt-primary)] text-white"
                  : "bg-[var(--dt-card)] text-[var(--dt-text-secondary)] border border-[var(--dt-border)] hover:border-[var(--dt-primary)]"
              }`}
            >
              All Stories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(activeCategory === cat.slug ? null : cat.slug)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                  activeCategory === cat.slug
                    ? "bg-[var(--dt-primary)] text-white"
                    : "bg-[var(--dt-card)] text-[var(--dt-text-secondary)] border border-[var(--dt-border)] hover:border-[var(--dt-primary)]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((story, i) => (
              <motion.article
                key={story.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-6 shadow-dt-sm hover:shadow-dt-md hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <span className="text-[11px] font-medium text-[var(--dt-primary)] uppercase tracking-wider">
                  {story.category}
                </span>
                <h3 className="font-serif text-[18px] text-[var(--dt-text)] mt-2 leading-snug">
                  {story.title}
                </h3>
                <p className="text-[14px] text-[var(--dt-text-secondary)] mt-3 leading-relaxed">
                  {story.excerpt}
                </p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--dt-border-light)]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[var(--dt-primary-light)] flex items-center justify-center text-[10px] text-[var(--dt-primary)] font-semibold">
                      {story.author.charAt(0)}
                    </div>
                    <span className="text-[12px] text-[var(--dt-text-muted)]">u/{story.author}</span>
                  </div>
                  <span className="text-[11px] text-[var(--dt-text-muted)]">{story.readTime}</span>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="font-serif text-[20px] text-[var(--dt-text)]">No stories matched that.</p>
              <p className="text-[13px] text-[var(--dt-text-muted)] mt-2">Try a softer keyword — or clear the filter to see everything.</p>
              {(activeCategory || searchQuery) && (
                <button
                  onClick={() => { setActiveCategory(null); setSearchQuery(""); }}
                  className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-medium px-4 py-2 rounded-full bg-[var(--dt-primary)] text-white hover:bg-[var(--dt-primary-hover)] transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
