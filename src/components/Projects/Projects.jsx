import SplitText from '../../reactbits/SplitText/SplitText';
import ScrollStack, { ScrollStackItem } from '../../reactbits/ScrollStack/ScrollStack';
import AnimatedContent from '../../reactbits/AnimatedContent/AnimatedContent';
import { allProjectsUrl, featuredProjects } from './projects';
import styles from './Projects.module.css';

const Projects = () => {
  return (
    <section id="projetos" className={styles.projects}>
      <SplitText
        tag="h2"
        text="Trabalhos selecionados"
        className={`${styles.title} display`}
        splitType="words"
        mask
        from={{ yPercent: 110 }}
        to={{ yPercent: 0 }}
        ease="expo.out"
        duration={1.3}
        delay={110}
        textAlign="left"
      />

      <ScrollStack
        className={styles.stack}
        useWindowScroll
        smoothScroll={false}
        itemDistance={120}
        itemStackDistance={22}
        stackPosition="14%"
        itemScale={0.04}
        baseScale={0.88}
        dimAmount={0.35}
        holdDistance={160}
      >
        {featuredProjects.map(project => (
          <ScrollStackItem key={project.id} itemClassName={styles.card}>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
              <figure className={styles.screen}>
                <img src={project.image} alt={`Tela do projeto ${project.title}`} loading="lazy" />
              </figure>

              <span className={styles.tag}>{project.category}</span>

              <div className={styles.caption}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
              </div>
            </a>
          </ScrollStackItem>
        ))}
      </ScrollStack>

      <AnimatedContent className={styles.all} distance={30} duration={1}>
        <a href={allProjectsUrl} target="_blank" rel="noopener noreferrer" className="pill">
          Ver todos
        </a>
      </AnimatedContent>
    </section>
  );
};

export default Projects;
