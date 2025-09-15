import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import LoadingPage from './components/LoadingPage/LoadingPage';
import ScrollContainer from './ScrollContainer';
import ProjectsPage from './components/ProjectsPage/ProjectsPage'; // Nossa nova página

// componente wrapper para a lógica de loading
const PortfolioHome = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingPage onLoadingComplete={() => setIsLoading(false)} />;
  }

  return <ScrollContainer />;
};


function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioHome />} />
      <Route path="/projetos" element={<ProjectsPage />} />
    </Routes>
  );
}

export default App;