import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import AllProjects from './pages/AllProjects/AllProjects';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';
import NotFound from './pages/NotFound/NotFound';

// o admin carrega o formulário e o login do Firebase, então fica num pedaço separado
const Admin = lazy(() => import('./pages/Admin/Admin'));

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projetos" element={<AllProjects />} />
        <Route path="projetos/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route
        path="admin"
        element={
          <Suspense fallback={null}>
            <Admin />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
