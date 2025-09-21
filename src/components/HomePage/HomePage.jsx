import styles from './HomePage.module.css';
import Ballpit from './Ballpit';

const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.background}>
        <Ballpit />
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