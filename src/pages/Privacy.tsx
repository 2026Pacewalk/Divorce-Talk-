import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";

const sections = [
  {
    title: "Data Collection",
    content:
      "We collect minimal data to operate the platform: your chosen username (never your real name), optional email for account recovery, your posts and comments (which you can delete), and basic usage analytics to improve the platform. We do not collect IP addresses, device information, or browsing history. We believe your data belongs to you.",
  },
  {
    title: "Anonymity",
    content:
      "Anonymity is our core principle. We never require real names, photos, or identifying information. All posts default to anonymous. We use encryption for all data transmission and storage. Even our team cannot link anonymous accounts to real identities. We regularly audit our systems to ensure anonymity protection.",
  },
  {
    title: "Cookies",
    content:
      "We use only essential cookies to keep you signed in and remember your preferences. We do not use tracking cookies, advertising cookies, or third-party analytics. You can clear your cookies at any time without losing access to the platform.",
  },
  {
    title: "Data Sharing",
    content:
      "We do not sell, rent, or share your data with third parties. Period. The only exception is if we are legally compelled to disclose information by a court order — and even then, we have very little identifiable information to share. We have never received a government data request.",
  },
  {
    title: "Your Rights",
    content:
      "You have the right to: access your data, delete your account and all associated data, export your posts, and opt out of all non-essential communications. To exercise these rights, contact us at privacy@divorcetalk.in. We process all requests within 30 days.",
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[var(--dt-bg)]">
      <Navbar />
      <main className="pt-[88px] px-4 sm:px-6 md:px-12 pb-12 sm:pb-16">
        <div className="max-w-[800px] mx-auto">
          <h1 className="font-serif text-[36px] md:text-[48px] text-[var(--dt-text)]">
            Privacy Policy
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
