# Gerenciador de Tarefas - API de Autenticação (`api-tarefas-auth`)

Este é o backend do projeto **Gerenciador de Tarefas**, iniciado com a implementação do sistema de **autenticação de usuários** utilizando Node.js, Express, TypeScript e Prisma ORM.

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT (jsonwebtoken)](https://www.npmjs.com/package/jsonwebtoken)
- [dotenv](https://www.npmjs.com/package/dotenv)


## 📌 Funcionalidades Implementadas

- [x] Registro de usuários (`/register`)
- [x] Login com geração de token JWT (`/login`)
- [ ] Middleware de autenticação para rotas privadas (em desenvolvimento)
- [ ] CRUD de tarefas (próxima etapa)

## 🔧 Como Executar o Projeto Localmente

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/gerenciador-tarefas.git
cd gerenciador-tarefas/backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o arquivo .env com os dados do seu banco PostgreSQL:

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_secreta"
```

4. Rode as migrações do Prisma:

```bash
npx prisma migrate dev
```

5. Inicie o servidor em modo desenvolvimento:

```bash
npx ts-node-dev src/server.ts
```

## ✅ Testando a API
Você pode testar as rotas com ferramentas como Postman ou Insomnia.

🔐 POST /register
```json
{
  "name": "User1",
  "email": "user1@email.com",
  "password": "123456"
}
```
🔑 POST /login
```json
{
  "email": "user1@email.com",
  "password": "123456"
}
```
Resposta esperada:

```json
{
  "message": "Login realizado com sucesso!",
  "token": "JWT_TOKEN_AQUI",
  "user": {
    "id": "...",
    "name": "User1",
    "email": "user1@email.com"
  }
}
```

## 🛠️ Em Desenvolvimento
- Middleware de autenticação (authMiddleware)
- CRUD de tarefas
- Sistema de permissões e perfis de usuário


---

Desenvolvido por Vinicius Oliveira Souza