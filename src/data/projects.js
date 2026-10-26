// Cópia local dos projetos. O site usa esta lista até os dados do Firestore chegarem
// (e para sempre, se o Firebase não estiver configurado). O admin importa daqui na primeira vez.
//
// Campos de cada projeto:
//   slug      identificador da URL (/projetos/<slug>)
//   featured  aparece em "Trabalhos selecionados" (os 3 primeiros pela ordem)
//   order     posição nas listas, do menor para o maior
//   results   resultados concretos, um por item
export const localProjects = [
  {
    slug: 'the-bush',
    title: 'The Bush.',
    category: 'E-commerce full-stack',
    summary: 'Loja virtual com área de cliente, painel administrativo e pagamento integrado.',
    description:
      'E-commerce de decoração e casa com vitrine, busca, carrinho e favoritos por usuário, checkout com Mercado Pago e uma área administrativa protegida para importar o catálogo em massa via CSV e acompanhar pedidos.',
    role: 'Projeto pessoal. Fiz sozinha o design, o front-end, a modelagem dos dados no Firestore, as regras de segurança e os testes.',
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Firebase (Firestore e Auth)', 'Zod', 'Mercado Pago', 'Jest'],
    results: [
      '98 testes automatizados com Jest',
      'Importação de catálogo inteiro via CSV, com validação em Zod',
      'Pagamento integrado ao Mercado Pago (sandbox)',
    ],
    liveUrl: 'https://projeto-ecommerce-brown.vercel.app',
    repoUrl: 'https://github.com/carolsoul/projeto-ecommerce',
    image: '/projects/the-bush.jpg',
    featured: true,
    order: 1,
  },
  {
    slug: 'letrola',
    title: 'Letrola',
    category: 'Jogo educativo',
    summary: 'Jogo de letramento infantil, vencedor da competição acadêmica da UNICSUL.',
    description:
      'Jogo para crianças em fase de alfabetização, ambientado numa selva com personagens. São cinco minijogos (arrastar letras, pesca de letras, palavras cruzadas, caça-palavras e jogo da memória) distribuídos em mapas com progressão.',
    role: 'Projeto em equipe. Fiz todo o design e todo o front-end: telas e componentes React para celular e desktop, o motor lógico do jogo e as animações com React Three Fiber.',
    stack: ['React', 'JavaScript', 'React Three Fiber', 'Node.js', 'Express', 'MySQL', 'Figma'],
    results: [
      'Vencedor da competição acadêmica entre todos os campi da UNICSUL',
      'Cinco minijogos pedagógicos com progressão por mapas',
    ],
    liveUrl: 'https://letrola-ten.vercel.app',
    repoUrl: 'https://github.com/carolsoul/Letrola',
    image: '/projects/letrola.jpg',
    featured: true,
    order: 2,
  },
  {
    slug: 'karaoke-601',
    title: '601 Arcade Bar Karaokê',
    category: 'Full-stack com API',
    summary: 'Catálogo de músicas do karaokê do bar, com busca e filtros pelo celular.',
    description:
      'Aplicação que substitui o catálogo impresso do karaokê do 601 Arcade Bar. Um extrator em Python lê a planilha do bar e popula o MySQL, uma API em Node.js e Express serve os dados, e o front permite buscar por título ou artista e filtrar por artista e idioma.',
    role: 'Projeto pessoal. Fiz o extrator, a modelagem do banco, a API REST e o front-end.',
    stack: ['Node.js', 'Express', 'MySQL', 'Python', 'Pandas', 'JavaScript', 'HTML', 'CSS'],
    results: [
      'Catálogo com cerca de 10 mil músicas',
      'Busca em tempo real por título ou artista',
    ],
    liveUrl: '',
    repoUrl: 'https://github.com/carolsoul/601-Arcade-Bar-Karaoke',
    image: '/projects/karaoke.png',
    featured: true,
    order: 3,
  },
  {
    slug: 'agenda-de-contatos',
    title: 'Agenda de Contatos',
    category: 'Aplicação full-stack',
    summary: 'Cadastro e busca de contatos, com filtros por categoria, recentes e favoritos.',
    description: 'Aplicação para cadastrar, buscar e organizar contatos, com filtros por categoria, recentes, antigos e favoritos.',
    role: 'Projeto pessoal.',
    stack: [],
    results: [],
    liveUrl: '',
    repoUrl: 'https://github.com/carolsoul/agenda-de-contatos',
    image: '/projects/agenda-de-contatos.png',
    featured: false,
    order: 4,
  },
  {
    slug: 'isabela-moraes',
    title: 'Portfólio Isabela Moraes',
    category: 'Site portfólio',
    summary: 'Site pessoal para uma publicitária apresentar sua trajetória.',
    description:
      'Site pessoal para uma publicitária apresentar sua trajetória em produção de eventos, conteúdo digital e planejamento criativo.',
    role: 'Desenvolvi o front-end.',
    stack: [],
    results: [],
    liveUrl: '',
    repoUrl: 'https://github.com/carolsoul/isabela-de-moraes',
    image: '/projects/isabela-moraes.png',
    featured: false,
    order: 5,
  },
];

export const sortProjects = list => [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

export const featuredOf = list => sortProjects(list.filter(project => project.featured)).slice(0, 3);
