# Carol Sousa | Portfólio

Portfólio de página única (SPA) com Hero, Sobre, Projetos em destaque e Contato.

## Stack

- React 19 + Vite
- GSAP (ScrollTrigger e SplitText) com `@gsap/react`
- Newsreader, servida localmente via `@fontsource-variable/newsreader`

## Rodando localmente

```bash
npm install
npm run dev
```

Outros scripts: `npm run build`, `npm run preview` e `npm run lint`.

## Estrutura

```
src/
  components/   Header, Hero, About, Projects, Contact, Footer
  reactbits/    componentes de animação adaptados do React Bits
```

Os projetos em destaque ficam em `src/components/Projects/projects.js`.

## Créditos

As animações de texto e de entrada usam como base os componentes `SplitText`,
`ScrollReveal` e `AnimatedContent` do [React Bits](https://reactbits.dev),
de David Haz, sob a licença MIT + Commons Clause.
