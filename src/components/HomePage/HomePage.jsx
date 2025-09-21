import styles from './HomePage.module.css';
import Ballpit from './Ballpit';

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.background}>
        {!isMobile && <Ballpit />}
      </div>
      <div className={styles.content}>
        <h1 className={styles.name}>Carol <br />Sousa</h1>
        <div className={styles.footer}>
          <p>Desenvolvedora Front-end</p>
          <img src="./star.svg" alt="" className={styles.star} />
          <p>São Paulo, Brasil</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;