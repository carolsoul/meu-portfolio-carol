import { Link } from 'react-router-dom';
import { usePageTitle } from '../../lib/usePageTitle';
import page from '../page.module.css';

const NotFound = () => {
  usePageTitle('Página não encontrada');

  return (
    <div className={page.page}>
      <h1 className={`${page.title} display`}>Página não encontrada</h1>
      <Link to="/" className="pill">
        Voltar ao início
      </Link>
    </div>
  );
};

export default NotFound;
