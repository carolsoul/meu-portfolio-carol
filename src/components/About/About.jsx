import ScrollReveal from '../../reactbits/ScrollReveal/ScrollReveal';
import AnimatedContent from '../../reactbits/AnimatedContent/AnimatedContent';
import styles from './About.module.css';

const About = () => {
  return (
    <section id="sobre" className={styles.about}>
      <AnimatedContent className={`${styles.heading} label`} distance={20} duration={0.9}>
        <h2 className={styles.title}>Sobre</h2>
        <span className={styles.index}>(01)</span>
      </AnimatedContent>

      <ScrollReveal
        tag="p"
        containerClassName={styles.text}
        baseOpacity={0.14}
        baseRotation={0}
        enableBlur={false}
        stagger={0.06}
        wordAnimationEnd="bottom 62%"
      >
        Sou estudante de Análise e Desenvolvimento de Sistemas e desenvolvedora front-end. Transformo layouts em interfaces rápidas, acessíveis e responsivas, com código limpo e atenção a cada detalhe.
      </ScrollReveal>
    </section>
  );
};

export default About;
