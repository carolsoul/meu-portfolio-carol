# Carol Sousa | Portfólio

Portfólio com home (Hero, Sobre, Trabalhos selecionados e Contato), página com todos os projetos,
uma página por projeto e uma área de admin para cadastrar projetos sem mexer no código.

## Stack

- React 19 + Vite + React Router
- GSAP (ScrollTrigger e SplitText) com `@gsap/react`
- Firebase (Firestore e Authentication) para os projetos e o admin
- Outfit, servida localmente via `@fontsource-variable/outfit`

## Rodando localmente

```bash
npm install
npm run dev
```

Outros scripts: `npm run build`, `npm run preview` e `npm run lint`.

Sem as variáveis do Firebase o site funciona normalmente com a cópia local dos projetos.

## Rotas

| Rota | Página |
| --- | --- |
| `/` | Home |
| `/projetos` | Todos os projetos |
| `/projetos/:slug` | Sobre o projeto (stack, papel, resultados e links) |
| `/admin` | Cadastro de projetos (só com login) |

O arquivo `public/_redirects` faz a Netlify responder todas as rotas com o `index.html`.

## Projetos e admin

Os projetos vêm do Cloud Firestore. Enquanto ele não estiver configurado, ou se não responder, o site
usa `src/data/projects.js`. A configuração do Firebase e do admin está em
[`docs/admin.md`](docs/admin.md).

## Estrutura

```
src/
  components/   Header, Hero, About, Projects, Contact, Footer e peças comuns
  pages/        Home, AllProjects, ProjectDetail, Admin, NotFound
  data/         cópia local dos projetos
  lib/          Firebase, leitura e gravação dos projetos
  reactbits/    componentes de animação adaptados do React Bits
```

## Créditos

As animações usam como base os componentes `SplitText`, `ScrollReveal`,
`AnimatedContent`, `ScrollStack` e `DotGrid` do [React Bits](https://reactbits.dev),
de David Haz, sob a licença MIT + Commons Clause.
