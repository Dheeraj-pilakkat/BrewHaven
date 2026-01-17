import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Process from "@/components/Process";
import ShopPreview from "@/components/ShopPreview";
import Testimonials from "@/components/Testimonials";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen grainy">
      <Navbar />
      <Hero />
      <Process />
      <Features />
      <ShopPreview />
      <Locations />
      <Testimonials />
      <Footer />
    </main>
  );
}
