// ============================================
// DivorceTalk.in — Comprehensive Demo Data
// Realistic emotional content for immersive demo
// ============================================

export interface DemoPost {
  id: number;
  username: string;
  title: string | null;
  content: string;
  category: string;
  mood: string;
  supportCount: number;
  relateCount: number;
  stayStrongCount: number;
  commentCount: number;
  comments: DemoComment[];
  createdAt: string;
  timeAgo: string;
}

export interface DemoComment {
  id: number;
  username: string;
  content: string;
  createdAt: string;
}

export interface DemoJournalEntry {
  id: number;
  title: string | null;
  content: string;
  mood: string;
  prompt: string | null;
  createdAt: string;
  dateLabel: string;
}

export interface DemoRoomMessage {
  id: number;
  username: string;
  content: string;
  timeAgo: string;
}

export interface DemoListenerRequest {
  id: number;
  username: string;
  urgency: "low" | "medium" | "high" | "crisis";
  feeling: string;
  communication: string;
  status: string;
  createdAt: string;
}

export interface DemoNotification {
  id: number;
  type: "support" | "comment" | "streak" | "room" | "listener" | "mention";
  message: string;
  timeAgo: string;
  read: boolean;
}

// 50 realistic emotional posts
export const demoPosts: DemoPost[] = [
  {
    id: 1, username: "StillBreathing", title: null,
    content: "Today I removed our wedding photos from the wall. I didn't cry this time. Small steps, right?",
    category: "separation", mood: "hopeful", supportCount: 42, relateCount: 18, stayStrongCount: 12, commentCount: 3,
    comments: [
      { id: 1, username: "QuietRiver", content: "That's a huge milestone. Be proud of yourself. 💛", createdAt: "2025-05-27T10:00:00Z" },
      { id: 2, username: "HealingSoul", content: "I remember that day. It gets easier, I promise.", createdAt: "2025-05-27T10:30:00Z" },
      { id: 3, username: "BetterDaysAhead", content: "You're stronger than you know. Keep going.", createdAt: "2025-05-27T11:00:00Z" },
    ],
    createdAt: "2025-05-27T08:00:00Z", timeAgo: "2 hours ago",
  },
  {
    id: 2, username: "RebuildingSlowly", title: "A peaceful night",
    content: "I finally slept peacefully after weeks of tossing and turning. Small wins matter more than people realize.",
    category: "recovery", mood: "healing", supportCount: 67, relateCount: 31, stayStrongCount: 24, commentCount: 3,
    comments: [
      { id: 4, username: "StillBreathing", content: "Sleep is such a gift when you're going through this. Cherish it.", createdAt: "2025-05-27T09:00:00Z" },
      { id: 5, username: "HopefulDawn", content: "This made me smile. Thank you for sharing.", createdAt: "2025-05-27T09:30:00Z" },
      { id: 6, username: "GentleStrength", content: "Every peaceful night is a step toward healing. 💛", createdAt: "2025-05-27T10:00:00Z" },
    ],
    createdAt: "2025-05-27T06:00:00Z", timeAgo: "4 hours ago",
  },
  {
    id: 3, username: "QuietWarrior", title: "Is this normal?",
    content: "Some days I miss the idea of us more than the reality. Is that normal? It feels like I'm grieving a version of my life that never really existed.",
    category: "confusion", mood: "lonely", supportCount: 89, relateCount: 56, stayStrongCount: 34, commentCount: 3,
    comments: [
      { id: 7, username: "SilentBloom", content: "This is so normal. We grieve the life we thought we'd have. Sending you love.", createdAt: "2025-05-27T08:00:00Z" },
      { id: 8, username: "RebuildingSlowly", content: "I felt the exact same way. You're not crazy.", createdAt: "2025-05-27T08:30:00Z" },
      { id: 9, username: "HealingSoul", content: "The idea of 'us' is often more beautiful than the reality ever was. It's okay to grieve both.", createdAt: "2025-05-27T09:00:00Z" },
    ],
    createdAt: "2025-05-27T04:00:00Z", timeAgo: "6 hours ago",
  },
  {
    id: 4, username: "HealingSoul", title: null,
    content: "My kids asked why daddy doesn't live here anymore. I told them he loves them very much, just in a different house now. They seemed to accept it. I cried in the bathroom after.",
    category: "staying-for-kids", mood: "exhausted", supportCount: 124, relateCount: 78, stayStrongCount: 52, commentCount: 3,
    comments: [
      { id: 10, username: "QuietRiver", content: "You're doing an amazing job protecting their hearts while yours is breaking. That's real love.", createdAt: "2025-05-27T07:00:00Z" },
      { id: 11, username: "BetterDaysAhead", content: "The bathroom cries are real. But so is your strength. They see it even when you don't.", createdAt: "2025-05-27T07:30:00Z" },
      { id: 12, username: "GentleStrength", content: "You handled that with such grace. Your children will remember your gentleness.", createdAt: "2025-05-27T08:00:00Z" },
    ],
    createdAt: "2025-05-27T02:00:00Z", timeAgo: "8 hours ago",
  },
  {
    id: 5, username: "BetterDaysAhead", title: "New apartment",
    content: "Signed the lease on my own apartment today. It's small, but it's mine. I get to choose where every single thing goes. That feels powerful in a way I didn't expect.",
    category: "recovery", mood: "hopeful", supportCount: 156, relateCount: 92, stayStrongCount: 67, commentCount: 3,
    comments: [
      { id: 13, username: "RebuildingSlowly", content: "Congratulations! Your own space is a sanctuary. Make it exactly what you need.", createdAt: "2025-05-27T06:00:00Z" },
      { id: 14, username: "StillBreathing", content: "This is beautiful. Every decision you make for yourself is an act of healing.", createdAt: "2025-05-27T06:30:00Z" },
      { id: 15, username: "HopefulDawn", content: "The power of 'mine.' I felt the same way. Enjoy every moment of creating your space. 🌱", createdAt: "2025-05-27T07:00:00Z" },
    ],
    createdAt: "2025-05-27T00:00:00Z", timeAgo: "10 hours ago",
  },
  {
    id: 6, username: "SilentBloom", title: null,
    content: "I keep reaching for my phone to text them about something funny, then I remember. The silence is the hardest part.",
    category: "loneliness", mood: "lonely", supportCount: 203, relateCount: 145, stayStrongCount: 89, commentCount: 3,
    comments: [
      { id: 16, username: "QuietWarrior", content: "The phantom texts are the worst. It does get better with time.", createdAt: "2025-05-26T22:00:00Z" },
      { id: 17, username: "HealingSoul", content: "I used to write the texts in my notes app and never send them. It helped.", createdAt: "2025-05-26T22:30:00Z" },
      { id: 18, username: "BetterDaysAhead", content: "Your brain is just used to sharing with them. It will rewire. Be patient with yourself.", createdAt: "2025-05-26T23:00:00Z" },
    ],
    createdAt: "2025-05-26T20:00:00Z", timeAgo: "14 hours ago",
  },
  {
    id: 7, username: "RebuildingHeart", title: "Three months out",
    content: "Three months since I left. Some days I question everything. Other days I know I made the right choice. Today is a questioning day.",
    category: "separation", mood: "anxious", supportCount: 78, relateCount: 52, stayStrongCount: 41, commentCount: 3,
    comments: [
      { id: 19, username: "HopefulDawn", content: "Questioning days are part of the process. Trust that you knew what you were doing when you made the choice.", createdAt: "2025-05-26T20:00:00Z" },
      { id: 20, username: "GentleStrength", content: "The questioning days pass. The knowing days become more frequent. Hang in there.", createdAt: "2025-05-26T20:30:00Z" },
      { id: 21, username: "StillBreathing", content: "Three months is still so fresh. Give yourself grace. You're doing better than you think.", createdAt: "2025-05-26T21:00:00Z" },
    ],
    createdAt: "2025-05-26T18:00:00Z", timeAgo: "16 hours ago",
  },
  {
    id: 8, username: "QuietRiver", title: null,
    content: "Started therapy this week. The therapist asked me what I want for myself and I couldn't answer. I've spent so long thinking about what everyone else needs. Who am I when I'm just me?",
    category: "recovery", mood: "numb", supportCount: 134, relateCount: 89, stayStrongCount: 56, commentCount: 3,
    comments: [
      { id: 22, username: "SilentBloom", content: "That question is devastating and important. You'll find the answer. Take your time.", createdAt: "2025-05-26T18:00:00Z" },
      { id: 23, username: "HealingSoul", content: "Therapy is where you meet yourself again. It's uncomfortable but necessary. Proud of you.", createdAt: "2025-05-26T18:30:00Z" },
      { id: 24, username: "BetterDaysAhead", content: "Not knowing who you are is the first step to discovering who you can become. 🌱", createdAt: "2025-05-26T19:00:00Z" },
    ],
    createdAt: "2025-05-26T16:00:00Z", timeAgo: "18 hours ago",
  },
  {
    id: 9, username: "HopefulDawn", title: "Co-parenting wins",
    content: "We managed to have a full conversation about the kids' schedules without arguing. It was civil. It was almost friendly. I never thought we'd get here.",
    category: "staying-for-kids", mood: "hopeful", supportCount: 95, relateCount: 43, stayStrongCount: 38, commentCount: 3,
    comments: [
      { id: 25, username: "HealingSoul", content: "These small moments of peace are huge victories. You're building a new kind of relationship.", createdAt: "2025-05-26T16:00:00Z" },
      { id: 26, username: "QuietWarrior", content: "This gives me hope. We're still in the arguing phase.", createdAt: "2025-05-26T16:30:00Z" },
      { id: 27, username: "GentleStrength", content: "Civility is a gift to your children. They see two adults choosing kindness.", createdAt: "2025-05-26T17:00:00Z" },
    ],
    createdAt: "2025-05-26T14:00:00Z", timeAgo: "20 hours ago",
  },
  {
    id: 10, username: "GentleStrength", title: null,
    content: "To the men here: It's okay to cry. It's okay to not be okay. Strength isn't about holding it all in. It's about being brave enough to feel.",
    category: "emotional-neglect", mood: "healing", supportCount: 267, relateCount: 134, stayStrongCount: 112, commentCount: 3,
    comments: [
      { id: 28, username: "QuietRiver", content: "Thank you for saying this. I needed to hear it today.", createdAt: "2025-05-26T14:00:00Z" },
      { id: 29, username: "RebuildingHeart", content: "Society teaches us to be rocks. But even rocks erode. It's okay to be human.", createdAt: "2025-05-26T14:30:00Z" },
      { id: 30, username: "StillBreathing", content: "This is the kind of masculinity we need. Vulnerable. Honest. Real.", createdAt: "2025-05-26T15:00:00Z" },
    ],
    createdAt: "2025-05-26T12:00:00Z", timeAgo: "22 hours ago",
  },
  {
    id: 11, username: "LostInSilence", title: null,
    content: "I sleep next to someone who hasn't spoken properly to me in months. We share a bed but live in different worlds. The loneliness of being with someone who isn't really there is a special kind of pain.",
    category: "toxic-marriage", mood: "lonely", supportCount: 189, relateCount: 112, stayStrongCount: 76, commentCount: 3,
    comments: [
      { id: 31, username: "HealingSoul", content: "The silent marriage. It's so common yet so isolating. You are seen.", createdAt: "2025-05-26T10:00:00Z" },
      { id: 32, username: "SilentBloom", content: "I lived this for two years. Please know that you deserve connection. Real connection.", createdAt: "2025-05-26T10:30:00Z" },
      { id: 33, username: "BetterDaysAhead", content: "Have you considered couples counseling? Sometimes the silence can be broken with help.", createdAt: "2025-05-26T11:00:00Z" },
    ],
    createdAt: "2025-05-26T08:00:00Z", timeAgo: "1 day ago",
  },
  {
    id: 12, username: "MotherFirst", title: "Staying for them",
    content: "I stayed for my children but I lost myself. I became a shell of who I used to be. Today I looked in the mirror and didn't recognize the woman staring back. When does staying become too expensive?",
    category: "staying-for-kids", mood: "exhausted", supportCount: 234, relateCount: 156, stayStrongCount: 98, commentCount: 3,
    comments: [
      { id: 34, username: "QuietWarrior", content: "Your therapist asked what you're teaching your children about love. That broke me open.", createdAt: "2025-05-26T08:00:00Z" },
      { id: 35, username: "HopefulDawn", content: "Children need a happy parent more than they need parents who stay together miserably.", createdAt: "2025-05-26T08:30:00Z" },
      { id: 36, username: "RebuildingSlowly", content: "I used to think staying was selfless. Now I realize it was slowly destroying all of us.", createdAt: "2025-05-26T09:00:00Z" },
    ],
    createdAt: "2025-05-26T06:00:00Z", timeAgo: "1 day ago",
  },
  {
    id: 13, username: "BraveHeart22", title: "I finally told them",
    content: "I finally told my parents my marriage is failing. My mother cried. My father said 'we're here.' I didn't realize how much I needed to hear that until I did. The shame is starting to lift.",
    category: "separation", mood: "hopeful", supportCount: 178, relateCount: 89, stayStrongCount: 67, commentCount: 3,
    comments: [
      { id: 37, username: "GentleStrength", content: "The way shame dissolves when we speak our truth. So happy for you.", createdAt: "2025-05-26T06:00:00Z" },
      { id: 38, username: "StillBreathing", content: "Your parents' response is beautiful. Not everyone gets that. Cherish it.", createdAt: "2025-05-26T06:30:00Z" },
      { id: 39, username: "HealingSoul", content: "Telling people is one of the hardest parts. You did it. That's courage.", createdAt: "2025-05-26T07:00:00Z" },
    ],
    createdAt: "2025-05-26T04:00:00Z", timeAgo: "1 day ago",
  },
  {
    id: 14, username: "RoommateHusband", title: "My wife's words",
    content: "My wife says we are roommates now. She said it casually over dinner like she was commenting on the weather. I felt my whole world tilt. How do you fix something when the other person has already given up?",
    category: "toxic-marriage", mood: "numb", supportCount: 145, relateCount: 98, stayStrongCount: 54, commentCount: 3,
    comments: [
      { id: 40, username: "QuietRiver", content: "Have you asked her if she wants to fix it? Sometimes the roommate comment is a cry for help disguised as resignation.", createdAt: "2025-05-26T04:00:00Z" },
      { id: 41, username: "SilentBloom", content: "The casual delivery is what kills you. Like your entire marriage is just a minor inconvenience.", createdAt: "2025-05-26T04:30:00Z" },
      { id: 42, username: "BetterDaysAhead", content: "Use her words as a starting point for the conversation you've both been avoiding.", createdAt: "2025-05-26T05:00:00Z" },
    ],
    createdAt: "2025-05-26T02:00:00Z", timeAgo: "1 day ago",
  },
  {
    id: 15, username: "ConfusedSoul", title: "I don't know what I want",
    content: "I don't know if I want divorce or peace. I don't know if I want to fight or let go. I don't know if I'm holding on because I love him or because I'm terrified of being alone. The not-knowing is the heaviest thing I've ever carried.",
    category: "confusion", mood: "anxious", supportCount: 312, relateCount: 198, stayStrongCount: 134, commentCount: 3,
    comments: [
      { id: 43, username: "HealingSoul", content: "The not-knowing is actually your heart trying to protect you. It's okay to sit in the uncertainty.", createdAt: "2025-05-26T02:00:00Z" },
      { id: 44, username: "RebuildingSlowly", content: "I was in this exact place for six months. The clarity came when I stopped trying to decide and started listening to my body.", createdAt: "2025-05-26T02:30:00Z" },
      { id: 45, username: "GentleStrength", content: "You don't have to know today. Or tomorrow. The answer will find you when you're ready.", createdAt: "2025-05-26T03:00:00Z" },
    ],
    createdAt: "2025-05-26T00:00:00Z", timeAgo: "2 days ago",
  },
  {
    id: 16, username: "NightOwl87", title: null,
    content: "It's 3 AM and I'm googling 'how to know if your marriage is over.' I can't believe this is my life. We used to stay up talking until 3 AM. Now I'm up alone searching for answers he won't give me.",
    category: "toxic-marriage", mood: "lonely", supportCount: 198, relateCount: 134, stayStrongCount: 87, commentCount: 3,
    comments: [
      { id: 46, username: "QuietWarrior", content: "The 3 AM googling. I know this so well. Please try to get some sleep. Nothing good is decided at 3 AM.", createdAt: "2025-05-25T22:00:00Z" },
      { id: 47, username: "StillBreathing", content: "Put the phone down. Breathe. Sleep. The answers will still be there in the morning.", createdAt: "2025-05-25T22:30:00Z" },
      { id: 48, username: "HopefulDawn", content: "The fact that you're searching means you still care. That's not nothing.", createdAt: "2025-05-25T23:00:00Z" },
    ],
    createdAt: "2025-05-25T20:00:00Z", timeAgo: "2 days ago",
  },
  {
    id: 17, username: "SoftThunder", title: "My first date with myself",
    content: "I took myself out for dinner tonight. Sat at a table for one. Ordered exactly what I wanted. It felt strange and liberating and a little sad all at once. But I laughed at something on my phone and realized — I'm actually okay alone.",
    category: "recovery", mood: "hopeful", supportCount: 156, relateCount: 78, stayStrongCount: 89, commentCount: 3,
    comments: [
      { id: 49, username: "BetterDaysAhead", content: "The first solo dinner is a rite of passage. You just passed it. Proud of you.", createdAt: "2025-05-25T20:00:00Z" },
      { id: 50, username: "HealingSoul", content: "'I'm actually okay alone' — those are the most powerful words you can say to yourself right now.", createdAt: "2025-05-25T20:30:00Z" },
      { id: 51, username: "SilentBloom", content: "Learning to enjoy your own company is the greatest gift you can give yourself. 💛", createdAt: "2025-05-25T21:00:00Z" },
    ],
    createdAt: "2025-05-25T18:00:00Z", timeAgo: "2 days ago",
  },
  {
    id: 18, username: "ForgottenWife", title: "Emotional neglect",
    content: "He hasn't asked me about my day in over a year. He comes home, eats, watches TV, sleeps. I feel like a ghost in my own home. Sometimes I speak just to hear a human voice, even if it's only mine.",
    category: "emotional-neglect", mood: "lonely", supportCount: 267, relateCount: 178, stayStrongCount: 112, commentCount: 3,
    comments: [
      { id: 52, username: "QuietRiver", content: "Emotional neglect is abuse. I know that's hard to hear, but you deserve to be seen.", createdAt: "2025-05-25T18:00:00Z" },
      { id: 53, username: "RebuildingSlowly", content: "I lived this for three years. Please consider counseling. If he won't go, go alone. You matter.", createdAt: "2025-05-25T18:30:00Z" },
      { id: 54, username: "GentleStrength", content: "You are not a ghost. You are a whole person who deserves attention, care, and love.", createdAt: "2025-05-25T19:00:00Z" },
    ],
    createdAt: "2025-05-25T16:00:00Z", timeAgo: "2 days ago",
  },
  {
    id: 19, username: "NewDadAlone", title: "Postpartum and alone",
    content: "My wife had our baby three months ago and something shifted. She looks through me now. I try to help, I really do, but nothing I do is right. I feel like I've lost her to motherhood and I don't know how to get her back.",
    category: "emotional-neglect", mood: "exhausted", supportCount: 134, relateCount: 67, stayStrongCount: 89, commentCount: 3,
    comments: [
      { id: 55, username: "HealingSoul", content: "Postpartum changes everything. She might be struggling too. Have you asked her how she's feeling? Really asked?", createdAt: "2025-05-25T16:00:00Z" },
      { id: 56, username: "BetterDaysAhead", content: "This is so common and so rarely talked about. Consider couples therapy focused on the transition to parenthood.", createdAt: "2025-05-25T16:30:00Z" },
      { id: 57, username: "MotherFirst", content: "As a mom who went through this — she probably feels like she's failing at everything. Including being a wife. Show her she's not.", createdAt: "2025-05-25T17:00:00Z" },
    ],
    createdAt: "2025-05-25T14:00:00Z", timeAgo: "3 days ago",
  },
  {
    id: 20, username: "SecondChance", title: "We tried again",
    content: "We separated for six months, then tried again. Everyone said 'see, you worked it out.' But the same problems came back within weeks. Now I feel foolish and trapped. Why did I think it would be different?",
    category: "separation", mood: "anxious", supportCount: 112, relateCount: 89, stayStrongCount: 45, commentCount: 3,
    comments: [
      { id: 58, username: "QuietWarrior", content: "You weren't foolish. You were hopeful. There's a difference. Hope is brave.", createdAt: "2025-05-25T14:00:00Z" },
      { id: 59, username: "StillBreathing", content: "Trying again and it not working is actually valuable data. Now you know for sure.", createdAt: "2025-05-25T14:30:00Z" },
      { id: 60, username: "RebuildingSlowly", content: "The second time is harder because you lose the illusion that things can change. But that clarity is a gift too.", createdAt: "2025-05-25T15:00:00Z" },
    ],
    createdAt: "2025-05-25T12:00:00Z", timeAgo: "3 days ago",
  },
  {
    id: 21, username: "InvisibleHusband", title: "I feel invisible",
    content: "My wife hasn't touched me in eight months. Not a hug, not a hand hold, nothing. I've tried talking about it, writing letters, suggesting therapy. She says she's 'just not that kind of person.' I feel starved for affection and completely invisible.",
    category: "emotional-neglect", mood: "lonely", supportCount: 156, relateCount: 98, stayStrongCount: 76, commentCount: 3,
    comments: [
      { id: 61, username: "SilentBloom", content: "Physical touch is a need, not a want. You're not being needy. You're being human.", createdAt: "2025-05-25T12:00:00Z" },
      { id: 62, username: "HealingSoul", content: "'Just not that kind of person' is not an answer. It's an avoidance. You deserve a real conversation.", createdAt: "2025-05-25T12:30:00Z" },
      { id: 63, username: "GentleStrength", content: "The touch starvation is real. It affects your whole wellbeing. Please prioritize your needs.", createdAt: "2025-05-25T13:00:00Z" },
    ],
    createdAt: "2025-05-25T10:00:00Z", timeAgo: "3 days ago",
  },
  {
    id: 22, username: "BreakingFree88", title: "I packed my bags",
    content: "I packed my bags today. Sat them by the door. I don't know if I'll walk through that door today or next week or next month. But I packed them. That means I'm thinking about leaving. That means something has already left, even if my body hasn't yet.",
    category: "separation", mood: "numb", supportCount: 198, relateCount: 134, stayStrongCount: 98, commentCount: 3,
    comments: [
      { id: 64, username: "BetterDaysAhead", content: "Packing the bags is often harder than walking out the door. You've done the hardest part.", createdAt: "2025-05-25T10:00:00Z" },
      { id: 65, username: "QuietRiver", content: "There's no timeline for this. Walk out when you're ready. The bags will wait.", createdAt: "2025-05-25T10:30:00Z" },
      { id: 66, username: "HopefulDawn", content: "Sometimes the decision to leave happens slowly, in tiny steps. Packing is a step. Honor it.", createdAt: "2025-05-25T11:00:00Z" },
    ],
    createdAt: "2025-05-25T08:00:00Z", timeAgo: "3 days ago",
  },
  {
    id: 23, username: "HealingAt42", title: "I found joy again",
    content: "I'm 42 and I just laughed so hard my stomach hurt. With friends. Real friends. Not the married couple friends who chose sides. These are MY friends. I forgot what this felt like. Joy isn't gone forever. It was just waiting for me to find my way back.",
    category: "recovery", mood: "healing", supportCount: 234, relateCount: 112, stayStrongCount: 156, commentCount: 3,
    comments: [
      { id: 67, username: "SoftThunder", content: "This post radiates hope. Thank you for reminding us what's on the other side.", createdAt: "2025-05-25T08:00:00Z" },
      { id: 68, username: "RebuildingSlowly", content: "The laughter comes back. Slowly, then all at once. So happy for you. 💛", createdAt: "2025-05-25T08:30:00Z" },
      { id: 69, username: "StillBreathing", content: "42 is young. You have so much life ahead. And now it belongs to you.", createdAt: "2025-05-25T09:00:00Z" },
    ],
    createdAt: "2025-05-25T06:00:00Z", timeAgo: "3 days ago",
  },
  {
    id: 24, username: "BetrayedHeart", title: "The discovery",
    content: "I found messages on his phone. Not just one. Months of them. With someone he works with. I've been shaking for three days. I can't eat. I can't sleep. I keep replaying every moment of our marriage wondering when it started. How do you survive this?",
    category: "infidelity", mood: "anxious", supportCount: 178, relateCount: 89, stayStrongCount: 112, commentCount: 3,
    comments: [
      { id: 70, username: "HealingSoul", content: "First: breathe. Second: you survive one hour at a time. Third: please talk to someone. A therapist, a friend, anyone. You don't have to carry this shock alone.", createdAt: "2025-05-25T06:00:00Z" },
      { id: 71, username: "GentleStrength", content: "The discovery phase is traumatic. Your nervous system is in shock. Be gentle with yourself. No big decisions yet.", createdAt: "2025-05-25T06:30:00Z" },
      { id: 72, username: "BetterDaysAhead", content: "I went through this. The replaying is the worst part. It gets quieter with time. I promise.", createdAt: "2025-05-25T07:00:00Z" },
    ],
    createdAt: "2025-05-25T04:00:00Z", timeAgo: "4 days ago",
  },
  {
    id: 25, username: "MotherInLawHell", title: "She won't let us breathe",
    content: "My mother-in-law calls my husband every single day. She criticizes my cooking, my parenting, my career. He says 'that's just how she is.' I say that's how SHE is, but how YOU are is the problem. He won't set boundaries and I'm drowning in his family's disrespect.",
    category: "in-laws", mood: "angry", supportCount: 145, relateCount: 98, stayStrongCount: 54, commentCount: 3,
    comments: [
      { id: 73, username: "QuietRiver", content: "The problem isn't the mother-in-law. It's your husband's inability to protect you from her.", createdAt: "2025-05-25T04:00:00Z" },
      { id: 74, username: "StillBreathing", content: "This is a him problem disguised as a her problem. He needs to be your partner first.", createdAt: "2025-05-25T04:30:00Z" },
      { id: 75, username: "RebuildingSlowly", content: "I set the boundary myself eventually. 'You can call him, but you don't get to speak to me that way.' It changed everything.", createdAt: "2025-05-25T05:00:00Z" },
    ],
    createdAt: "2025-05-25T02:00:00Z", timeAgo: "4 days ago",
  },
  {
    id: 26, username: "AloneTogether", title: "The anniversary",
    content: "Today is our 10-year anniversary. We went to dinner. We talked about the weather, the news, the food. We didn't talk about us. We didn't mention the anniversary until the waiter brought dessert with a candle. We both pretended to be surprised. This is what we've become.",
    category: "toxic-marriage", mood: "numb", supportCount: 189, relateCount: 134, stayStrongCount: 87, commentCount: 3,
    comments: [
      { id: 76, username: "SilentBloom", content: "The pretending is what breaks you. The performance of a marriage without the substance.", createdAt: "2025-05-25T02:00:00Z" },
      { id: 77, username: "HealingSoul", content: "Ten years is a long time to pretend. Have you considered what you'd say if you stopped performing?", createdAt: "2025-05-25T02:30:00Z" },
      { id: 78, username: "BetterDaysAhead", content: "The fact that you noticed means you're waking up. That's the first step toward real change.", createdAt: "2025-05-25T03:00:00Z" },
    ],
    createdAt: "2025-05-25T00:00:00Z", timeAgo: "4 days ago",
  },
  {
    id: 27, username: "ReadyToGo", title: "I told him I'm leaving",
    content: "I told him I'm leaving. He cried. I cried. We held each other for the first time in months. It was the most intimate we've been in years. How is it that goodbye feels closer than our marriage ever did?",
    category: "separation", mood: "exhausted", supportCount: 245, relateCount: 167, stayStrongCount: 134, commentCount: 3,
    comments: [
      { id: 79, username: "RebuildingSlowly", content: "Sometimes the grief of ending brings up everything you wish the marriage had been. It's grief for two things at once.", createdAt: "2025-05-24T22:00:00Z" },
      { id: 80, username: "QuietWarrior", content: "The goodbye hug being the most intimate moment speaks volumes. You both deserved that closeness all along.", createdAt: "2025-05-24T22:30:00Z" },
      { id: 81, username: "HopefulDawn", content: "Whatever happens next, you were honest. That honesty will serve both of you in the long run.", createdAt: "2025-05-24T23:00:00Z" },
    ],
    createdAt: "2025-05-24T20:00:00Z", timeAgo: "4 days ago",
  },
  {
    id: 28, username: "FindingMe", title: "Rediscovered a hobby",
    content: "I started painting again after 15 years. My ex always said it was a waste of time. Last night I painted until 2 AM and didn't think about him once. Not once. I think that's what healing feels like.",
    category: "recovery", mood: "healing", supportCount: 178, relateCount: 89, stayStrongCount: 112, commentCount: 3,
    comments: [
      { id: 82, username: "SoftThunder", content: "'Didn't think about him once' — that's the milestone right there. Keep painting. Keep healing.", createdAt: "2025-05-24T20:00:00Z" },
      { id: 83, username: "HealingSoul", content: "Reclaiming the parts of yourself you abandoned for the relationship. That's real recovery.", createdAt: "2025-05-24T20:30:00Z" },
      { id: 84, username: "BetterDaysAhead", content: "Would love to see your paintings sometime. Art heals in ways words can't. 🎨", createdAt: "2025-05-24T21:00:00Z" },
    ],
    createdAt: "2025-05-24T18:00:00Z", timeAgo: "5 days ago",
  },
  {
    id: 29, username: "ScaredMom", title: "Financial fear",
    content: "I want to leave but I'm financially dependent on him. I haven't worked in 8 years. I have no savings. How do women do this? How do you leave when the practical reality feels impossible? I'm so scared of being poor and alone.",
    category: "staying-for-kids", mood: "anxious", supportCount: 156, relateCount: 112, stayStrongCount: 67, commentCount: 3,
    comments: [
      { id: 85, username: "QuietRiver", content: "Start small. Open your own bank account. Take a free online course. Talk to a lawyer about your rights. One step at a time.", createdAt: "2025-05-24T18:00:00Z" },
      { id: 86, username: "MotherFirst", content: "I was in your exact position. I started with a part-time job, then built from there. It took a year, but I made it. You can too.", createdAt: "2025-05-24T18:30:00Z" },
      { id: 87, username: "GentleStrength", content: "Being poor and free is better than being comfortable and invisible. You'll find resources you didn't know you had.", createdAt: "2025-05-24T19:00:00Z" },
    ],
    createdAt: "2025-05-24T16:00:00Z", timeAgo: "5 days ago",
  },
  {
    id: 30, username: "GentleWarrior", title: "To the women still trying",
    content: "To every woman reading this who is still trying to make it work: I see you. I was you. I tried for six years. Six years of counseling, books, conversations, ultimatums. Sometimes it doesn't work because it's not meant to. And that's not your failure.",
    category: "recovery", mood: "healing", supportCount: 298, relateCount: 189, stayStrongCount: 156, commentCount: 3,
    comments: [
      { id: 88, username: "BraveHeart22", content: "I needed this so much today. I've been blaming myself for not trying hard enough.", createdAt: "2025-05-24T16:00:00Z" },
      { id: 89, username: "ConfusedSoul", content: "Six years of trying. That's not giving up. That's being human and knowing when enough is enough.", createdAt: "2025-05-24T16:30:00Z" },
      { id: 90, username: "HealingSoul", content: "The courage to stop trying is sometimes braver than the courage to keep going. Thank you for this.", createdAt: "2025-05-24T17:00:00Z" },
    ],
    createdAt: "2025-05-24T14:00:00Z", timeAgo: "5 days ago",
  },
  {
    id: 31, username: "WeekendDad", title: "Being a weekend dad",
    content: "I only see my kids on weekends now. The house is so quiet during the week. I used to complain about the noise. Now I'd give anything to hear them arguing over the TV remote. The silence is a reminder of everything I lost.",
    category: "staying-for-kids", mood: "lonely", supportCount: 167, relateCount: 89, stayStrongCount: 98, commentCount: 3,
    comments: [
      { id: 91, username: "BetterDaysAhead", content: "The quality of your weekend time matters more than the quantity. Make those days count.", createdAt: "2025-05-24T14:00:00Z" },
      { id: 92, username: "QuietWarrior", content: "Call them during the week. Even a 5-minute video call helps both of you.", createdAt: "2025-05-24T14:30:00Z" },
      { id: 93, username: "HealingSoul", content: "The quiet house is grief. Let yourself grieve it. But also fill it with things that are yours.", createdAt: "2025-05-24T15:00:00Z" },
    ],
    createdAt: "2025-05-24T12:00:00Z", timeAgo: "5 days ago",
  },
  {
    id: 32, username: "QuietCourage", title: "Small win",
    content: "I said 'no' to him today. For the first time in our 12-year marriage, I said no to something I didn't want to do. He was surprised. I was surprised. And the world didn't end. It felt like the beginning of something.",
    category: "recovery", mood: "hopeful", supportCount: 234, relateCount: 145, stayStrongCount: 112, commentCount: 3,
    comments: [
      { id: 94, username: "SoftThunder", content: "The first 'no' is the most important one. It changes everything that comes after.", createdAt: "2025-05-24T12:00:00Z" },
      { id: 95, username: "GentleStrength", content: "'The world didn't end' — this is what we learn. Our boundaries don't destroy relationships. They build honest ones.", createdAt: "2025-05-24T12:30:00Z" },
      { id: 96, username: "StillBreathing", content: "12 years to say no. But you said it. That matters more than the 12 years that came before.", createdAt: "2025-05-24T13:00:00Z" },
    ],
    createdAt: "2025-05-24T10:00:00Z", timeAgo: "5 days ago",
  },
  {
    id: 33, username: "WakingUp", title: "The conversation I was afraid of",
    content: "I asked her if she still loves me. She paused. Then she said 'I love the life we built, but I don't know if I'm in love with you anymore.' It hurt more than I thought possible. But at least now I know. At least now we can be honest.",
    category: "toxic-marriage", mood: "numb", supportCount: 198, relateCount: 134, stayStrongCount: 89, commentCount: 3,
    comments: [
      { id: 97, username: "QuietRiver", content: "The pause said everything before her words did. But honesty, even painful honesty, is a gift.", createdAt: "2025-05-24T10:00:00Z" },
      { id: 98, username: "RebuildingSlowly", content: "'I love the life we built' — she loves the idea. Not the person. That's devastating but clarifying.", createdAt: "2025-05-24T10:30:00Z" },
      { id: 99, username: "HealingSoul", content: "You asked the question most people are too afraid to ask. That took courage. Honor that courage.", createdAt: "2025-05-24T11:00:00Z" },
    ],
    createdAt: "2025-05-24T08:00:00Z", timeAgo: "6 days ago",
  },
  {
    id: 34, username: "MovingForward", title: "First month alone",
    content: "I've been alone for a month now. The first week was terrifying. The second week was sad. The third week I started cooking real meals again. This week I laughed at a podcast and realized I was enjoying my own company. It's small. But it's everything.",
    category: "recovery", mood: "healing", supportCount: 189, relateCount: 98, stayStrongCount: 134, commentCount: 3,
    comments: [
      { id: 100, username: "SoftThunder", content: "Week 3 cooking real meals. That's the turning point. I'm so happy for you.", createdAt: "2025-05-24T08:00:00Z" },
      { id: 101, username: "BetterDaysAhead", content: "Month one is the hardest. You survived it. Everything from here gets a little easier.", createdAt: "2025-05-24T08:30:00Z" },
      { id: 102, username: "HopefulDawn", content: "Laughing alone at a podcast is a beautiful milestone. You found yourself again.", createdAt: "2025-05-24T09:00:00Z" },
    ],
    createdAt: "2025-05-24T06:00:00Z", timeAgo: "6 days ago",
  },
  {
    id: 35, username: "StillHoping", title: "One last try",
    content: "We start couples therapy next week. This is our last try. I'm scared it won't work. I'm scared it will work and I'll realize we could have fixed this years ago. Mostly I'm scared of staying the same. Whatever happens, at least we'll have tried everything.",
    category: "toxic-marriage", mood: "anxious", supportCount: 145, relateCount: 89, stayStrongCount: 76, commentCount: 3,
    comments: [
      { id: 103, username: "HealingSoul", content: "Going to therapy is already a win. Whether it saves the marriage or gives you clarity to leave, it's progress.", createdAt: "2025-05-24T06:00:00Z" },
      { id: 104, username: "GentleStrength", content: "The trying is what matters. You won't look back with regret if you know you gave it everything.", createdAt: "2025-05-24T06:30:00Z" },
      { id: 105, username: "QuietWarrior", content: "Go in with an open heart but also with clarity about what you need. Therapy isn't magic, but it gives you tools.", createdAt: "2025-05-24T07:00:00Z" },
    ],
    createdAt: "2025-05-24T04:00:00Z", timeAgo: "6 days ago",
  },
  {
    id: 36, username: "AnonymousSoul", title: "I just need to vent",
    content: "I don't need advice. I don't need solutions. I just need to say out loud that I'm drowning. That I'm tired of being the strong one. That I cry in the shower so nobody sees. That I'm terrified of starting over at 38. That some days I think about driving and never stopping. I just need someone to know.",
    category: "loneliness", mood: "exhausted", supportCount: 356, relateCount: 234, stayStrongCount: 189, commentCount: 3,
    comments: [
      { id: 106, username: "HealingSoul", content: "We know. We see you. You're not alone in this. Please reach out to our listeners or the crisis helpline if you need immediate support. 💛", createdAt: "2025-05-24T04:00:00Z" },
      { id: 107, username: "GentleStrength", content: "Driving and never stopping — I've had that thought too. It passes. The heaviness lifts, slowly. Hold on.", createdAt: "2025-05-24T04:30:00Z" },
      { id: 108, username: "BetterDaysAhead", content: "38 is not too late. I started over at 41. I'm 44 now and I've never been happier. The tunnel has an end.", createdAt: "2025-05-24T05:00:00Z" },
    ],
    createdAt: "2025-05-24T02:00:00Z", timeAgo: "6 days ago",
  },
];

// Demo journal entries for HealingSoul92
export const demoJournalEntries: DemoJournalEntry[] = [
  { id: 1, title: "The beginning", content: "I don't know what I'm doing here. I don't know if my marriage is worth saving or if I'm just afraid of being alone. Today I felt numb. I sat at the kitchen table and stared at the wall for an hour. Something has to change. I just don't know what.", mood: "numb", prompt: "What are you feeling right now?", createdAt: "2025-05-10T08:00:00Z", dateLabel: "May 10" },
  { id: 2, title: null, content: "He didn't ask about my day again. Third week in a row. I tried to tell him about the presentation at work and he nodded without looking up from his phone. I stopped talking mid-sentence. He didn't notice.", mood: "lonely", prompt: "What hurt today?", createdAt: "2025-05-11T21:00:00Z", dateLabel: "May 11" },
  { id: 3, title: "A good memory", content: "I found old photos from our honeymoon. We were so happy. We laughed at everything. I don't know when that version of us died. Was it gradual? Was there a moment? I keep looking for the turning point and I can't find it.", mood: "sad", prompt: "What do you wish you could say?", createdAt: "2025-05-12T19:00:00Z", dateLabel: "May 12" },
  { id: 4, title: "I spoke up", content: "Today I told him I feel invisible. He said I was being dramatic. Then he went silent for three hours. Is this what communication looks like now? I feel worse than before I said anything.", mood: "angry", prompt: "What are you afraid of?", createdAt: "2025-05-13T22:00:00Z", dateLabel: "May 13" },
  { id: 5, title: null, content: "I had coffee with Sarah today. She asked how I was doing and I actually told her the truth. I cried in a coffee shop. She held my hand. It was the first time I felt seen in months.", mood: "hopeful", prompt: "What are you grateful for?", createdAt: "2025-05-14T16:00:00Z", dateLabel: "May 14" },
  { id: 6, title: "Therapy thoughts", content: "I booked a therapy appointment. It took me two hours to work up the courage to make the call. My hands were shaking. But I did it. That's something, right?",
    mood: "anxious", prompt: "What small step did you take today?", createdAt: "2025-05-15T10:00:00Z", dateLabel: "May 15" },
  { id: 7, title: "The kids noticed", content: "My daughter asked why mommy is sad all the time. She's six. I told her grown-ups sometimes have big feelings too. She hugged me and said 'I have big feelings too, mommy.' I cried. Hard.", mood: "exhausted", prompt: "What do you wish you could say?", createdAt: "2025-05-16T20:00:00Z", dateLabel: "May 16" },
  { id: 8, title: "A small joy", content: "I walked in the park today. The flowers are blooming. I sat on a bench and just breathed. For ten minutes I didn't think about my marriage or my future. I just watched a bird build a nest. It was perfect.", mood: "calm", prompt: "What brought you peace today?", createdAt: "2025-05-17T14:00:00Z", dateLabel: "May 17" },
  { id: 9, title: "First therapy session", content: "My therapist asked what I want. I couldn't answer. She said that's okay. We spent the session talking about who I was before the marriage. I remembered that I used to write poetry. I used to dance in the kitchen. I used to laugh loudly. Where did that person go?", mood: "numb", prompt: "Who are you when you're just you?", createdAt: "2025-05-18T11:00:00Z", dateLabel: "May 18" },
  { id: 10, title: "I wrote a poem", content: "I wrote a poem for the first time in ten years. It's not good. But it's mine. It's about a woman who forgot her own name and is learning to say it again. I think I'm the woman in the poem.", mood: "hopeful", prompt: "What do you need more of?", createdAt: "2025-05-19T21:00:00Z", dateLabel: "May 19" },
  { id: 11, title: "The hard conversation", content: "I told him I think we need space. He cried. I cried. We didn't solve anything. But for the first time, we were honest. The air in the room felt different afterward. Lighter somehow.", mood: "anxious", prompt: "What would you tell yourself a year ago?", createdAt: "2025-05-20T23:00:00Z", dateLabel: "May 20" },
  { id: 12, title: "Staying at my sister's", content: "I'm staying at my sister's house tonight. The kids are with their dad. It's the first night I've spent away from home in twelve years. The silence is strange but not unwelcome. I can hear myself think.", mood: "calm", prompt: "What does healing look like to you?", createdAt: "2025-05-21T22:00:00Z", dateLabel: "May 21" },
  { id: 13, title: "A dream", content: "I had a dream last night that I was flying. Not superhero flying — just light enough that the wind could carry me. I woke up smiling. My sister said I haven't smiled in my sleep in years.", mood: "hopeful", prompt: "Describe how your body feels today.", createdAt: "2025-05-22T07:00:00Z", dateLabel: "May 22" },
  { id: 14, title: "The decision", content: "I decided to separate. Not divorce yet — just space. Time to figure out who I am alone. I'm terrified. But I'm more terrified of staying the same. Today I start over. Today I choose me.", mood: "hopeful", prompt: "What are you releasing?", createdAt: "2025-05-23T08:00:00Z", dateLabel: "May 23" },
  { id: 15, title: "Day one alone", content: "I made coffee this morning. Just for me. I didn't have to ask anyone how they take it. I sat by the window and drank it slowly. It tasted like freedom. Small. But enough for today.", mood: "healing", prompt: "What does your ideal day look like?", createdAt: "2025-05-24T09:00:00Z", dateLabel: "May 24" },
];

// Demo room messages
export const demoRoomMessages: Record<string, DemoRoomMessage[]> = {
  "silent-marriages": [
    { id: 1, username: "QuietRiver", content: "Does anyone else feel like they're living with a stranger?", timeAgo: "2 min ago" },
    { id: 2, username: "LostInSilence", content: "Every single day. We share a bed but live completely separate lives.", timeAgo: "5 min ago" },
    { id: 3, username: "HealingSoul", content: "I used to try to fill the silence. Now I just accept it. Some days it's peaceful, other days it breaks my heart.", timeAgo: "8 min ago" },
    { id: 4, username: "AnonymousSoul", content: "Has anyone tried to rekindle conversation? Did it work?", timeAgo: "12 min ago" },
    { id: 5, username: "StillBreathing", content: "I tried for months. I got one-word answers. Eventually I stopped trying. The silence became mutual.", timeAgo: "15 min ago" },
    { id: 6, username: "ForgottenWife", content: "I started writing letters to him that I never send. It's the only way I can express what I feel.", timeAgo: "20 min ago" },
  ],
  "relationship-burnout": [
    { id: 1, username: "BraveHeart22", content: "I'm so tired of being the emotional manager in my relationship.", timeAgo: "1 min ago" },
    { id: 2, username: "GentleStrength", content: "The emotional labor is exhausting. Planning, remembering, caring, fixing — it never ends.", timeAgo: "3 min ago" },
    { id: 3, username: "SoftThunder", content: "I hit burnout last month. Couldn't get out of bed for two days. That's when I knew something had to change.", timeAgo: "6 min ago" },
    { id: 4, username: "ConfusedSoul", content: "How do you explain burnout to someone who thinks you're just 'tired'?", timeAgo: "10 min ago" },
    { id: 5, username: "BetterDaysAhead", content: "You can't pour from an empty cup. I had to learn that the hard way.", timeAgo: "14 min ago" },
  ],
  "separation-anxiety": [
    { id: 1, username: "ScaredMom", content: "I'm terrified of being financially alone. Has anyone else felt this?", timeAgo: "2 min ago" },
    { id: 2, username: "QuietCourage", content: "I was terrified too. But I figured it out. One small step at a time.", timeAgo: "5 min ago" },
    { id: 3, username: "BreakingFree88", content: "The anxiety is real. My hands shake when I think about signing the papers.", timeAgo: "8 min ago" },
    { id: 4, username: "HopefulDawn", content: "The unknown is scary, but so is staying in something that drains you.", timeAgo: "12 min ago" },
    { id: 5, username: "HealingSoul", content: "Talk to a financial advisor. Knowledge reduces fear. You have options you don't know about yet.", timeAgo: "16 min ago" },
  ],
  "betrayal": [
    { id: 1, username: "BetrayedHeart", content: "It's been two weeks since I found out. Some moments I feel okay, others I can't breathe.", timeAgo: "1 min ago" },
    { id: 2, username: "HealingSoul", content: "The waves come and go. There's no timeline for healing from betrayal. Be gentle with yourself.", timeAgo: "4 min ago" },
    { id: 3, username: "RebuildingSlowly", content: "I went through this three years ago. It gets quieter. The thoughts slow down. Trust yourself to heal.", timeAgo: "7 min ago" },
    { id: 4, username: "QuietWarrior", content: "Did you decide to stay or leave? I'm struggling with this decision.", timeAgo: "11 min ago" },
    { id: 5, username: "BetterDaysAhead", content: "I chose to leave. It was the hardest and best decision of my life. Only you know what's right for you.", timeAgo: "15 min ago" },
  ],
  "co-parenting": [
    { id: 1, username: "WeekendDad", content: "How do you handle transitions when the kids go between homes?", timeAgo: "3 min ago" },
    { id: 2, username: "MotherFirst", content: "Keep a consistent routine at both places. Kids need stability more than anything.", timeAgo: "6 min ago" },
    { id: 3, username: "HopefulDawn", content: "We have a shared calendar. It helps everyone know what's happening when.", timeAgo: "9 min ago" },
    { id: 4, username: "QuietRiver", content: "Never badmouth the other parent in front of the kids. They love you both.", timeAgo: "13 min ago" },
    { id: 5, username: "HealingSoul", content: "The first year is the hardest. By year two, you find a rhythm. Hang in there.", timeAgo: "17 min ago" },
  ],
  "toxic-family": [
    { id: 1, username: "MotherInLawHell", content: "My MIL called my parenting 'lazy' again. My husband said nothing.", timeAgo: "2 min ago" },
    { id: 2, username: "GentleStrength", content: "The silence from your husband is the real problem. He should be your shield.", timeAgo: "5 min ago" },
    { id: 3, username: "StillBreathing", content: "I set a boundary last month: 'You can have opinions about your life, not mine.' Changed everything.", timeAgo: "8 min ago" },
    { id: 4, username: "BetterDaysAhead", content: "Family pressure is real. Remember: you chose each other. Not them.", timeAgo: "12 min ago" },
    { id: 5, username: "QuietWarrior", content: "Therapy helped us become a united front. It took time but worth every session.", timeAgo: "16 min ago" },
  ],
};

// Demo listener requests
export const demoListenerRequests: DemoListenerRequest[] = [
  { id: 1, username: "QuietRiver", urgency: "high", feeling: "I feel like I'm drowning. My husband and I haven't had a real conversation in months. I don't know if I should stay or leave. I just need someone to hear me without judging.", communication: "Text chat preferred", status: "matched", createdAt: "2025-05-27T06:00:00Z" },
  { id: 2, username: "LostInSilence", urgency: "medium", feeling: "I'm emotionally exhausted from carrying my marriage alone. I need to vent to someone who understands what silent suffering feels like.", communication: "Email", status: "pending", createdAt: "2025-05-27T04:00:00Z" },
  { id: 3, username: "ScaredMom", urgency: "high", feeling: "I want to leave my marriage but I'm financially dependent. I'm terrified of being a single mom with no income. I need guidance and hope.", communication: "Video call", status: "in_progress", createdAt: "2025-05-26T20:00:00Z" },
  { id: 4, username: "BetrayedHeart", urgency: "crisis", feeling: "I found out about the affair two weeks ago. I can't eat or sleep. I keep replaying everything. I need someone to tell me this pain won't last forever.", communication: "Any", status: "matched", createdAt: "2025-05-26T18:00:00Z" },
  { id: 5, username: "AnonymousSoul", urgency: "medium", feeling: "I haven't spoken honestly to anyone in years. I put on a brave face for everyone but inside I'm falling apart. I just need one person to know the truth.", communication: "Text chat", status: "pending", createdAt: "2025-05-26T14:00:00Z" },
  { id: 6, username: "WeekendDad", urgency: "low", feeling: "Being a weekend dad is harder than I expected. The quiet house gets to me. Just need someone to talk to who gets it.", communication: "Email", status: "resolved", createdAt: "2025-05-25T10:00:00Z" },
];

// Demo notifications
export const demoNotifications: DemoNotification[] = [
  { id: 1, type: "support", message: "HealingSoul sent 💛 Support to your post", timeAgo: "2 min ago", read: false },
  { id: 2, type: "comment", message: "QuietRiver commented on your journal entry", timeAgo: "15 min ago", read: false },
  { id: 3, type: "streak", message: "Your journal streak reached 7 days! 🌱", timeAgo: "1 hour ago", read: false },
  { id: 4, type: "room", message: "New discussion in Silent Marriages", timeAgo: "2 hours ago", read: true },
  { id: 5, type: "listener", message: "A listener replied to your request", timeAgo: "3 hours ago", read: true },
  { id: 6, type: "mention", message: "BetterDaysAhead mentioned you in a comment", timeAgo: "5 hours ago", read: true },
];

// Admin analytics data
export const demoAdminStats = {
  totalUsers: 1247,
  activeToday: 234,
  newThisWeek: 89,
  totalPosts: 3456,
  postsToday: 47,
  pendingReports: 12,
  resolvedReports: 156,
  activeListeners: 18,
  listenerRequests: 34,
  crisisAlerts: 2,
  flaggedPosts: 8,
  bannedUsers: 3,
};

export const demoMoodTrends = [
  { day: "Mon", hopeful: 45, lonely: 30, anxious: 25, healing: 20, exhausted: 15 },
  { day: "Tue", hopeful: 40, lonely: 35, anxious: 30, healing: 25, exhausted: 18 },
  { day: "Wed", hopeful: 50, lonely: 25, anxious: 20, healing: 30, exhausted: 12 },
  { day: "Thu", hopeful: 35, lonely: 40, anxious: 35, healing: 22, exhausted: 20 },
  { day: "Fri", hopeful: 42, lonely: 32, anxious: 28, healing: 26, exhausted: 16 },
  { day: "Sat", hopeful: 55, lonely: 20, anxious: 18, healing: 35, exhausted: 10 },
  { day: "Sun", hopeful: 48, lonely: 28, anxious: 22, healing: 30, exhausted: 14 },
];

export const demoGrowthData = [
  { date: "May 1", users: 980, posts: 2800 },
  { date: "May 5", users: 1020, posts: 2920 },
  { date: "May 10", users: 1080, posts: 3050 },
  { date: "May 15", users: 1130, posts: 3180 },
  { date: "May 20", users: 1180, posts: 3290 },
  { date: "May 25", users: 1220, posts: 3380 },
  { date: "May 27", users: 1247, posts: 3456 },
];

export const demoTopCategories = [
  { name: "Loneliness", count: 342, percentage: 28 },
  { name: "Separation", count: 278, percentage: 22 },
  { name: "Emotional Neglect", count: 234, percentage: 19 },
  { name: "Recovery", count: 198, percentage: 16 },
  { name: "Staying for Kids", count: 187, percentage: 15 },
];

export const demoRecentActivity = [
  { user: "QuietRiver", action: "Created a post", target: "in Toxic Marriage", time: "2 min ago" },
  { user: "HealingSoul", action: "Sent support", target: "to StillBreathing", time: "5 min ago" },
  { user: "BetterDaysAhead", action: "Joined room", target: "Silent Marriages", time: "8 min ago" },
  { user: "GentleStrength", action: "Commented", target: "on ConfusedSoul's post", time: "12 min ago" },
  { user: "SilentBloom", action: "Journal entry", target: "15-day streak", time: "15 min ago" },
  { user: "BraveHeart22", action: "Requested listener", target: "high urgency", time: "20 min ago" },
  { user: "LostInSilence", action: "Reported post", target: "for review", time: "25 min ago" },
  { user: "RebuildingSlowly", action: "Joined", target: "the community", time: "30 min ago" },
];

export type DemoUserComment = {
  id: number;
  postTitle: string;
  postAuthor: string;
  content: string;
  timeAgo: string;
  supportCount: number;
};

export const demoComments: DemoUserComment[] = [
  {
    id: 1,
    postTitle: "I stayed for ten years because I thought it was best for my kids.",
    postAuthor: "QuietRiver",
    content: "Reading this felt like reading my own life. Thank you for finding the words I couldn't. You're not alone.",
    timeAgo: "2 days ago",
    supportCount: 18,
  },
  {
    id: 2,
    postTitle: "My husband was in the room but never really there.",
    postAuthor: "HealingSoul",
    content: "The loneliness of being beside someone who isn't really with you — that's the loneliest there is. I see you.",
    timeAgo: "4 days ago",
    supportCount: 12,
  },
  {
    id: 3,
    postTitle: "Today I packed his things.",
    postAuthor: "StillBreathing",
    content: "You took one step today that future-you will thank you for. One breath, one step. We're here.",
    timeAgo: "1 week ago",
    supportCount: 24,
  },
  {
    id: 4,
    postTitle: "Co-parenting is harder than the divorce was.",
    postAuthor: "RebuildingHeart",
    content: "I'm five years in and it does get easier — not because the hurt fades, but because you build new muscles. Sending warmth.",
    timeAgo: "2 weeks ago",
    supportCount: 9,
  },
];

export type DemoSavedPost = {
  id: number;
  title: string;
  author: string;
  excerpt: string;
  category: string;
  savedAt: string;
};

export const demoSavedPosts: DemoSavedPost[] = [
  {
    id: 101,
    title: "I rebuilt my life at 42. It was terrifying and beautiful.",
    author: "BetterDaysAhead",
    excerpt: "The first year was survival. The second year was learning who I was. The third year, I started to feel like myself again.",
    category: "Healing Journey",
    savedAt: "saved 3 days ago",
  },
  {
    id: 102,
    title: "How I learned to forgive the version of me that stayed.",
    author: "GentleStrength",
    excerpt: "She wasn't weak. She was surviving. Looking back, I want to put my arm around her and tell her she did the best she could.",
    category: "Self-compassion",
    savedAt: "saved last week",
  },
  {
    id: 103,
    title: "Small rituals that helped me through the worst nights.",
    author: "SilentBloom",
    excerpt: "A warm cup of something. A jumper that smells like me. Sometimes a soft song. Tiny anchors when everything else feels untethered.",
    category: "Coping",
    savedAt: "saved 2 weeks ago",
  },
];

// Demo users for login. The email + password pairs are real-looking
// so testers can use them like credentials. Auth happens via demo mode
// (localStorage) — no DB call needed.
export const demoUsers = [
  {
    username: "QuietSoul",
    email: "demo@divorcetalk.in",
    password: "Demo@123",
    role: "user" as const,
    label: "Community member",
    bio: "Just here to find my footing.",
    isListener: false,
  },
  {
    username: "GentleEar",
    email: "listener@divorcetalk.in",
    password: "Demo@123",
    role: "moderator" as const,
    label: "Volunteer listener",
    bio: "Trained to hold space. No advice, just presence.",
    isListener: true,
  },
  {
    username: "SafeSpaceMod",
    email: "moderator@divorcetalk.in",
    password: "Demo@123",
    role: "moderator" as const,
    label: "Community moderator",
    bio: "Keeping this place soft for everyone.",
    isListener: false,
  },
  {
    username: "PlatformGuardian",
    email: "admin@divorcetalk.in",
    password: "Admin@123",
    role: "admin" as const,
    label: "Administrator",
    bio: "Platform guardian. Quietly keeping the lights on.",
    isListener: false,
  },
];
