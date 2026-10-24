# Carol Sousa | Portfólio

Portfólio de página única (SPA) com Hero, Sobre, Projetos em destaque e Contato.

## Stack

- React 19 + Vite
- GSAP (ScrollTrigger e SplitText) com `@gsap/react`
- Outfit, servida localmente via `@fontsource-variable/outfit`

## Rodando localmente

```bash
npm install
npm run dev
```

Outros scripts: `npm run build`, `npm run preview` e `npm run lint`.

## Estrutura

```
src/
  components/   Intro, Header, Hero, About, Projects, Contact, Footer
  reactbits/    componentes de animação adaptados do React Bits
```

Os projetos em destaque ficam em `src/components/Projects/projects.js`.

## Créditos

As animações usam como base os componentes `SplitText`, `ScrollReveal`,
`AnimatedContent`, `ScrollStack` e `DotGrid` do [React Bits](https://reactbits.dev),
de David Haz, sob a licença MIT + Commons Clause.
