import SplitText from '../../reactbits/SplitText/SplitText';
import AnimatedContent from '../../reactbits/AnimatedContent/AnimatedContent';
import { allProjectsUrl, featuredProjects } from './projects';
import styles from './Projects.module.css';

const Projects = () => {
  return (
    <section id="projetos" className={styles.projects}>
      <div className={styles.head}>
        <AnimatedContent className={`${styles.headLabel} label`} distance={20} duration={0.9}>
          <span>Projetos</span>
          <span className={styles.muted}>(02)</span>
        </AnimatedContent>

        <SplitText
          tag="h2"
          text="Trabalhos selecionados"
          className={styles.title}
          splitType="words"
          mask
          from={{ yPercent: 110 }}
          to={{ yPercent: 0 }}
          ease="expo.out"
          duration={1.3}
          delay={90}
          textAlign="left"
        />
      </div>

      <ol className={styles.list}>
        {featuredProjects.map((project, index) => (
          <li key={project.id} className={styles.item}>
            <AnimatedContent className={styles.info} distance={32} duration={1} stagger={0.08}>
              <span className={`${styles.number} label`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={`${styles.category} label`}>{project.category}</span>
              <h3 className={styles.projectTitle}>
                {/* o ::after do link cobre o item inteiro */}
                <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.cover}>
                  {project.title}
                </a>
              </h3>
              <p className={styles.description}>{project.description}</p>
              <span className={`${styles.cta} label`} aria-hidden="true">
                Ver no GitHub ↗
              </span>
            </AnimatedContent>

            <AnimatedContent className={styles.media} distance={60} duration={1.3} ease="expo.out">
              <figure className={styles.frame}>
                <img src={project.image} alt={`Tela do projeto ${project.title}`} loading="lazy" />
              </figure>
            </AnimatedContent>
          </li>
        ))}
      </ol>

      <AnimatedContent distance={30} duration={1}>
        <a href={allProjectsUrl} target="_blank" rel="noopener noreferrer" className={styles.all}>
          <span className={styles.allText}>Ver todos</span>
          <span className={`${styles.allMeta} label`}>Repositórios no GitHub ↗</span>
        </a>
      </AnimatedContent>
    </section>
  );
};

export default Projects;
