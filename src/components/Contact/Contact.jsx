import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ScrollReveal from '../../reactbits/ScrollReveal/ScrollReveal';
import AnimatedContent from '../../reactbits/AnimatedContent/AnimatedContent';
import CopyEmail from '../CopyEmail/CopyEmail';
import { email } from './channels';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Contact = () => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // a caneta contorna "Contato" conforme a rolagem: começa com a palavra já na tela
        // (sem fade de entrada) e fecha o círculo quando ela chega perto do meio
        gsap.fromTo(
          `.${styles.circle} path`,
          { strokeDashoffset: 100 },
          {
            strokeDashoffset: 0,
            // sem o autoRound o GSAP arredonda o valor em px e o traço salta de vazio para completo
            autoRound: false,
            ease: 'none',
            scrollTrigger: { trigger: `.${styles.heading}`, start: 'top 80%', end: 'top 35%', scrub: 0.3 },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section id="contato" ref={ref} className={styles.contact}>
      <ScrollReveal
        tag="h2"
        containerClassName={`${styles.statement} display`}
        baseOpacity={0.12}
        baseRotation={0}
        enableBlur={false}
        stagger={0.08}
        wordAnimationEnd="bottom 65%"
      >
        Vamos construir algo juntos?
      </ScrollReveal>

      <div className={styles.details}>
        <div className={styles.heading}>
          <h3 className={`heading-light ${styles.circled}`}>
            Contato
            <svg className={styles.circle} viewBox="0 0 220 90" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M168 14 C118 2 40 6 16 34 C-2 56 52 82 120 79 C178 76 214 58 206 35 C199 15 152 6 96 10"
                pathLength="100"
              />
            </svg>
          </h3>
        </div>

        <AnimatedContent className={styles.body} distance={30} duration={1} stagger={0.1}>
          <p>
            Estou disponível para oportunidades como desenvolvedora full-stack júnior. Envie uma mensagem e retorno em breve.
          </p>
          <div className={styles.actions}>
            <a href={`mailto:${email}`} className="pill">
              Enviar e-mail
            </a>
            <CopyEmail email={email} />
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
};

export default Contact;
