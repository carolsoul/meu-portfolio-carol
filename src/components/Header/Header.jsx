import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Header.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const links = [
  { to: '/#sobre', label: 'Sobre' },
  { to: '/projetos', label: 'Projetos' },
  { to: '/#contato', label: 'Contato' },
];

// largura que o nome ocupa no topo da página, antes de encolher
const bigScale = brand => {
  const share = window.innerWidth < 600 ? 0.74 : 0.42;
  return Math.max(1, (window.innerWidth * share) / brand.offsetWidth);
};

const Header = () => {
  const ref = useRef(null);
  const brandRef = useRef(null);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useGSAP(
    () => {
      const brand = brandRef.current;
      if (!isHome) return;
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // na home o nome começa grande sobre o hero e encolhe até o tamanho do header
        gsap.fromTo(
          brand,
          { scale: () => bigScale(brand) },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              start: 0,
              end: () => window.innerHeight * 0.55,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    },
    { scope: ref, dependencies: [isHome], revertOnUpdate: true }
  );

  useGSAP(
    () => {
      gsap.from(`.${styles.nav} a`, {
        yPercent: -120,
        opacity: 0,
        duration: 1,
        delay: 1.2,
        ease: 'expo.out',
        stagger: 0.06,
      });
    },
    { scope: ref }
  );

  return (
    <header ref={ref} className={styles.header}>
      <Link ref={brandRef} to="/#topo" className={styles.brand}>
        Carol Sousa
      </Link>

      <nav aria-label="Principal" className={styles.nav}>
        {links.map(link => (
          <Link key={link.to} to={link.to} className="link-line">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
