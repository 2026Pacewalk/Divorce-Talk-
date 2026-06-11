import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";

const sections = [
  {
    title: "Emotional Safety First",
    content:
      "Your emotional wellbeing is our highest priority. This platform is designed to be a soft landing during a hard time. We use AI-assisted moderation to detect potentially harmful content, combined with human moderators who understand the nuances of emotional support. Every post is scanned for crisis indicators, and we have protocols in place to connect users with professional help when needed.",
  },
  {
    title: "Crisis Resources",
    content:
      "If you or someone you know is in immediate danger, please contact emergency services (112) immediately. For emotional crises, the Mental Health Helpline (1860-2662-345) is available 24/7. We've partnered with crisis counseling organizations to ensure that help is always within reach. You can find all emergency numbers on our Emergency Help page.",
  },
  {
    title: "Our Moderation Approach",
    content:
      "We use a combination of automated tools and human moderators to keep our community safe. Our AI flags potentially harmful content, but human moderators make all final decisions. We prioritize empathy over enforcement — our goal is to educate and support, not to punish. Moderators are trained in mental health first aid and crisis intervention.",
  },
  {
    title: "Emergency Protocols",
    content:
      "If our system detects content indicating imminent self-harm or danger to others, we have protocols to: display crisis resources directly to the user, notify trained volunteer responders, and in extreme cases, work with authorities to ensure safety. These protocols are designed to balance privacy with the duty to protect life.",
  },
  {
    title: "Self-Care Reminders",
    content:
      "We encourage all community members to practice self-care: take breaks from the platform when needed, seek professional therapy alongside peer support, maintain offline connections with friends and family, and remember that healing is not linear. The platform includes gentle reminders to check in with yourself and take care of your physical and emotional needs.",
  },
];

export default function Safety() {
  return (
    <div className="min-h-screen bg-[var(--dt-bg)]">
      <Navbar />
      <main className="pt-[88px] px-4 sm:px-6 md:px-12 pb-12 sm:pb-16">
        <div className="max-w-[800px] mx-auto">
          <h1 className="font-serif text-[36px] md:text-[48px] text-[var(--dt-text)]">
            Safety Policy
          </h1>
          <p className="text-[13px] text-[var(--dt-text-muted)] mt-2">
            How we keep you safe
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
