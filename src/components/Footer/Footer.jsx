import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={`${styles.footer} label`}>
      <p>© {new Date().getFullYear()} Carol Sousa</p>
      <p className={styles.made}>Feito em São Paulo com React e GSAP</p>
      <a href="#topo" className={`${styles.top} link-line`}>Voltar ao topo</a>
    </footer>
  );
};

export default Footer;
