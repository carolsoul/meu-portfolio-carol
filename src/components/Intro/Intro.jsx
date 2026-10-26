import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Intro.module.css';

gsap.registerPlugin(useGSAP);

const COLUMNS = 7;

// a entrada roda só na primeira visita à home, não a cada volta de outra página
let played = false;

// cortina preta em colunas que sai em escada, da direita para a esquerda
const Intro = () => {
  const ref = useRef(null);
  const [skip] = useState(() => played);

  useGSAP(
    () => {
      if (skip) return;
      played = true;
      const columns = gsap.utils.toArray(`.${styles.column}`);
      const done = () => gsap.set(ref.current, { display: 'none' });

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        done();
        return;
      }

      gsap.to(columns, {
        scaleY: 0,
        duration: 0.9,
        delay: 0.25,
        ease: 'power4.inOut',
        stagger: { each: 0.08, from: 'end' },
        onComplete: done,
      });
    },
    { scope: ref }
  );

  if (skip) return null;

  return (
    <div ref={ref} className={styles.intro} aria-hidden="true">
      {Array.from({ length: COLUMNS }, (_, i) => (
        <span key={i} className={styles.column} />
      ))}
    </div>
  );
};

export default Intro;
