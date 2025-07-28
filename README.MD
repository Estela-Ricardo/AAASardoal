<div align="center">

# 🧩 CRM da Associação

[![Refine](https://img.shields.io/badge/Built%20With-Refine-635bff?style=flat&logo=refine&logoColor=white)](https://refine.dev/)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-3fcf8e?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Sistema de Gestão de Sócios, Voluntários, Eventos e Apoio Alimentar, desenvolvido como trabalho final da **UFCD 5425 - Projeto Final**, no âmbito do curso de **Técnico Especialista em Tecnologias e Programação de Sistemas de Informação**.
</div>

---

## 📌 Objetivo

> Construir um CRM funcional para uma associação sem fins lucrativos, permitindo gerir associados, voluntários, eventos, atividades e pedidos de ajuda alimentar, com um backend seguro e um frontend moderno.

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- ⚛️ [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- 🚀 [Refine](https://refine.dev) (`@refinedev/mui`)
- 🎨 [Material UI](https://mui.com/)
- ⚡ [Vite](https://vitejs.dev/)
- 📋 [React Hook Form](https://react-hook-form.com/)

### Backend

- 🛢️ [Supabase](https://supabase.com/) (PostgreSQL + Auth)

---

## 🔐 Segurança Implementada

- Autenticação com Supabase
- Proteção de rotas via `authProvider`
- Validação de sessão com persistência
- Verificação de email e recuperação de palavra-passe (esquecida)
- Controlo de acesso ao conteúdo (ACL)
- **(Nota)**: CAPTCHA e MFA não foram integrados nesta versão

---

## 📁 Funcionalidades

### 👤 Gestão de Sócios
- Criar, editar, listar e ver detalhes de sócios
- Integração com tabela `user` (via FK `id_user`)
- View `associates_full` para queries completas

### 🧑‍🤝‍🧑 Gestão de Voluntários
- Componentes dedicados para voluntários
- Integração com dados de utilizador (nome, email)
- View `volunteers_full` para listagens

### 📦 Pedidos de Ajuda Alimentar
- Registo e gestão de pedidos
- Filtros por estado e detalhes individuais

### 📅 Gestão de Eventos (em desenvolvimento)
- Criação e listagem de eventos
- Ligação com voluntários e inscrições

### ⚙️ Melhorias Gerais
- Refatoração contínua dos componentes
- Otimização de UX/UI
- Redirecionamento manual via `useNavigate().push()` para controlo granular

---

## 🚀 Primeiros Passos

Para correr o projeto localmente:

```bash
# Clonar o repositório
git clone https://github.com/.git
cd crm-associacao

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev

```


## 🖼️ Capturas de Ecrã

<p float="left">
  <img src="./public/0l.png" width="200" />
  <img src="./public/0d.png" width="200" />
</p>
![Criar Associados](./public/1l.png)
![Gestão de Eventos](./public/1d.png)
![Edição de Evento](./public/2l.png)
![Lista Pedidos de Apoio](./public/2d.png)
![Operação em Lista Associado](./public/3l.png)


## 👥 Autoria


**Estela Ricardo**  
[LinkedIn](https://linkedin.com/in/estelaricardo) | [GitHub](https://github.com/Estela-Ricardo)

**Joana Barroqueiro**  
[LinkedIn](https://linkedin.com/in/joanabarbosab) | [GitHub](https://github.com/joanabb)


## 📜 Licença
MIT © 2025 — Projeto educativo sem fins lucrativos.


<div align="center">Feito com ❤️ para ajudar a ajudar.</div>
