# API REST Express TodoList

API REST desenvolvida em **Node.js com Express** para gerenciamento de tarefas (_TodoList_) com autenticação de usuários e arquitetura modular baseada em controladores, casos de uso (usecases) e repositórios.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework para criação de APIs REST
- **TypeScript**: Superset do JavaScript para tipagem estática
- **Prisma**: ORM para integração com banco de dados relacional
- **PostgreSQL**: Banco de dados relacional
- **Docker**: Utilizado para rodar o banco de dados em ambiente isolado
- **JWT (jsonwebtoken)**: Autenticação baseada em tokens
-  **Bcrypt**: Hash de senhas
- **class-validator / class-transformer / reflect-metadata**: Validação e transformação de DTOs

---

## 🛠️ Ferramentas de Desenvolvimento 

- **TS-Node-Dev**: Reload automático em ambiente de desenvolvimento
- **Jest**: Framework de testes unitários
- **Pytest**: Framework de testes de integração (Python)
- **ESLint**: Linter para padronização de código
- **Husky + Commitlint**: Validação e padronização de commits via Git hooks

---

## 📋 Pré-requisitos

- Node.js (v18+)
- Python (v3.8+)
- PostgreSQL
- npm ou yarn
- (Opcional) Docker

---

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

---

```
## 🏃‍♂️ Executando a API

Para iniciar a API em modo de desenvolvimento:
```bash
npm run dev
```

A API estará disponível em `http://localhost:3001`

---

## 🧪 Testes

### ✅ Testes Unitários (Jest)

Cobrem:
- Repositórios (UserRepository, TaskRepository)
- Serviços (JwtService)
- Middlewares (verifyToken, errorHandler, validatorDto)
- Usecases (User e Task)

Para executar os testes unitários:
```bash
npm run test:unit        # Executa os testes uma vez
npm run test:watch      # Executa os testes em modo watch
```

### ✅ Testes de Integração (Pytest)

Cobrem:
- CRUD de usuários e tarefas
- Autenticação e autorização
- Validações e erros

Para executar os testes de integração:
```bash
npm run test:e2e              # Executa os testes sem relatório
npm run test:e2e:report       # Executa os testes e gera relatório HTML
```

O relatório HTML será gerado em `__tests__/e2e/reports/report.html`

---

## 📚 Documentação da API

A API conta com uma documentação gerada com Swagger, o que facilita a compreensão, testes e integração com a API por parte de desenvolvedores externos.

-  **📍 Acesso:**
  Com a aplicação rodando localmente (npm run dev), acesse no navegador:
  ```bash
    http://localhost:3001/api-docs
  ```

-  **🧰 Ferramentas Utilizadas:**
    -  swagger-jsdoc: Responsável por gerar a especificação da API a partir de comentários JSDoc nas rotas.
    -  swagger-ui-express: Exibe a documentação interativa em uma rota acessível pela web.

- **⚙️ Configuração**:
    - A documentação é configurada em: **src/api/swagger.ts**
    - Os comentários que definem os endpoints estão nas rotas em **src/api/routes/**.


### 🔐 Autenticação

- A maioria dos endpoints exige um *token JWT*.
- Envie o token no header:
   ```bash
      Authorization: Bearer <token>
   ```

---

### 📁 Arquitetura principal de Pastas

- O projeto segue uma estrutura modular e organizada por contexto, baseada em princípios da Clean Architecture, onde cada responsabilidade é isolada em sua respectiva camada:

```bash
src/
└── api/
    ├── controllers/          # Controladores responsáveis por lidar com as requisições HTTP
    ├── database/             # Configuração do banco de dados (Prisma, conexão, seed, etc.)
    ├── dtos/                 # Data Transfer Objects: definição e validação de dados
    ├── errors/               # Classes e estruturas para tratamento centralizado de erros
    ├── interfaces/           # Interfaces e tipos utilizados no projeto
    ├── libs/                 # Bibliotecas e funções utilitárias
    ├── middlewares/          # Middlewares globais e específicos (ex: autenticação, validação)
    ├── repositories/         # Implementações dos repositórios (acesso ao banco)
    ├── routes/               # Definição e agrupamento das rotas da aplicação
    ├── services/             # Serviços auxiliares (ex: JWT, hash, etc.)
    ├── usecases/             # Casos de uso que encapsulam a lógica de negócio
    ├── dependencies.ts       # Injeção de dependências e vínculo entre camadas
    ├── swagger.ts            # Configuração da documentação Swagger
    ├── swagger-jsdoc.d.ts    # Tipagem para o Swagger JSDoc
    └── index.ts              # Arquivo principal que inicializa o app Express

__tests__/                   # Testes automatizados (unitários e integração)
├── e2e/                     # Testes de integração (API)
├── unit/                    # Testes unitários (camadas internas)

.husky/                      # Hooks de Git para garantir qualidade nos commits
.prisma/                     # Definição do schema do banco de dados Prisma
.venv/                       # Ambiente virtual do Python (testes de integração)
coverage/                   # Relatórios de cobertura de testes

```


---

## 📝 Notas Adicionais

- Os testes de integração são assíncronos e utilizam pytest-asyncio
- A porta padrão do PostgreSQL é 5432
- Credenciais padrão no Docker:
  - Usuário: postgres
  - Senha: postgres
  - Banco: todolist

---

### 🤝 Contribuindo

- Contribuições são bem-vindas! Para contribuir:

  1. Fork este repositório
  2. Crie uma branch com sua feature: git checkout -b feature/nome-da-feature
  3. Commit suas alterações: git commit -m 'feat: adiciona nova feature'
  4. Faça push: git push origin feature/nome-da-feature
  5. Abra um Pull Request

---

### 🤝 Autores:
- [@HeloisaSilva](https://github.com/Heloisatanquella)
- [@WesleyBastos](https://github.com/WesleyABastos)
- [@JoãoCicery](https://github.com/Ciceriy)