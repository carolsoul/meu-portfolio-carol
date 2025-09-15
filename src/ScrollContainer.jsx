import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import HomePage from './components/HomePage/HomePage';
import AboutPage from './components/AboutPage/AboutPage';

const ScrollContainer = () => {
  // ref é para o 'div' que serve de gatilho para a animação.
  const animationTriggerRef = useRef(null);

  // useScroll monitora o trigger. O progresso (0 a 1) será
  //    completo quando o rolar 100vh.
  const { scrollYProgress } = useScroll({
    target: animationTriggerRef,
    // offset define o início e o fim da animação em relação ao viewport.
    // 'start start' = quando o topo do elemento atinge o topo do viewport.
    // 'end start' = quando o fundo do elemento atinge o topo do viewport.
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 80]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const pointerEvents = useTransform(scrollYProgress, (latest) =>
    latest >= 1 ? 'none' : 'auto'
  );
  
  return (
    <>
      {/* O OVERLAY FIXO (HomePage é renderizado fora do fluxo normal) */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          scale,
          opacity,
          pointerEvents,
        }}
      >
        <HomePage />
      </motion.div>

      {/*div invisível que define a "duração" do scroll da animação. */}
      <div ref={animationTriggerRef} style={{ height: '100vh' }} />

      <div style={{ position: 'relative', zIndex: 5, background: '#000', overflowX: 'hidden' }}>
        <AboutPage />
      </div>
    </>
  );
};

export default ScrollContainer;