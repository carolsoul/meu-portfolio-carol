import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = () => {
  const { pathname, hash } = useLocation();

  // cada página nova começa do topo (links com #secao rolam até a seção)
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  // o ScrollTrigger mede as posições ao montar; se a altura da página muda depois (a fonte termina
  // de carregar, os cards empilhados se ajustam), as animações de rolagem disparariam fora do lugar
  useEffect(() => {
    let timer = 0;
    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    const observer = new ResizeObserver(refresh);
    observer.observe(document.body);
    document.fonts?.ready.then(refresh);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
