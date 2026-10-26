import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = () => {
  const { pathname, hash } = useLocation();

  // cada página nova começa do topo (links com #secao rolam até a seção)
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

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
