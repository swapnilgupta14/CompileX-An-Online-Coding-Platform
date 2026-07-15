import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { LogoCloud } from "@/components/marketing/LogoCloud";
import { Features } from "@/components/marketing/Features";
import { Showcase } from "@/components/marketing/Showcase";
import { Stats } from "@/components/marketing/Stats";
import { Timeline } from "@/components/marketing/Timeline";
import { Testimonials } from "@/components/marketing/Testimonials";
import { FAQ } from "@/components/marketing/FAQ";
import { CTA } from "@/components/marketing/CTA";
import { Footer } from "@/components/marketing/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <LogoCloud />
        <Features />
        <Showcase />
        <Stats />
        <Timeline />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
