import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Navbar from './components/Navbar';
import Services from './components/Services';
import Statement from './components/Statement';
import Work from './components/Work';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Statement />
        <About />
        <Work />
        <Services />
        <Marquee />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
