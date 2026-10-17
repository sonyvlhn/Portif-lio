import About from "@/components/About";
import Background from "@/components/Background";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";
import Skills from "@/components/Skills";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <Background />
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main className="overflow-x-clip">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
