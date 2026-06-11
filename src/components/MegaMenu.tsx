import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  MessageSquareHeart,
  Headphones,
  Users,
  Sparkles,
  Heart,
  Hand,
  Repeat2,
  HeartCrack,
  Sprout,
  BookOpen,
  Activity,
  Bookmark,
  Quote,
  HandHeart,
  ShieldCheck,
  LifeBuoy,
  Phone,
  Flag,
  ArrowRight,
  Search,
} from "lucide-react";

type MegaItem = {
  label: string;
  to: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

type Section = {
  heading: string;
  badge?: string;
  items: MegaItem[];
};

const sections: Section[] = [
  {
    heading: "Start here",
    badge: "Calm onramps",
    items: [
      { label: "I need to talk", to: "/community?compose=1", desc: "Write it out. Anonymous and safe.", icon: MessageSquareHeart },
      { label: "I just want to listen", to: "/rooms", desc: "Slip into a gentle room. No pressure.", icon: Headphones },
      { label: "Explore community", to: "/community", desc: "Read what others are feeling today.", icon: Users },
      { label: "Relationship check-in", to: "/check-in", desc: "A 2-minute gentle self-reflection.", icon: Sparkles },
    ],
  },
  {
    heading: "Community",
    badge: "Heart Out",
    items: [
      { label: "Heart Out feed", to: "/community", desc: "Real stories, in real time.", icon: Heart },
      { label: "Listening rooms", to: "/rooms", desc: "Group spaces held by listeners.", icon: Hand },
      { label: "Silent marriages", to: "/community?cat=silent-marriages", desc: "When the house is loud with silence.", icon: HeartCrack },
      { label: "Starting over", to: "/community?cat=starting-over", desc: "The first steps after.", icon: Sprout },
      { label: "Co-parenting", to: "/community?cat=co-parenting", desc: "Through the kids, together.", icon: Repeat2 },
      { label: "Betrayal recovery", to: "/community?cat=betrayal-recovery", desc: "Rebuilding trust with yourself.", icon: HeartCrack },
    ],
  },
  {
    heading: "Healing tools",
    badge: "Just for you",
    items: [
      { label: "Private journal", to: "/journal", desc: "A locked diary only you can read.", icon: BookOpen },
      { label: "Mood tracker", to: "/journal?tab=mood", desc: "See the shape of your week.", icon: Activity },
      { label: "Saved stories", to: "/stories?saved=1", desc: "The ones that held you up.", icon: Bookmark },
      { label: "Daily prompts", to: "/journal?tab=prompts", desc: "One gentle question a day.", icon: Quote },
      { label: "Listener requests", to: "/hear-me", desc: "Ask for someone to hear you.", icon: HandHeart },
    ],
  },
  {
    heading: "Safety",
    badge: "Always with you",
    items: [
      { label: "Community guidelines", to: "/guidelines", desc: "How we keep this place soft.", icon: ShieldCheck },
      { label: "Safety resources", to: "/safety", desc: "Who's behind the curtain, and how.", icon: LifeBuoy },
      { label: "Crisis support", to: "/emergency", desc: "If you need help right now.", icon: Phone },
      { label: "Report content", to: "/safety#report", desc: "Tell us what doesn't belong.", icon: Flag },
    ],
  },
];

type Props = { onItemClick?: () => void; onOpenSearch?: () => void };

export default function MegaMenu({ onItemClick, onOpenSearch }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="w-[min(96vw,1080px)] rounded-3xl overflow-hidden border border-[var(--dt-border-light)] bg-[var(--dt-card)] shadow-2xl ring-1 ring-[var(--dt-text)]/5"
    >
      {onOpenSearch && (
        <div className="px-5 pt-4 pb-3 border-b border-[var(--dt-border-light)] bg-[var(--dt-card)]">
          <button
            type="button"
            onClick={() => {
              onOpenSearch();
              onItemClick?.();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full bg-[var(--dt-bg)] border border-[var(--dt-border-light)] text-left hover:border-[var(--dt-primary)]/50 hover:bg-[var(--dt-card)] transition-all group"
          >
            <Search size={15} className="text-[var(--dt-text-muted)] group-hover:text-[var(--dt-primary)] transition-colors" />
            <span className="flex-1 text-[13px] text-[var(--dt-text-muted)]">
              Search pages, stories, rooms…
            </span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--dt-card)] border border-[var(--dt-border-light)] text-[var(--dt-text-muted)]">
              ⌘K
            </kbd>
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--dt-border-light)]/60">
        {sections.map((section) => (
          <div
            key={section.heading}
            className="bg-[var(--dt-card)] p-5 flex flex-col"
          >
            <div className="mb-3">
              <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[var(--dt-text-muted)]">
                {section.badge}
              </p>
              <p className="font-serif text-[17px] text-[var(--dt-text)] mt-0.5">
                {section.heading}
              </p>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              {section.items.map(({ label, to, desc, icon: Icon }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={onItemClick}
                  className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-[var(--dt-bg)]/70 transition-colors"
                >
                  <span className="grid place-items-center shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--dt-primary-light)]/60 to-[var(--dt-secondary-light)]/60 text-[var(--dt-primary)] group-hover/item:scale-105 transition-transform">
                    <Icon size={15} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-center gap-1 text-[13px] font-semibold text-[var(--dt-text)] group-hover/item:text-[var(--dt-primary)] transition-colors">
                      {label}
                      <ArrowRight
                        size={11}
                        className="opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all"
                      />
                    </span>
                    <span className="block mt-0.5 text-[11.5px] leading-snug text-[var(--dt-text-secondary)]">
                      {desc}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 px-5 py-3 bg-[var(--dt-bg)] border-t border-[var(--dt-border-light)]">
        <p className="text-[12px] text-[var(--dt-text-secondary)]">
          You don't have to figure out where to start.
          <span className="ml-1 text-[var(--dt-text)] font-medium">We'll meet you in the middle.</span>
        </p>
        <Link
          to="/login?tab=join"
          onClick={onItemClick}
          className="text-[12px] font-medium px-4 py-2 rounded-full bg-[var(--dt-primary)] text-white hover:bg-[var(--dt-primary-hover)] transition-colors shadow-dt-sm hover:shadow-dt-glow"
        >
          Join anonymously
        </Link>
      </div>
    </motion.div>
  );
}
