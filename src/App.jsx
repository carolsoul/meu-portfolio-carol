import { useState } from 'react';
// 1. Importe os componentes de roteamento
import { Routes, Route } from 'react-router-dom';

import LoadingPage from './components/LoadingPage/LoadingPage';
import ScrollContainer from './ScrollContainer';
import ProjectsPage from './components/ProjectsPage/ProjectsPage'; // Nossa nova página

// Vamos criar um componente wrapper para a lógica de loading
const PortfolioHome = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingPage onLoadingComplete={() => setIsLoading(false)} />;
  }

  return <ScrollContainer />;
};


function App() {
  return (
    // 2. O componente Routes gerencia qual Route será renderizada
    <Routes>
      {/* 3. Cada Route mapeia um caminho (path) para um componente (element) */}
      <Route path="/" element={<PortfolioHome />} />
      <Route path="/projetos" element={<ProjectsPage />} />
    </Routes>
  );
}

export default App;