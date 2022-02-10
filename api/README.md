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

  # subindo o container do postgresql
  sudo docker-compose up -d

  # setup do Prisma
  npx prisma generate

  # rodando a migration
  npm run db:migrate

  # start no server
  npm run dev
```
