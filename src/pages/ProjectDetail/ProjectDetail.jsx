import { Link, useParams } from 'react-router-dom';
import SplitText from '../../reactbits/SplitText/SplitText';
import AnimatedContent from '../../reactbits/AnimatedContent/AnimatedContent';
import { useProjects } from '../../lib/projects';
import { usePageTitle } from '../../lib/usePageTitle';
import NotFound from '../NotFound/NotFound';
import page from '../page.module.css';
import styles from './ProjectDetail.module.css';

const ProjectDetail = () => {
  const { slug } = useParams();
  const { projects, ready } = useProjects();
  const index = projects.findIndex(item => item.slug === slug);
  const project = projects[index];
  usePageTitle(project?.title ?? 'Projeto');

  if (!project) {
    // com o Firebase ligado, o projeto pode existir só no Firestore: espera a lista chegar
    return ready ? <NotFound /> : <div className={page.page} />;
  }

  const next = projects[(index + 1) % projects.length];
  const hasStack = project.stack?.length > 0;
  const hasResults = project.results?.length > 0;

  return (
    <article className={page.page}>
      <Link to="/projetos" className={`${page.back} link-line`}>
        ← Todos os projetos
      </Link>

      <p className={styles.category}>{project.category}</p>
      <SplitText
        key={project.slug}
        tag="h1"
        text={project.title}
        className={`${styles.title} display`}
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
      <p className={styles.summary}>{project.summary}</p>

      <div className={styles.links}>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="pill">
            Ver no ar
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={project.liveUrl ? 'pill pill-ghost' : 'pill'}
          >
            Ver código
          </a>
        )}
      </div>

      {project.image && (
        <AnimatedContent distance={60} duration={1.2}>
          <figure className={styles.screen}>
            <img src={project.image} alt={`Tela do projeto ${project.title}`} />
          </figure>
        </AnimatedContent>
      )}

      <div className={styles.info}>
        <section className={styles.block}>
          <h2 className={styles.label}>Sobre o projeto</h2>
          <p className={styles.lead}>{project.description}</p>
        </section>

        {project.role && (
          <section className={styles.block}>
            <h2 className={styles.label}>Meu papel</h2>
            <p>{project.role}</p>
          </section>
        )}

        {hasResults && (
          <section className={styles.block}>
            <h2 className={styles.label}>Resultados</h2>
            <ul className={styles.results}>
              {project.results.map(result => (
                <li key={result}>{result}</li>
              ))}
            </ul>
          </section>
        )}

        {hasStack && (
          <section className={styles.block}>
            <h2 className={styles.label}>Stack</h2>
            <ul className={styles.stack}>
              {project.stack.map(tech => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {next && next.slug !== project.slug && (
        <Link to={`/projetos/${next.slug}`} className={styles.next}>
          <span className={styles.label}>Próximo projeto</span>
          <span className={`${styles.nextTitle} display`}>{next.title}</span>
        </Link>
      )}
    </article>
  );
};

export default ProjectDetail;
