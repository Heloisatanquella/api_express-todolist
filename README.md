# API REST Express TodoList

API REST desenvolvida em Node.js com Express para gerenciamento de tarefas (TodoList) com autenticação de usuários.

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- Prisma (ORM)
- PostgreSQL (Docker)
- Python (para testes)
- Pytest
- Pytest-asyncio
- Docker

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- Python 3.8 ou superior
- Docker e Docker Compose
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd api_express-todolist
```

2. Instale as dependências do Node.js:
```bash
npm install
```

3. Instale as dependências do Python:
```bash
python -m venv .venv
source .venv/bin/activate  # No Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

4. Configure o banco de dados com Docker:
```bash
# Inicie o container do PostgreSQL
docker-compose up -d
```

5. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env`
- Configure as variáveis de ambiente no arquivo `.env`:
  ```
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todolist"
  JWT_SECRET="sua_chave_secreta"
  ```

6. Execute as migrações do Prisma:
```bash
npx prisma generate
npx prisma migrate dev
```

## 🏃‍♂️ Executando a API

Para iniciar a API em modo de desenvolvimento:
```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`

## 🧪 Executando os Testes

1. Certifique-se de que a API está rodando em `http://localhost:3000`

2. Execute os testes:
```bash
pytest tests/ -v
```

Para ver a cobertura de testes:
```bash
pytest --cov=tests/
```

## 📚 Documentação da API

### Endpoints de Usuário

- `POST /users` - Criar usuário
- `POST /users/login` - Login
- `GET /users/me` - Obter dados do usuário
- `PUT /users/me` - Atualizar usuário
- `DELETE /users/me` - Deletar usuário

### Endpoints de Tarefas

- `POST /tasks` - Criar tarefa
- `GET /tasks` - Listar todas as tarefas
- `GET /tasks/:id` - Obter tarefa por ID
- `PUT /tasks/:id` - Atualizar tarefa
- `DELETE /tasks/:id` - Deletar tarefa

## 📝 Notas

- Todos os endpoints de tarefas e alguns de usuário requerem autenticação via token JWT
- O token deve ser enviado no header `Authorization: Bearer <token>`
- Os testes são assíncronos e utilizam pytest-asyncio
- O banco de dados PostgreSQL está configurado para rodar na porta 5432
- Credenciais padrão do PostgreSQL no Docker:
  - Usuário: postgres
  - Senha: postgres
  - Banco: todolist
  - Porta: 5432