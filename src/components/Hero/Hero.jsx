import SplitText from '../../reactbits/SplitText/SplitText';
import ScrollReveal from '../../reactbits/ScrollReveal/ScrollReveal';
import AnimatedContent from '../../reactbits/AnimatedContent/AnimatedContent';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section id="topo" className={styles.hero}>
      <div className={styles.intro}>
        <ScrollReveal
          tag="p"
          containerClassName={styles.statement}
          mode="enter"
          effect="rise"
          splitBy="lines"
          stagger={0.1}
          duration={1}
          delay={0.5}
          baseOpacity={0}
          baseRotation={0}
          enableBlur={false}
        >
          Desenvolvedora front-end em São Paulo. Construo interfaces claras, responsivas e cuidadas até o último detalhe.
        </ScrollReveal>
      </div>

      <AnimatedContent
        trigger="mount"
        className={`${styles.meta} label`}
        distance={16}
        duration={1}
        delay={0.8}
        stagger={0.08}
      >
        <span>Front-end</span>
        <span>São Paulo, Brasil</span>
        <span className={styles.metaHide}>Aberta a novos projetos</span>
        <a href="#sobre" className={`${styles.scroll} link-line`}>Role para ver mais</a>
      </AnimatedContent>

      <div className={styles.nameWrap}>
        <SplitText
          tag="h1"
          text="Carol Sousa"
          className={styles.name}
          splitType="chars"
          mask
          trigger="load"
          from={{ yPercent: 110 }}
          to={{ yPercent: 0 }}
          ease="expo.out"
          duration={1.5}
          delay={45}
          textAlign="left"
        />
      </div>
    </section>
  );
};

export default Hero;
