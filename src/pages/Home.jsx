import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Intro from '../components/Intro/Intro';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Projects from '../components/Projects/Projects';
import Contact from '../components/Contact/Contact';

const Home = () => {
  const { hash } = useLocation();

  // vindo de outra página com /#secao, rola até a seção depois que o layout do GSAP assenta
  useEffect(() => {
    if (!hash) return undefined;
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      document.getElementById(hash.slice(1))?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <>
      <Intro />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </>
  );
};

export default Home;
