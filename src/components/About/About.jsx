import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ScrollReveal from '../../reactbits/ScrollReveal/ScrollReveal';
import AnimatedContent from '../../reactbits/AnimatedContent/AnimatedContent';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const experience = {
  role: 'Programadora de Sistemas I (Trainee)',
  place: 'TO Brasil',
  period: 'dez 2025 a jul 2026',
  points: [
    'Atuei no projeto de migração da plataforma de atendimento ao cidadão do Rio de Janeiro (Portal 1746) para Salesforce, em ambiente ágil e com múltiplas partes interessadas.',
    'Fui responsável pelo acompanhamento financeiro de 4 contratos e pela produção de relatórios semanais de status para os clientes.',
    'Apresentei um estudo de caso sobre gestão de stakeholders para a equipe.',
  ],
};

const technologies = [
  'TypeScript',
  'JavaScript',
  'React',
  'Node.js',
  'Express',
  'APIs REST',
  'MySQL',
  'Firebase',
  'Tailwind CSS',
  'Jest',
  'Git e GitHub',
  'Figma',
];

// trechos do parágrafo que ganham marcação de caneta; o ScrollReveal avança a marcação junto com a revelação
const marks = [
  { text: 'TypeScript', className: 'mark-underline' },
  { text: 'testes automatizados', className: 'mark-highlight' },
];

const About = () => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // o card de destaque balança uma vez, como uma placa pendurada
        gsap
          .timeline({ scrollTrigger: { trigger: `.${styles.highlight}`, start: 'top 80%', once: true } })
          .fromTo(
            `.${styles.highlight}`,
            { rotation: -6 },
            { rotation: 4, duration: 0.35, ease: 'sine.inOut' }
          )
          .to(`.${styles.highlight}`, { rotation: -2.5, duration: 0.35, ease: 'sine.inOut' })
          .to(`.${styles.highlight}`, { rotation: 1, duration: 0.3, ease: 'sine.inOut' })
          .to(`.${styles.highlight}`, { rotation: 0, duration: 0.3, ease: 'sine.out' })
          .set(`.${styles.highlight}`, { clearProps: 'transform' });
      });
    },
    { scope: ref }
  );

  return (
    <section id="sobre" ref={ref} className={styles.about}>
      <AnimatedContent className={styles.heading} distance={40} duration={1.1}>
        <h2 className="heading-light">Sobre</h2>
      </AnimatedContent>

      <ScrollReveal
        tag="p"
        containerClassName={styles.text}
        baseOpacity={0.18}
        baseRotation={0}
        enableBlur={false}
        stagger={0.05}
        wordAnimationEnd="bottom 60%"
        marks={marks}
      >
        Sou desenvolvedora full-stack júnior, formada em Análise e Desenvolvimento de Sistemas. Desenvolvo aplicações web de ponta a ponta com React, TypeScript e Node.js, da interface ao banco de dados, com testes automatizados e atenção à experiência de quem usa.
      </ScrollReveal>

      <div className={styles.facts}>
        <AnimatedContent className={styles.block} distance={30} duration={1}>
          <h3 className={styles.label}>Experiência</h3>
          <p className={styles.jobHead}>
            <strong>{experience.role}</strong>, {experience.place}
          </p>
          <p className={styles.muted}>{experience.period}</p>
          <ul className={styles.points}>
            {experience.points.map(point => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </AnimatedContent>

        <div className={styles.block}>
          <h3 className={styles.label}>Destaque</h3>
          <Link to="/projetos/letrola" className={styles.highlight}>
            <span className={styles.highlightKicker}>Prêmio acadêmico</span>
            <span className={styles.highlightTitle}>Letrola</span>
            <span className={styles.highlightText}>
              Jogo educativo vencedor da competição acadêmica entre todos os campi da UNICSUL. Fui responsável pelo
              design e por todo o front-end.
            </span>
            <span className={styles.highlightMore}>Ver o projeto →</span>
          </Link>
        </div>

        <AnimatedContent className={`${styles.block} ${styles.wide}`} distance={30} duration={1} delay={0.1}>
          <h3 className={styles.label}>Tecnologias</h3>
          <ul className={styles.tech}>
            {technologies.map(tech => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </AnimatedContent>
      </div>
    </section>
  );
};

export default About;
