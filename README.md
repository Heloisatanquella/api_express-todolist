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
- Jest: Framework de testes unitários
- Pytest: Framework de testes de integração
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
python3 -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

4. Configure o banco de dados com Docker:
```bash
# Inicie o container do PostgreSQL
docker-compose up -d
```

5. Configure as variáveis de ambiente:
- Crie um arquivo na raiz do projeto com o nome `.env`
- Configure as variáveis de ambiente no arquivo `.env`:
  ```
  # Banco de dados
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todolist?schema=public"

  # JWT
  JWT_SECRET=your-secret-key

  # Servidor
  PORT=3001
  NODE_ENV=development
  AUTH_TOKEN=seu_token_aqui
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

A API estará disponível em `http://localhost:3001`

## 🧪 Testes

### Testes Unitários

Os testes unitários são executados com Jest e cobrem os seguintes componentes:
- Repositories (UserRepository, TaskRepository)
- Services (JwtService)
- Middlewares (verifyToken, errorHandler, validatorDto)
- Usecases (User e Task)

Para executar os testes unitários:
```bash
npm run test:unit        # Executa os testes uma vez
npm run test:watch      # Executa os testes em modo watch
```

### Testes de Integração

Os testes de integração são executados com Pytest e testam a API de ponta a ponta. Eles cobrem:
- Operações CRUD de usuários
- Autenticação e autorização
- Operações CRUD de tarefas
- Validações de dados
- Tratamento de erros

Para executar os testes de integração:
```bash
npm run test:e2e              # Executa os testes sem relatório
npm run test:e2e:report       # Executa os testes e gera relatório HTML
```

O relatório HTML será gerado em `__tests__/e2e/reports/report.html`

## 📚 Documentação da API

### Endpoints de Usuário

- `POST /users` - Criar usuário
- `POST /users/login` - Login
- `GET /users/me` - Obter dados do usuário
- `PUT /users/me` - Atualizar usuário
- `DELETE /users/me` - Deletar usuário

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
- O banco de dados é limpo automaticamente antes de cada teste de integração
- O banco de dados PostgreSQL está configurado para rodar na porta 5432
- Credenciais padrão do PostgreSQL no Docker:
  - Usuário: postgres
  - Senha: postgres
  - Banco: todolist
  - Porta: 5432