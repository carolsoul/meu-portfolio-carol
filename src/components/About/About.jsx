import ScrollReveal from '../../reactbits/ScrollReveal/ScrollReveal';
import AnimatedContent from '../../reactbits/AnimatedContent/AnimatedContent';
import styles from './About.module.css';

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
        Sou estudante de Análise e Desenvolvimento de Sistemas e desenvolvedora front-end. Transformo layouts em interfaces rápidas, acessíveis e responsivas, com código limpo e atenção a cada detalhe.
      </ScrollReveal>
    </section>
  );
};

export default About;
