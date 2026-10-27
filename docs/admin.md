# Página de admin: passo a passo

A página `/admin` permite criar, editar e apagar projetos sem mexer no código. Os projetos ficam no
Cloud Firestore; o site lê de lá e, enquanto o Firebase não estiver configurado, usa a cópia que vem
no código (`src/data/projects.js`).

Leva uns 15 minutos. Tudo é feito no [console do Firebase](https://console.firebase.google.com) e no
painel da Netlify.

## 1. Criar o projeto no Firebase

1. No console, clique em **Adicionar projeto** (ou **Criar um projeto**).
2. Dê um nome, por exemplo `portfolio-carol`.
3. O Google Analytics pode ficar desligado. Conclua a criação.

## 2. Registrar o app da Web

1. Na página inicial do projeto, clique no ícone **`</>`** (Web).
2. Dê um apelido (por exemplo `site`). Não precisa marcar o Firebase Hosting.
3. O console mostra um bloco `firebaseConfig`. Guarde estes quatro valores:

| No `firebaseConfig` | Variável do site |
| --- | --- |
| `apiKey` | `VITE_FIREBASE_API_KEY` |
| `authDomain` | `VITE_FIREBASE_AUTH_DOMAIN` |
| `projectId` | `VITE_FIREBASE_PROJECT_ID` |
| `appId` | `VITE_FIREBASE_APP_ID` |

A `apiKey` do Firebase não é uma senha: ela vai para o navegador de todo visitante. Quem protege os
dados são as regras de segurança do passo 7.

## 3. Ativar o login por e-mail e senha

1. Menu **Build > Authentication > Começar**.
2. Em **Método de login**, ative **E-mail/senha** e salve.
3. Na aba **Usuários**, clique em **Adicionar usuário** e cadastre o seu e-mail com uma senha forte.
   Esse é o login do admin.
4. Em **Configurações > Domínios autorizados**, adicione `carol-sousa.netlify.app` (e o seu domínio
   próprio, se tiver). `localhost` já vem liberado.

## 4. Criar o banco de dados

1. Menu **Build > Firestore Database > Criar banco de dados**.
2. Escolha o **modo de produção** e a região `southamerica-east1 (São Paulo)`.

## 5. Colocar as variáveis no site

**No seu computador:** copie `.env.example` para `.env.local` e preencha os quatro valores do passo 2.
O `.env.local` não vai para o GitHub.

**Na Netlify:**

1. Abra o site `carol-sousa` > **Site configuration > Environment variables**.
2. Adicione as quatro variáveis `VITE_FIREBASE_*` com os mesmos valores.
3. Vá em **Deploys > Trigger deploy > Deploy site** para publicar com as variáveis novas.

## 6. Entrar no admin e copiar o seu UID

1. Abra `https://carol-sousa.netlify.app/admin` (ou `http://localhost:5173/admin` com `npm run dev`).
2. Entre com o e-mail e a senha do passo 3.
3. A página mostra **Seu UID**. Copie esse código.

## 7. Publicar as regras de segurança

1. Menu **Firestore Database > Regras**.
2. Apague o conteúdo e cole o arquivo [`firestore.rules`](../firestore.rules) deste repositório.
3. Troque `SEU_UID` pelo UID copiado no passo 6 e clique em **Publicar**.

Com isso, qualquer visitante lê os projetos e só você escreve.

## 8. Importar os projetos atuais

De volta ao `/admin`, clique em **Importar os 5 projetos atuais**. A partir daí, o site passa a usar o
Firestore, e tudo o que você editar no admin aparece no site na próxima visita, sem novo deploy.

## Usando o admin

- **Novo projeto:** preencha título, categoria e a frase do card. O endereço da página
  (`/projetos/...`) é gerado a partir do título.
- **Destaque:** os projetos marcados aparecem em "Trabalhos selecionados". Entram os 3 primeiros pela
  **ordem** (o menor número primeiro).
- **Stack** é separada por vírgula; **resultados**, um por linha.
- **Imagem:** cole o endereço de uma imagem (`https://...`). Também funciona um arquivo da pasta
  `public/projects` do repositório (por exemplo `/projects/letrola.jpg`).

## Opcional: enviar imagens pelo próprio admin

O Firebase Storage exige o plano **Blaze** (pago conforme o uso, com uma cota gratuita que um portfólio
dificilmente passa; vale configurar um alerta de orçamento).

1. Ative o plano Blaze e vá em **Build > Storage > Começar**.
2. Em **Storage > Regras**, cole [`storage.rules`](../storage.rules) trocando `SEU_UID` e publique.
3. Adicione `VITE_FIREBASE_STORAGE_BUCKET` (o `storageBucket` do passo 2) no `.env.local` e na
   Netlify, e faça um novo deploy.

O formulário passa a mostrar um campo para escolher o arquivo.

## Opcional: fechar o cadastro público

O login por e-mail/senha do Firebase aceita criar contas pela API. As regras já impedem que outra
conta edite os projetos, mas você pode desligar o cadastro em **Authentication > Configurações >
Ações do usuário**, desmarcando **Ativar criação (inscrição)**.
