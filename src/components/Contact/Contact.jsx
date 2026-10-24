import SplitText from '../../reactbits/SplitText/SplitText';
import AnimatedContent from '../../reactbits/AnimatedContent/AnimatedContent';
import styles from './Contact.module.css';

const email = 'carolannago2005@gmail.com';

const channels = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5511962237927?text=Ol%C3%A1%2C%20vim%20pelo%20seu%20portf%C3%B3lio%21',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/anna-caroline-gon%C3%A7alves-9624262b0/',
  },
  { label: 'GitHub', href: 'https://github.com/carolsoul' },
  { label: 'Currículo (PDF)', href: './CURRICULO_ANNA.pdf' },
];

const Contact = () => {
  return (
    <section id="contato" className={styles.contact}>
      <AnimatedContent className={`${styles.heading} label`} distance={20} duration={0.9}>
        <span>Contato</span>
        <span className={styles.muted}>(03)</span>
      </AnimatedContent>

      <SplitText
        tag="h2"
        text="Vamos construir algo juntos?"
        className={styles.title}
        splitType="words"
        mask
        from={{ yPercent: 110 }}
        to={{ yPercent: 0 }}
        ease="expo.out"
        duration={1.4}
        delay={80}
        textAlign="left"
      />

      <div className={styles.details}>
        <AnimatedContent className={styles.lead} distance={24} duration={1}>
          <p>
            Tem uma ideia, uma vaga ou um projeto em andamento? Me mande uma mensagem e eu respondo assim que puder.
          </p>
        </AnimatedContent>

        <AnimatedContent className={styles.mailWrap} distance={32} duration={1.1} delay={0.1}>
          <a href={`mailto:${email}`} className={`${styles.mail} link-line`}>
            {email}
          </a>
        </AnimatedContent>

        <AnimatedContent className={styles.channels} distance={20} duration={0.9} stagger={0.06}>
          {channels.map(channel => (
            <a
              key={channel.label}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.channel} label`}
            >
              <span className="link-line">{channel.label}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </AnimatedContent>
      </div>
    </section>
  );
};

export default Contact;
