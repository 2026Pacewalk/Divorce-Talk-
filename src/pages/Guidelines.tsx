import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";

const sections = [
  {
    title: "Our Promise",
    content:
      "DivorceTalk.in exists to provide a safe, anonymous space for people navigating divorce, separation, and emotional rebuilding. We promise to maintain a compassionate, judgment-free environment where every voice is heard and respected. This platform is built on the belief that healing happens through human connection, and that no one should walk through heartbreak alone.",
  },
  {
    title: "Be Kind",
    content:
      "Every interaction on this platform should come from a place of kindness and empathy. We do not tolerate harassment, bullying, hate speech, or any form of discriminatory language. Remember that behind every anonymous username is a real person going through genuine pain. Offer support, not judgment. Share wisdom, not criticism. When responding to someone's vulnerability, ask yourself: 'Will this help them heal?'",
  },
  {
    title: "Stay Anonymous",
    content:
      "Anonymity is the foundation of our community. Do not share personally identifying information about yourself or others — including real names, addresses, phone numbers, workplaces, or social media profiles. This protects everyone and maintains the safe space we've built together. If you recognize someone's story, keep it confidential.",
  },
  {
    title: "What We Don't Allow",
    content:
      "To keep our community safe, we do not allow: harassment or bullying of any kind, hate speech or discriminatory content, explicit or sexually suggestive material, graphic self-harm content, spam or promotional content, legal advice (we are not lawyers), medical advice (we are not doctors), conspiracy theories or misinformation, or content that encourages violence or illegal activity.",
  },
  {
    title: "Reporting",
    content:
      "If you see content that violates these guidelines, please report it immediately. Our moderation team reviews all reports within 24 hours. You can report posts, comments, or users by clicking the report button. All reports are confidential — the person you're reporting will not know who reported them. False reports may result in account restrictions.",
  },
  {
    title: "Consequences",
    content:
      "Violations of our guidelines may result in: content removal, temporary muting, account suspension, or permanent banning. The severity of the consequence depends on the nature of the violation and the user's history. We believe in rehabilitation, but we prioritize community safety above all. Moderators have final say in all decisions.",
  },
];

export default function Guidelines() {
  return (
    <div className="min-h-screen bg-[var(--dt-bg)]">
      <Navbar />
      <main className="pt-[88px] px-4 sm:px-6 md:px-12 pb-12 sm:pb-16">
        <div className="max-w-[800px] mx-auto">
          <h1 className="font-serif text-[36px] md:text-[48px] text-[var(--dt-text)]">
            Community Guidelines
          </h1>
          <p className="text-[13px] text-[var(--dt-text-muted)] mt-2">
            Last updated: January 2025
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="font-serif text-[22px] text-[var(--dt-text)] mb-3">
                  {section.title}
                </h2>
                <p className="text-[15px] text-[var(--dt-text-secondary)] leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
