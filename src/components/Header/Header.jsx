import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Header.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Contato' },
];

// largura que o nome ocupa no topo da página, antes de encolher
const bigScale = brand => {
  const share = window.innerWidth < 600 ? 0.74 : 0.42;
  return Math.max(1, (window.innerWidth * share) / brand.offsetWidth);
};

const Header = () => {
  const ref = useRef(null);
  const brandRef = useRef(null);

  useGSAP(
    () => {
      const brand = brandRef.current;
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // o nome começa grande sobre o hero e encolhe até o tamanho do header
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
      <a ref={brandRef} href="#topo" className={styles.brand}>
        Carol Sousa
      </a>

      <nav aria-label="Principal" className={styles.nav}>
        {links.map(link => (
          <a key={link.href} href={link.href} className="link-line">
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
