import Navbar from "@/components/shared/Navbar";
import HeroCarousel from "@/components/home/HeroCarousel";
import StartHereStrip from "@/components/home/StartHereStrip";
import Ticker from "@/components/home/Ticker";
import MacbookSection from "@/components/home/MacbookSection";
import StatsBar from "@/components/home/StatsBar";
import StackingCards from "@/components/home/StackingCards";
import BentoGrid from "@/components/home/BentoGrid";
import Marquee from "@/components/home/Marquee";
import Articles from "@/components/home/Articles";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroCarousel />
      <StartHereStrip />
      <Ticker />
      <MacbookSection />
      <StatsBar />
      <StackingCards />
      <BentoGrid />
      <Marquee />
      <Articles />
      <FAQ />
      <Footer />
    </main>
  );
}