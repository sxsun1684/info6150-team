import HeroSection from "../components/home/HeroSection";
import FeatureCards from "../components/home/FeatureCards";
import HowItWorks from "../components/home/HowItWorks";
import WhyWe from "../components/home/WhyWe";
import Footer from "../components/home/Footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center px-8 py-16">
      <HeroSection />
      <FeatureCards />
      <HowItWorks />
      <WhyWe />
      <Footer />
    </div>
  );
}
