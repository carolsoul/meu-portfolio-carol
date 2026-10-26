import ScrollReveal from '../../reactbits/ScrollReveal/ScrollReveal';
import AnimatedContent from '../../reactbits/AnimatedContent/AnimatedContent';
import CopyEmail from '../CopyEmail/CopyEmail';
import { email } from './channels';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <section id="contato" className={styles.contact}>
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
        <AnimatedContent className={styles.heading} distance={40} duration={1.1}>
          <h3 className="heading-light">Contato</h3>
        </AnimatedContent>

        <AnimatedContent className={styles.body} distance={30} duration={1} stagger={0.1}>
          <p>
            Tem uma ideia, uma vaga ou um projeto em andamento? Me mande uma mensagem e eu respondo assim que puder.
          </p>
          <div className={styles.actions}>
            <a href={`mailto:${email}`} className="pill">
              Me mande um e-mail
            </a>
            <CopyEmail email={email} />
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
};

export default Contact;
