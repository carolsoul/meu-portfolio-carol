import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './LoadingPage.module.css';

// o prop onLoadingComplete será uma função chamada pelo App.
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
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={styles.loadingContainer}
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      // onAnimationComplete é o trigger para desmontar o componente
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