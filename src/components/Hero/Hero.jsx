import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import DotGrid from '../../reactbits/DotGrid/DotGrid';
import SplitText from '../../reactbits/SplitText/SplitText';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Hero = () => {
  const ref = useRef(null);
  const frameRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // o hero fica preso enquanto a seção seguinte sobe por cima; o conteúdo recua e esmaece
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ref.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
              pin: true,
              pinSpacing: false,
            },
          })
          .to(frameRef.current, { scale: 0.94, opacity: 0.35, ease: 'none' }, 0)
          .to(`.${styles.copy}`, { yPercent: -30, ease: 'none' }, 0);
      });
    },
    { scope: ref }
  );

  return (
    <section id="topo" ref={ref} className={styles.hero}>
      <div ref={frameRef} className={styles.frame}>
        <DotGrid
          className={styles.dots}
          dotSize={4}
          gap={22}
          baseColor="#cfcac1"
          activeColor="#111110"
          proximity={150}
          shockRadius={260}
          shockStrength={4}
          glow={0.2}
        />

        <span className={styles.scroll}>role</span>

        <div className={styles.copy}>
          <p className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            Disponível para trabalhar
          </p>
          <SplitText
            tag="h1"
            text="Desenvolvedora full-stack júnior."
            className={`${styles.title} display`}
            splitType="chars"
            mask
            trigger="load"
            from={{ yPercent: 110 }}
            to={{ yPercent: 0, delay: 1 }}
            ease="expo.out"
            duration={1.2}
            delay={18}
            accentColor="#8c877e"
            textAlign="left"
          />
          <SplitText
            tag="h2"
            text="Desenvolvo aplicações web completas, do front-end ao back-end, com React, TypeScript e Node.js."
            className={`${styles.line} ${styles.muted}`}
            splitType="chars"
            mask
            trigger="load"
            from={{ yPercent: 110 }}
            to={{ yPercent: 0, delay: 1.35 }}
            ease="expo.out"
            duration={1.2}
            delay={18}
            accentColor="#111110"
            textAlign="left"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
