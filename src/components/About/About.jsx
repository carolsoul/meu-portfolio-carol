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
        Sou desenvolvedora full-stack, formada em Análise e Desenvolvimento de Sistemas. Crio aplicações de ponta a ponta com React, TypeScript e Node.js, da interface responsiva à API e ao banco de dados, com código limpo e testado.
      </ScrollReveal>
    </section>
  );
};

export default About;
