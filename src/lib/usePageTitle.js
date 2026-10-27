import { useEffect } from 'react';

const BASE = 'Carol Sousa | Desenvolvedora Full-stack';

// título da aba por página; volta ao título padrão ao sair
export const usePageTitle = title => {
  useEffect(() => {
    document.title = title ? `${title} | Carol Sousa` : BASE;
    return () => {
      document.title = BASE;
    };
  }, [title]);
};
