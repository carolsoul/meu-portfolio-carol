import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './LoadingPage.module.css';

// O prop onLoadingComplete será uma função chamada pelo App.jsx
// para nos avisar quando a animação de loading terminar.
const LoadingPage = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // A velocidade do contador

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={styles.loadingContainer}
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      // onAnimationComplete é o gatilho para desmontar o componente
      onAnimationComplete={() => {
        if (progress === 100) {
          onLoadingComplete();
        }
      }}
    >
      <h1 className={styles.counter}>{progress}%</h1>
    </motion.div>
  );
};

export default LoadingPage;