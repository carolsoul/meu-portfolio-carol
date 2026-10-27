import { Link } from 'react-router-dom';
import { channels } from '../Contact/channels';
import styles from './Footer.module.css';

const sections = [
  { to: '/#topo', label: 'Início' },
  { to: '/#sobre', label: 'Sobre' },
  { to: '/projetos', label: 'Projetos' },
  { to: '/#contato', label: 'Contato' },
];

// fica preso no fundo da página e é revelado quando o conteúdo sobe
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <nav aria-label="Rodapé" className={styles.column}>
          <p className={styles.title}>Navegação</p>
          {sections.map(item => (
            <Link key={item.to} to={item.to} className="link-line">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.column}>
          <p className={styles.title}>Redes</p>
          {channels.map(channel => (
            <a key={channel.label} href={channel.href} target="_blank" rel="noopener noreferrer" className="link-line">
              {channel.label}
            </a>
          ))}
        </div>

        <div className={styles.column}>
          <p className={styles.title}>Localização</p>
          <p>São Paulo, Brasil</p>
        </div>
      </div>

      <div className={styles.nameWrap}>
        <p className={`${styles.name} display`} aria-hidden="true">
          Carol Sousa
        </p>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Carol Sousa</p>
      </div>
    </footer>
  );
};

export default Footer;
