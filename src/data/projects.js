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
    summary: 'E-commerce completo, com área do cliente, painel administrativo e pagamento integrado.',
    description:
      'Plataforma de e-commerce de casa e decoração com vitrine de produtos, busca, carrinho e lista de favoritos por usuário, checkout integrado ao Mercado Pago e painel administrativo protegido para importação do catálogo via CSV e acompanhamento de pedidos.',
    role: 'Projeto pessoal, desenvolvido de forma independente: design de interface, front-end, modelagem de dados no Firestore, regras de segurança e testes automatizados.',
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Firebase (Firestore e Auth)', 'Zod', 'Mercado Pago', 'Jest'],
    results: [
      '98 testes automatizados com Jest',
      'Importação do catálogo completo via CSV, com validação em Zod',
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
    summary: 'Jogo educativo de alfabetização infantil, vencedor da competição acadêmica da UNICSUL.',
    description:
      'Jogo web voltado a crianças em fase de alfabetização, ambientado em uma selva com personagens próprios. Reúne cinco minijogos pedagógicos (arrastar letras, pesca de letras, palavras cruzadas, caça-palavras e jogo da memória), organizados em mapas com progressão.',
    role: 'Projeto em equipe. Fui responsável pelo design e por todo o front-end: telas e componentes React para dispositivos móveis e desktop, motor lógico do jogo e animações com React Three Fiber.',
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
    summary: 'Catálogo digital de músicas para karaokê, com busca e filtros acessíveis pelo celular.',
    description:
      'Aplicação que substitui o catálogo impresso de karaokê do 601 Arcade Bar. Um script em Python processa a planilha de músicas e alimenta o banco MySQL, uma API REST em Node.js e Express disponibiliza os dados, e a interface permite buscar por título ou artista e filtrar por artista e idioma.',
    role: 'Projeto pessoal, desenvolvido de ponta a ponta: extração de dados, modelagem do banco, API REST e interface.',
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
    summary: 'Aplicação para cadastro e busca de contatos, com filtros por categoria e favoritos.',
    description: 'Aplicação para cadastrar, buscar e organizar contatos, com filtros por categoria, data de inclusão e favoritos.',
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
    summary: 'Portfólio de uma analista de comunicação e marketing, com hero tipográfico animado e uma página para cada trabalho.',
    description:
      'Site portfólio da Isabela Moraes, analista de comunicação e marketing, para apresentar sua trajetória e seus projetos de live marketing e experiência de marca. A home abre com um hero tipográfico em que as imagens dos trabalhos se alternam dentro do nome ("isa [imagem] bela"), seguido de uma faixa horizontal de vídeos fixada na rolagem, serviços e contato. Cada trabalho tem página própria com desafio, ideia, papel e impacto, e uma página Sobre reúne trajetória e competências.',
    role: 'Desenvolvi o site de ponta a ponta: arquitetura de páginas e rotas, interface responsiva, animações com GSAP e organização do conteúdo em arquivos de dados, para que trabalhos, vídeos e contatos sejam atualizados sem alterar os componentes.',
    stack: ['React', 'React Router', 'GSAP (ScrollTrigger)', 'React Bits', 'JavaScript', 'CSS', 'Vite', 'Netlify'],
    results: [
      '6 trabalhos com página própria (desafio, ideia, papel e impacto)',
      'Hero com linha do tempo em GSAP que alterna as imagens dos projetos dentro do nome',
      'Faixa horizontal com 6 vídeos, fixada e conduzida pela rolagem com ScrollTrigger',
      'Animações adaptadas para quem prefere menos movimento no sistema',
    ],
    liveUrl: 'https://isabela-de-moraes.netlify.app/',
    repoUrl: 'https://github.com/carolsoul/isabela-de-moraes',
    image: '/projects/isabela-moraes.png',
    featured: false,
    order: 5,
  },
];

export const sortProjects = list => [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

export const featuredOf = list => sortProjects(list.filter(project => project.featured)).slice(0, 3);
