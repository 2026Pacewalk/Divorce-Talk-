import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import EmotionalEntryPaths from "@/sections/EmotionalEntryPaths";
import WhyExists from "@/sections/WhyExists";
import PreviewFeed from "@/sections/PreviewFeed";
import Categories from "@/sections/Categories";
import Values from "@/sections/Values";
import FinalCTA from "@/sections/FinalCTA";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--dt-bg)]">
      <Navbar />
      <Hero />
      <EmotionalEntryPaths />
      <WhyExists />
      <PreviewFeed />
      <Categories />
      <Values />
      <FinalCTA />
      <Footer />
    </div>
  );
}
