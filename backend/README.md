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

- ✅ Registro de usuários (`POST /auth/register`)
- ✅ Login com geração de token JWT (`POST /auth/login`)
- ✅ Middleware de autenticação para proteger rotas privadas (`authMiddleware`)
- ✅ Consulta de usuário autenticado (`GET /auth/me`)
- ✅ CRUD de tarefas:
  - Criar tarefa (`POST /tasks`)
  - Listar tarefas do usuário (`GET /tasks`)
  - Atualizar tarefa (`PUT /tasks/:id`)
  - Deletar tarefa (`DELETE /tasks/:id`)
  - Marcar/desmarcar tarefa como concluída (`PATCH /tasks/:id/toggle`)

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
npx prisma generate
```

5. Inicie o servidor em modo desenvolvimento:

```bash
npm run dev
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

👤 Consultar Usuário Autenticado
GET /auth/me
(Cabeçalho Authorization: Bearer JWT_TOKEN_AQUI)

📋 Tarefas (autenticado)
🔑 POST /tasks
```json
{
  "title": "Estudar Node",
  "description": "Finalizar rotas com autenticação e Express"
}
```
🔑 GET /tasks
```json
{
	"id": "1d60b10e-0e91-4b21-9cd9-2752dffd7e76",
	"title": "Estudar Node",
	"description": "Finalizar rotas com autenticação e Express",
	"completed": false,
	"criatedAt": "2025-08-03T05:14:52.132Z",
	"updatedAt": "2025-08-03T05:27:31.445Z",
	"userId": "..."
}
```
🔑 PUT /tasks/:id
```json
{
  "title": "Estudar React.js",
  "description": "Atualizar conteúdo com hooks e consumo de API"
}
```
🔑 DELETE /tasks/:id — Deletar tarefa

🔑 PATCH /tasks/:id/toggle (Resposta esperada:)
```json
{
	"id": "1d60b10e-0e91-4b21-9cd9-2752dffd7e76",
	"title": "Estudar React.js",
	"description": "Atualizar conteúdo com hooks e consumo de API",
	"completed": true,
	"criatedAt": "2025-08-03T05:14:52.132Z",
	"updatedAt": "2025-08-03T05:27:31.445Z",
	"userId": "..."
}
```

---

Desenvolvido por Vinicius O. Souza