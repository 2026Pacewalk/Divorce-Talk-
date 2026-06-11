import { getDb } from "../api/queries/connection";
import { users, categories, posts, comments, affirmations, rooms } from "./schema";
import bcrypt from "bcryptjs";

async function seed() {
  const db = getDb();
  console.log("🌱 Starting seed...");

  // Seed categories
  console.log("📂 Seeding categories...");
  const categoryData = [
    { slug: "toxic-marriage", name: "Toxic Marriage", description: "When love becomes harmful", icon: "Flame", color: "#C88F7A" },
    { slug: "emotional-neglect", name: "Emotional Neglect", description: "The silence that hurts", icon: "Moon", color: "#9B8FBF" },
    { slug: "separation", name: "Separation", description: "Space to breathe and heal", icon: "DoorOpen", color: "#A7B29F" },
    { slug: "infidelity", name: "Infidelity", description: "Rebuilding after betrayal", icon: "HeartCrack", color: "#BF8F9E" },
    { slug: "in-laws", name: "In-Laws", description: "Family pressure and boundaries", icon: "Users", color: "#BFB38F" },
    { slug: "loneliness", name: "Loneliness", description: "Finding connection", icon: "CloudMoon", color: "#8FA3BF" },
    { slug: "staying-for-kids", name: "Staying for Kids", description: "The hardest decisions", icon: "Baby", color: "#7A9BBF" },
    { slug: "confusion", name: "Confusion", description: "When nothing makes sense", icon: "HelpCircle", color: "#B5835A" },
    { slug: "recovery", name: "Recovery", description: "Growing through pain", icon: "Sprout", color: "#8FBF7A" },
  ];

  for (const cat of categoryData) {
    try {
      await db.insert(categories).values(cat).onDuplicateKeyUpdate({
        set: { name: cat.name, description: cat.description },
      });
    } catch (e) {
      // ignore duplicates
    }
  }

  // Seed rooms
  console.log("🏠 Seeding listening rooms...");
  const roomData = [
    { slug: "relationship-burnout", name: "Relationship Burnout", description: "When love feels like exhaustion. Share and find support.", icon: "Flame", color: "#C88F7A", memberCount: 42 },
    { slug: "separation-anxiety", name: "Separation Anxiety", description: "The fear of what comes next. You're not alone in this.", icon: "Wind", color: "#A7B29F", memberCount: 38 },
    { slug: "betrayal", name: "Betrayal", description: "Healing from broken trust. One day at a time.", icon: "HeartCrack", color: "#BF8F9E", memberCount: 56 },
    { slug: "toxic-family", name: "Toxic Family Pressure", description: "When family becomes the source of pain. Set boundaries here.", icon: "Users", color: "#BFB38F", memberCount: 29 },
    { slug: "silent-marriages", name: "Silent Marriages", description: "When conversation dies but the relationship continues.", icon: "Moon", color: "#9B8FBF", memberCount: 47 },
    { slug: "co-parenting", name: "Co-Parenting Struggles", description: "Navigating parenting after separation with compassion.", icon: "Baby", color: "#8FA3BF", memberCount: 33 },
  ];

  for (const room of roomData) {
    try {
      await db.insert(rooms).values(room).onDuplicateKeyUpdate({
        set: { name: room.name, description: room.description },
      });
    } catch (e) {
      // ignore duplicates
    }
  }

  // Seed sample users
  console.log("👤 Seeding sample users...");
  const passwordHash = await bcrypt.hash("Password123!", 12);
  const demoUserHash = await bcrypt.hash("Demo@123", 12);
  const demoAdminHash = await bcrypt.hash("Admin@123", 12);

  // The 4 named demo accounts (the credentials shown on the Login page).
  // Local-auth uses `username` as the primary identifier — the email is the
  // canonical address but users sign in by username. We store both.
  const namedDemoUsers = [
    {
      username: "demo",
      email: "demo@divorcetalk.in",
      passwordHash: demoUserHash,
      role: "user" as const,
      bio: "Just here to find my footing.",
    },
    {
      username: "listener",
      email: "listener@divorcetalk.in",
      passwordHash: demoUserHash,
      role: "moderator" as const,
      bio: "Trained to hold space. No advice, just presence.",
    },
    {
      username: "moderator",
      email: "moderator@divorcetalk.in",
      passwordHash: demoUserHash,
      role: "moderator" as const,
      bio: "Keeping this place soft for everyone.",
    },
    {
      username: "admin",
      email: "admin@divorcetalk.in",
      passwordHash: demoAdminHash,
      role: "admin" as const,
      bio: "Platform guardian. Quietly keeping the lights on.",
    },
  ];

  for (const u of namedDemoUsers) {
    try {
      await db.insert(users).values(u);
    } catch (e) {
      // ignore duplicates
    }
  }

  const sampleUsers = [
    { username: "StillBreathing", passwordHash, bio: "One breath at a time." },
    { username: "RebuildingSlowly", passwordHash, bio: "Trying to find my footing." },
    { username: "QuietWarrior", passwordHash, bio: "Fighting battles no one sees." },
    { username: "HealingSoul", passwordHash, bio: "In the process of becoming whole again." },
    { username: "BetterDaysAhead", passwordHash, bio: "Believing in tomorrow." },
    { username: "SilentBloom", passwordHash, bio: "Growing in the quiet places." },
    { username: "RebuildingHeart", passwordHash, bio: "Piecing myself back together." },
    { username: "QuietRiver", passwordHash, bio: "Finding my flow again." },
    { username: "HopefulDawn", passwordHash, bio: "Every sunrise is a new chance." },
    { username: "GentleStrength", passwordHash, bio: "Soft but unbreakable." },
  ];

  const userIds: number[] = [];
  for (const u of sampleUsers) {
    try {
      const result = await db.insert(users).values(u);
      userIds.push(Number(result[0].insertId));
    } catch (e) {
      // ignore duplicates
    }
  }

  // Seed sample posts
  console.log("📝 Seeding sample posts...");
  const samplePosts = [
    {
      userId: userIds[0] || 1,
      title: null,
      content: "Today I removed our wedding photos from the wall. I didn't cry this time. Small steps, right?",
      category: "separation",
      mood: "hopeful",
      supportCount: 42,
      relateCount: 18,
      stayStrongCount: 12,
      commentCount: 8,
    },
    {
      userId: userIds[1] || 2,
      title: "A peaceful night",
      content: "I finally slept peacefully after weeks of tossing and turning. Small wins matter more than people realize.",
      category: "recovery",
      mood: "healing",
      supportCount: 67,
      relateCount: 31,
      stayStrongCount: 24,
      commentCount: 12,
    },
    {
      userId: userIds[2] || 3,
      title: "Is this normal?",
      content: "Some days I miss the idea of us more than the reality. Is that normal? It feels like I'm grieving a version of my life that never really existed.",
      category: "confusion",
      mood: "lonely",
      supportCount: 89,
      relateCount: 56,
      stayStrongCount: 34,
      commentCount: 15,
    },
    {
      userId: userIds[3] || 4,
      title: null,
      content: "My kids asked why daddy doesn't live here anymore. I told them he loves them very much, just in a different house now. They seemed to accept it. I cried in the bathroom after.",
      category: "staying-for-kids",
      mood: "exhausted",
      supportCount: 124,
      relateCount: 78,
      stayStrongCount: 52,
      commentCount: 22,
    },
    {
      userId: userIds[4] || 5,
      title: "New apartment",
      content: "Signed the lease on my own apartment today. It's small, but it's mine. I get to choose where every single thing goes. That feels powerful in a way I didn't expect.",
      category: "recovery",
      mood: "hopeful",
      supportCount: 156,
      relateCount: 92,
      stayStrongCount: 67,
      commentCount: 28,
    },
    {
      userId: userIds[5] || 6,
      title: null,
      content: "I keep reaching for my phone to text them about something funny, then I remember. The silence is the hardest part.",
      category: "loneliness",
      mood: "lonely",
      supportCount: 203,
      relateCount: 145,
      stayStrongCount: 89,
      commentCount: 35,
    },
    {
      userId: userIds[6] || 7,
      title: "Three months out",
      content: "Three months since I left. Some days I question everything. Other days I know I made the right choice. Today is a questioning day.",
      category: "separation",
      mood: "anxious",
      supportCount: 78,
      relateCount: 52,
      stayStrongCount: 41,
      commentCount: 18,
    },
    {
      userId: userIds[7] || 8,
      title: null,
      content: "Started therapy this week. The therapist asked me what I want for myself and I couldn't answer. I've spent so long thinking about what everyone else needs. Who am I when I'm just me?",
      category: "recovery",
      mood: "numb",
      supportCount: 134,
      relateCount: 89,
      stayStrongCount: 56,
      commentCount: 24,
    },
    {
      userId: userIds[8] || 9,
      title: "Co-parenting wins",
      content: "We managed to have a full conversation about the kids' schedules without arguing. It was civil. It was almost friendly. I never thought we'd get here.",
      category: "staying-for-kids",
      mood: "hopeful",
      supportCount: 95,
      relateCount: 43,
      stayStrongCount: 38,
      commentCount: 14,
    },
    {
      userId: userIds[9] || 10,
      title: null,
      content: "To the men here: It's okay to cry. It's okay to not be okay. Strength isn't about holding it all in. It's about being brave enough to feel.",
      category: "emotional-neglect",
      mood: "healing",
      supportCount: 267,
      relateCount: 134,
      stayStrongCount: 112,
      commentCount: 45,
    },
  ];

  for (const p of samplePosts) {
    try {
      await db.insert(posts).values(p);
    } catch (e) {
      // ignore
    }
  }

  // Seed affirmations
  console.log("✨ Seeding affirmations...");
  const affirmationData = [
    { text: "You are stronger than the storm you are facing.", category: "strength" },
    { text: "Healing is not linear. Be patient with your progress.", category: "healing" },
    { text: "You are worthy of love that doesn't hurt.", category: "self-worth" },
    { text: "Every sunrise is a reminder that you survived the night.", category: "hope" },
    { text: "Your feelings are valid. Your pain is real. Your healing is possible.", category: "validation" },
    { text: "You don't have to have it all figured out today.", category: "patience" },
    { text: "The love you give yourself is the most important love you'll ever receive.", category: "self-love" },
    { text: "You are not defined by what happened to you. You are defined by how you rise.", category: "resilience" },
    { text: "It's okay to take things one day, one hour, one breath at a time.", category: "mindfulness" },
    { text: "Your story isn't over. The best chapters may still be ahead.", category: "hope" },
    { text: "You deserve peace. You deserve joy. You deserve a life that feels good.", category: "self-worth" },
    { text: "Being alone doesn't mean you're lonely. It means you're learning to enjoy your own company.", category: "solitude" },
    { text: "The cracks in your heart are where the light gets in.", category: "healing" },
    { text: "You survived 100% of your worst days. That's your track record.", category: "strength" },
    { text: "Letting go doesn't mean giving up. It means accepting that some things aren't meant to be.", category: "acceptance" },
  ];

  for (const a of affirmationData) {
    try {
      await db.insert(affirmations).values(a);
    } catch (e) {
      // ignore
    }
  }

  console.log("✅ Seed complete!");
}

seed().catch(console.error);
