import { useEffect, useState } from 'react';
import AnimatedContent from '../../reactbits/AnimatedContent/AnimatedContent';
import styles from './Header.module.css';

const timeFormat = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'America/Sao_Paulo',
  hour: '2-digit',
  minute: '2-digit',
});

const currentTime = () => timeFormat.format(new Date());

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Contato' },
];

const Header = () => {
  const [time, setTime] = useState(currentTime);

  useEffect(() => {
    const interval = setInterval(() => setTime(currentTime()), 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={styles.header}>
      <AnimatedContent
        trigger="mount"
        className={`${styles.bar} label`}
        distance={14}
        reverse
        duration={1}
        delay={0.9}
        stagger={0.08}
      >
        <a href="#topo" className={`${styles.brand} link-line`}>Carol Sousa</a>

        <p className={styles.clock}>
          São Paulo <time>{time}</time>
        </p>

        <nav aria-label="Principal" className={styles.nav}>
          {links.map(link => (
            <a key={link.href} href={link.href} className="link-line">
              {link.label}
            </a>
          ))}
        </nav>
      </AnimatedContent>
    </header>
  );
};

export default Header;
