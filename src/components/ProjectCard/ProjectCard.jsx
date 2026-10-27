import { Link } from 'react-router-dom';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/projetos/${project.slug}`} className={styles.card}>
      <figure className={styles.screen}>
        {project.image && <img src={project.image} alt={`Tela do projeto ${project.title}`} loading="lazy" />}
      </figure>
      <div className={styles.body}>
        <p className={styles.category}>{project.category}</p>
        <h2 className={styles.title}>{project.title}</h2>
        <p className={styles.summary}>{project.summary}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
