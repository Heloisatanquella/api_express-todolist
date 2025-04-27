# API REST Express TodoList

API REST desenvolvida em Node.js com Express para gerenciamento de tarefas (TodoList) com autenticação de usuários.

## 🚀 Tecnologias Utilizadas

- Node.js: Ambiente de execução JavaScript
- Express: Framework para criação de APIs REST
- TypeScript: Superset do JavaScript para tipagem estática
- Prisma (ORM)
- PostgreSQL: Banco de dados
- Docker: onde rodamos database no ORM
- JWT (jsonwebtoken): Autenticação baseada em tokens
- Bcrypt: Hash de senhas para segurança
- Class-validator: Validação de dados via decorators
- Class-transformer: Transformação de objetos em classes
- Reflect-metadata: Suporte a decorators no TypeScript

## 🛠️ Ferramentas de Desenvolvimento 

- TS-Node-Dev: Reload automático em ambiente de desenvolvimento
- Jest: Testes unitários
- Pytest (para testes de integração)
- ESLint: Linter para padronização de código
- Husky: Hooks de Git para garantir qualidade de código nos commits
- Commitlint: Validação de mensagens de commit

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- Python (versão 3.8 ou superior)
- PostgreSQL (banco de dados que usamos no Prisma)
- npm ou yarn
- (Opcional) Docker (caso queira rodar banco de dados em container)

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
python3 -m venv .venv
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

## 🧪 Executando os Testes de Integração

1. Certifique-se de que a API está rodando em `http://localhost:3000`

2. Execute os testes:
```bash
pytest __tests__/e2e/ -v
```

Para ver a cobertura de testes:
```bash
pytest --cov=tests/
```

## 🧪 Executando os Testes Unitários

1. Execute os testes unitários:
```bash
npm run test
```
Para ver a cobertura de testes:
```bash
npm run test -- --coverage
```

## 📚 Documentação da API

### Endpoints de Usuário

- `POST /users` - Criar usuário
- `POST /users/login` - Login
- `GET /users/me` - Obter dados do usuário
- `PUT /users/me` - Atualizar usuário

### Endpoints de Tarefas

- `POST /tasks` - Criar tarefa
- `GET /tasks` - Listar todas as tarefas do usuário
- `GET /tasks/:id` - Obter tarefa por ID
- `PUT /tasks/:id` - Atualizar tarefa
- `DELETE /tasks/:id` - Deletar tarefa

## 📝 Notas

- Todos os endpoints de tarefas e alguns de usuário requerem autenticação via token JWT
- O token deve ser enviado no header `Authorization: Bearer <token>`
- Os testes de integração são assíncronos e utilizam pytest-asyncio
- O banco de dados PostgreSQL está configurado para rodar na porta 5432
- Credenciais padrão do PostgreSQL no Docker:
  - Usuário: postgres
  - Senha: postgres
  - Banco: todolist
  - Porta: 5432