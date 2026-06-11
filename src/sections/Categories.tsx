import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router";
import {
  GitBranch,
  DoorOpen,
  Users,
  Shield,
  Sunrise,
  CloudMoon,
  Heart,
  Flower2,
  Sprout,
  Moon,
} from "lucide-react";

const categories = [
  { slug: "divorce", name: "Divorce", microcopy: "Navigating the end", icon: GitBranch, color: "#C88F7A" },
  { slug: "separation", name: "Separation", microcopy: "Space to breathe", icon: DoorOpen, color: "#A7B29F" },
  { slug: "coparenting", name: "Co-parenting", microcopy: "Putting children first", icon: Users, color: "#8FA3BF" },
  { slug: "emotional-abuse", name: "Emotional Abuse", microcopy: "You deserve better", icon: Shield, color: "#BF8F9E" },
  { slug: "starting-over", name: "Starting Over", microcopy: "New beginnings", icon: Sunrise, color: "#D4A574" },
  { slug: "loneliness", name: "Loneliness", microcopy: "Finding connection", icon: CloudMoon, color: "#9B8FBF" },
  { slug: "mens-circle", name: "Men's Support", microcopy: "Strength in vulnerability", icon: Heart, color: "#7A9BBF" },
  { slug: "womens-circle", name: "Women's Support", microcopy: "Sisterhood in healing", icon: Flower2, color: "#BF7A8F" },
  { slug: "healing-journey", name: "Healing Journey", microcopy: "Growing through pain", icon: Sprout, color: "#8FBF7A" },
];

function CategoryCard({
  cat,
  index,
}: {
  cat: (typeof categories)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const Icon = cat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to={`/community?category=${cat.slug}`}
        className="block bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-7 text-center shadow-dt-sm hover:shadow-dt-md hover:-translate-y-1 transition-all duration-300 group"
      >
        <div
          className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${cat.color}18` }}
        >
          <Icon size={22} style={{ color: cat.color }} />
        </div>
        <h4 className="font-sans text-[16px] font-medium text-[var(--dt-text)] mt-4">
          {cat.name}
        </h4>
        <p className="text-[12px] text-[var(--dt-text-muted)] mt-1.5">
          {cat.microcopy}
        </p>
      </Link>
    </motion.div>
  );
}

export default function Categories() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section className="py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          ref={headerRef}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-[28px] md:text-[40px] text-[var(--dt-text)]">
            Find Your Community
          </h2>
          <p className="text-[16px] text-[var(--dt-text-secondary)] mt-3">
            Topics that understand what you're going through
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-5 mt-9">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.slug} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
