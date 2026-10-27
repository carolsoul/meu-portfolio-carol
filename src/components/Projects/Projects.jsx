import { Link } from 'react-router-dom';
import SplitText from '../../reactbits/SplitText/SplitText';
import ScrollStack, { ScrollStackItem } from '../../reactbits/ScrollStack/ScrollStack';
import AnimatedContent from '../../reactbits/AnimatedContent/AnimatedContent';
import { featuredOf } from '../../data/projects';
import { useProjects } from '../../lib/projects';
import styles from './Projects.module.css';

const Projects = () => {
  const featured = featuredOf(useProjects().projects);

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
        dimAmount={0.18}
        holdDistance={160}
      >
        {featured.map(project => (
          <ScrollStackItem key={project.slug} itemClassName={styles.card}>
            <Link to={`/projetos/${project.slug}`} className={styles.link}>
              <figure className={styles.screen}>
                <img src={project.image} alt={`Tela do projeto ${project.title}`} loading="lazy" />
              </figure>

              <span className={styles.tag}>{project.category}</span>

              <div className={styles.caption}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.description}>{project.summary}</p>
                <span className={styles.more}>Sobre o projeto →</span>
              </div>
            </Link>
          </ScrollStackItem>
        ))}
      </ScrollStack>

      <AnimatedContent className={styles.all} distance={30} duration={1}>
        <Link to="/projetos" className="pill">
          Ver todos os projetos
        </Link>
      </AnimatedContent>
    </section>
  );
};

export default Projects;
