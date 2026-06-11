import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import { Heart, Eye, Shield, Users, MessageCircle } from "lucide-react";

const values = [
  { icon: Heart, title: "Compassion First", desc: "Every interaction is rooted in empathy and kindness. We lead with our hearts." },
  { icon: Eye, title: "Radical Anonymity", desc: "Your identity is yours alone. We collect no real names, no tracking, no surveillance." },
  { icon: Shield, title: "Emotional Safety", desc: "AI moderation + human oversight ensures a protected environment 24/7." },
  { icon: Users, title: "Community Healing", desc: "Healing happens in connection. You're not broken — you're human, and you're not alone." },
  { icon: MessageCircle, title: "Honest Conversations", desc: "Say what you cannot say elsewhere. This is your space to be completely honest." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--dt-bg)]">
      <Navbar />
      <main className="pt-[88px] px-4 sm:px-6 md:px-12 pb-12 sm:pb-16">
        <div className="max-w-[800px] mx-auto">
          {/* Hero */}
          <div className="text-center py-16">
            <p className="text-[12px] font-medium text-[var(--dt-primary)] uppercase tracking-[0.1em] mb-4">
              About DivorceTalk.in
            </p>
            <h1 className="font-serif text-[32px] md:text-[44px] text-[var(--dt-text)] leading-[1.2]">
              Not every relationship should end. But every difficult relationship deserves support.
            </h1>
          </div>

          {/* Mission */}
          <div className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-8 md:p-10 shadow-dt-sm mb-10">
            <h2 className="font-serif text-[22px] text-[var(--dt-text)] mb-4">Why we exist</h2>
            <div className="space-y-4 text-[15px] text-[var(--dt-text-secondary)] leading-relaxed">
              <p>
                DivorceTalk.in was born from a simple, painful observation: people going through
                relationship distress have nowhere safe to turn. They post cryptic messages on social
                media. They suffer in silence. They carry emotional weight that no one sees.
              </p>
              <p>
                We're not pro-divorce. We're not anti-marriage. We're pro-human. We believe that
                every person navigating relationship difficulty — whether they're staying, leaving,
                or simply unsure — deserves a space to be heard without judgment.
              </p>
              <p>
                This platform exists for the 3 AM thoughts you can't share. For the conversations
                you're afraid to have. For the emotions that feel too heavy to carry alone. We're
                building a quiet shelter on the internet where healing can begin.
              </p>
            </div>
          </div>

          {/* Values */}
          <h2 className="font-serif text-[22px] text-[var(--dt-text)] mb-6">What we believe</h2>
          <div className="space-y-4 mb-10">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="flex items-start gap-4 bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-xl p-5 shadow-dt-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--dt-primary-light)] flex items-center justify-center flex-shrink-0">
                  <v.icon size={18} className="text-[var(--dt-primary)]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-medium text-[var(--dt-text)]">{v.title}</h3>
                  <p className="text-[14px] text-[var(--dt-text-secondary)] mt-1 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Promise */}
          <div className="bg-gradient-to-br from-[var(--dt-primary-light)] to-[var(--dt-secondary-light)] rounded-2xl p-8 text-center">
            <h2 className="font-serif text-[22px] text-[var(--dt-text)] mb-3">
              Our Promise to You
            </h2>
            <p className="text-[15px] text-[var(--dt-text-secondary)] leading-relaxed max-w-[500px] mx-auto">
              We will always prioritize your emotional safety. We will never compromise your
              anonymity. We will never monetize your pain. We will always be here, quietly,
              holding space for you to heal.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
