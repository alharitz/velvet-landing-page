import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Benefits from "@/components/Benefits";
import FeaturedCollection from "@/components/FeaturedCollection";
import BrowseByCategory from "@/components/BrowseByCategory";
import BrandStory from "@/components/BrandStory";
import Craft from "@/components/Craft";
import FabricLibrary from "@/components/FabricLibrary";
import Process from "@/components/Process";
import Lookbook from "@/components/Lookbook";
import Journal from "@/components/Journal";
import Testimonials from "@/components/Testimonials";
import WhereToBuy from "@/components/WhereToBuy";
import VisitUs from "@/components/VisitUs";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Benefits />
        <section id="collection" className="scroll-mt-24">
          <FeaturedCollection />
        </section>
        <BrowseByCategory />
        <section id="story" className="scroll-mt-24">
          <BrandStory />
        </section>
        <section id="craft" className="scroll-mt-24">
          <Craft />
        </section>
        <FabricLibrary />
        <Process />
        <Lookbook />
        <section id="journal" className="scroll-mt-24">
          <Journal />
        </section>
        <Testimonials />
        <section id="where-to-buy" className="scroll-mt-24">
          <WhereToBuy />
        </section>
        <section id="visit" className="scroll-mt-24">
          <VisitUs />
        </section>
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
