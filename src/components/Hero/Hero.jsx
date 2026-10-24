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
        // o hero fica preso enquanto a seção seguinte sobe por cima, e encolhe até virar um cartão
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
          .fromTo(
            frameRef.current,
            { clipPath: 'inset(0% 0% 0% 0% round 0px)' },
            { clipPath: 'inset(12% 6% 18% 6% round 12px)', ease: 'none' },
            0
          )
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
          <SplitText
            tag="h1"
            text="Desenvolvedora full-stack."
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
            text="Com foco em produtos web completos, da interface à API."
            className={`${styles.line} ${styles.muted} display`}
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
