import { Link } from 'react-router-dom';
import SplitText from '../../reactbits/SplitText/SplitText';
import AnimatedContent from '../../reactbits/AnimatedContent/AnimatedContent';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { useProjects } from '../../lib/projects';
import { usePageTitle } from '../../lib/usePageTitle';
import page from '../page.module.css';
import styles from './AllProjects.module.css';

const AllProjects = () => {
  const { projects } = useProjects();
  usePageTitle('Projetos');

  return (
    <div className={page.page}>
      <Link to="/#projetos" className={`${page.back} link-line`}>
        ← Voltar
      </Link>

      <SplitText
        tag="h1"
        text="Todos os projetos"
        className={`${page.title} display`}
        splitType="words"
        mask
        trigger="load"
        from={{ yPercent: 110 }}
        to={{ yPercent: 0 }}
        ease="expo.out"
        duration={1.3}
        delay={110}
        textAlign="left"
      />

      <ul className={styles.grid}>
        {projects.map((project, index) => (
          <li key={project.slug}>
            <AnimatedContent distance={40} duration={1} delay={(index % 2) * 0.1}>
              <ProjectCard project={project} />
            </AnimatedContent>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllProjects;
