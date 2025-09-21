import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AboutPage.module.css';
import BlurText from '../AboutPage/BlurText';

const AboutPage = () => {

  const navigate = useNavigate();

  // Componente Magnet
  const Magnet = ({
    children,
    padding = 100,
    disabled = false,
    magnetStrength = 2,
    activeTransition = "transform 0.3s ease-out",
    inactiveTransition = "transform 0.5s ease-in-out",
    wrapperClassName = "",
    innerClassName = "",
    ...props
  }) => {
    const magnetRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
      if (disabled) return;

      const handleMouseMove = (e) => {
        const el = magnetRef.current;
        if (!el) return;

        const { left, top, width, height } = el.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distX = Math.abs(e.clientX - centerX);
        const distY = Math.abs(e.clientY - centerY);

        if (distX < width / 2 + padding && distY < height / 2 + padding) {
          setIsActive(true);
          setPosition({
            x: (e.clientX - centerX) / magnetStrength,
            y: (e.clientY - centerY) / magnetStrength,
          });
        } else {
          setIsActive(false);
          setPosition({ x: 0, y: 0 });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, [disabled, padding, magnetStrength]);

    const style = {
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: isActive ? activeTransition : inactiveTransition,
    };
    return (
      <div className={`magnet-wrapper ${wrapperClassName}`} ref={magnetRef} {...props}>
        <div className={`magnet-inner ${innerClassName}`} style={style}>
          {children}
        </div>
      </div>
    );
    };
  const handleProjectsClick = () => {
    navigate('/projetos');
  };

  return (
    <div className={styles.aboutContainer}>

      <div className={styles.content}>
        
        <div className={styles.aboutSection}>

          <div className={styles.contentRow}>

            <div className={styles.mePic}>
              <img src="./carolHalftone.svg" alt="" className={styles.carolImg}/>
            </div>

            <div className={styles.container2Block}>
                <BlurText
                text="Dev Front-end paulista & entusiasta de UI"
                delay={200}
                animateBy="words"
                direction="top"
                className="text-2xl mb-8"
                stepDuration={0.4}
                easing={t => t * (2 - t)}
                />
            </div>

          </div>


          <div className={styles.loopContainer}>
            <div className={styles.list}>
              {Array(5).fill().map((_, i) => (
                <div className={styles.item} key={i}>
                  {["HTML", "CSS", "JAVASCRIPT", "REACT", "FIGMA", "GIT & GITHUB", "PYTHON"].map((tech, index) => (
                    <React.Fragment key={`${i}-${index}`}>
                      <span className={styles.ItemTxt}>{tech}</span>
                      <span className={styles.itemD}><p className={styles.itemSlash}>/</p></span>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>

          </div>

          <p className={styles.aboutMeP}>Sou estudante de Análise e Desenvolvimento de Sistemas e atuo no desenvolvimento front-end, unindo código limpo e design responsivo. Meu objetivo é criar soluções digitais que conectam pessoas e tecnologia.</p>

        </div>
        
        <div className={styles.projectsSection}>

          <h2>Vem ver o que fiz recentemente</h2>

          <button onClick={handleProjectsClick} className={styles.ctaButton}>
            Projetos
          </button>

          <div className={styles.eyesContainer}>

            <div className={styles.eye1}>
              <Magnet className={styles.magnet} padding={800} magnetStrength={40}> 
                  <div className={styles.pupil}>
                    <Magnet className={styles.magnet} padding={800} magnetStrength={75}> 
                      <div className={styles.bright}></div>
                    </Magnet>
                  </div>
                </Magnet>
            </div>

            <div className={styles.eye2}>
              <Magnet className={styles.magnet} padding={800} magnetStrength={40}> 
                  <div className={styles.pupil}>
                    <Magnet className={styles.magnet} padding={800} magnetStrength={75}> 
                      <div className={styles.bright}></div>
                    </Magnet>
                  </div>
                </Magnet>
            </div>

          </div>

          <img src="./carolHalftoneEyes.svg" alt="" className={styles.carolEyesImg}/>

        </div>

      </div>

    </div>
  );
};

export default AboutPage;