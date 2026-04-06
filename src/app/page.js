import Image from "next/image";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import WhyChooseUs from "./components/WhyChooseUs";
import SafariExperiences from "./components/SafariExperiences";
import PremiumPackages from "./components/PremiumPackages";
import WildlifeHighlights from "./components/WildlifeHighlights";
import BestTimeToVisit from "./components/BestTimeToVisit";
import Testimonials from "./components/Testimonials";
import FinalCTA from "./components/FinalCTA";

export default function Home() {
  return (
  <>
  <Hero/>
  <AboutSection/>
  <WhyChooseUs/>
  <SafariExperiences/>
  <PremiumPackages/>
  <WildlifeHighlights/>
  <BestTimeToVisit/>
  <Testimonials/>
  <FinalCTA/>
  
  
  </>
  );
}
