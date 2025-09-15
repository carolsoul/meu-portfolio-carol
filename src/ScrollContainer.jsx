import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import HomePage from './components/HomePage/HomePage';
import AboutPage from './components/AboutPage/AboutPage';

const ScrollContainer = () => {
  // 1. O ref agora é para o 'div' que serve de gatilho para a animação.
  const animationTriggerRef = useRef(null);

  // 2. useScroll agora monitora o gatilho. O progresso (0 a 1) será
  //    completo quando o usuário rolar 100vh.
  const { scrollYProgress } = useScroll({
    target: animationTriggerRef,
    // offset define o início e o fim da animação em relação ao viewport.
    // 'start start' = quando o topo do elemento atinge o topo do viewport.
    // 'end start' = quando o fundo do elemento atinge o topo do viewport.
    offset: ['start start', 'end start'],
  });

  // 3. As transformações continuam as mesmas, mas agora são baseadas
  //    no scroll do div de gatilho.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 80]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const pointerEvents = useTransform(scrollYProgress, (latest) =>
    latest >= 1 ? 'none' : 'auto'
  );
  
  return (
    // Usamos um fragmento ou um <div> principal simples.
    <>
      {/* 4. O OVERLAY FIXO: HomePage é renderizado fora do fluxo normal */}
      {/* Ele fica fixo na tela e sua animação é controlada pelo scroll. */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          // Aplicamos as animações aqui
          scale,
          opacity,
          pointerEvents,
        }}
      >
        <HomePage />
      </motion.div>

      {/* 5. O GATILHO DA ANIMAÇÃO: Um div invisível que define a "duração" do scroll da animação. */}
      {/* Ao rolar por este div, o scrollYProgress vai de 0 a 1. */}
      <div ref={animationTriggerRef} style={{ height: '100vh' }} />

      {/* 6. O CONTEÚDO REAL: AboutPage é renderizada como um elemento normal. */}
      {/* Ela pode ter a altura que precisar e terá sua própria barra de rolagem. */}
      {/* O z-index garante que ela fique abaixo do overlay da HomePage. */}
      <div style={{ position: 'relative', zIndex: 5, background: '#000' }}>
        <AboutPage />
      </div>
    </>
  );
};

export default ScrollContainer;