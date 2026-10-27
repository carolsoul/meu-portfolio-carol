import ScrollReveal from '../../reactbits/ScrollReveal/ScrollReveal';
import AnimatedContent from '../../reactbits/AnimatedContent/AnimatedContent';
import styles from './About.module.css';

const experience = [
  {
    role: 'Programadora de Sistemas I (Trainee)',
    place: 'TO Brasil',
    period: 'dez 2025 a jul 2026',
    detail:
      'Migração da plataforma de atendimento ao cidadão do Rio de Janeiro (Portal 1746) para Salesforce, com automações e jornadas no Salesforce Marketing Cloud.',
  },
  {
    role: 'Jovem Aprendiz',
    place: 'Mercado Livre',
    period: 'fev a abr 2025',
    detail: 'Mapeamento do processo de Outbound e padronização de checklists e controles de auditoria.',
  },
];

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
  'Salesforce Marketing Cloud',
];

const About = () => {
  return (
    <section id="sobre" className={styles.about}>
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
      >
        Sou desenvolvedora full-stack júnior, formada em Análise e Desenvolvimento de Sistemas. Construo aplicações de ponta a ponta com React, TypeScript e Node.js, da interface ao banco de dados, com testes automatizados e cuidado com o design.
      </ScrollReveal>

      <div className={styles.facts}>
        <AnimatedContent className={styles.block} distance={30} duration={1}>
          <h3 className={styles.label}>Experiência</h3>
          <ul className={styles.list}>
            {experience.map(item => (
              <li key={item.place} className={styles.job}>
                <p className={styles.jobHead}>
                  <strong>{item.role}</strong>, {item.place}
                </p>
                <p className={styles.muted}>{item.period}</p>
                <p className={styles.jobDetail}>{item.detail}</p>
              </li>
            ))}
          </ul>
        </AnimatedContent>

        <AnimatedContent className={styles.block} distance={30} duration={1} delay={0.08}>
          <h3 className={styles.label}>Destaque</h3>
          <p>
            <strong>Letrola</strong> venceu a competição acadêmica entre todos os campi da UNICSUL. Fiz todo o design e o
            front-end do jogo.
          </p>

          <h3 className={`${styles.label} ${styles.spaced}`}>Formação</h3>
          <p>
            Análise e Desenvolvimento de Sistemas, Universidade Cruzeiro do Sul
            <span className={styles.muted}> · concluído em 2025</span>
          </p>

          <h3 className={`${styles.label} ${styles.spaced}`}>Idiomas</h3>
          <p>Inglês avançado (C1)</p>
        </AnimatedContent>

        <AnimatedContent className={`${styles.block} ${styles.wide}`} distance={30} duration={1} delay={0.16}>
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
