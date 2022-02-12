# Desafio Web API

API do desafio, consiste em um crud de usuários.

## Ferramentas utilizadas

- Nodejs com Typescript
- ExpressJS
- Prisma ORM
- PostgreSQL
- Docker

## Setup do projeto

```bash
  npm install

  cp .env.example .env
  # preencha as variáveis de ambiente no arquivo .env
  # o arquivo .env.example já contém com uma configuração funcional

  # subindo o container do postgresql
  sudo docker-compose up -d

  # rodando as migrations
  npm run db:migrate

  # start no server
  npm run dev
```

## Rodando os testes

```bash
  npm t
```

## Estrutura do projeto

```root
│   # Arquivos de exportação do insomnia
├── docs
│   # Schema e migrations do db
├── prisma
│   # Script helper
├── scripts
│   # Código da API
├── src
|       # Configuração do prisma
├────── database
|       # Erros customizados
├────── errors
|       # Imagens 
├────── images
|       # Cada módulo contém controllers, model, rotas, unit tests, middlewares e services
├────── modules
|       # Config do module alias
├────── config.ts
|       # Entry point da API
├────── index.ts
|       # Rotas
├────── routes.ts
|       # Setup do express server
├────── server.ts
|   # Testes funcionais
├── test

