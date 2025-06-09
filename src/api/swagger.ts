import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Todo List",
      version: "1.0.0",
      description: "Documentação da API de tarefas com autenticação",
    },
    tags: [
      { name: "Usuários", description: "Operações relacionadas a usuários" },
      { name: "Tarefas", description: "Operações relacionadas a tarefas" },
    ],
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      parameters: {
        taskId: {
          name: "id",
          in: "path",
          description: "ID da tarefa",
          required: true,
          schema: {
            type: "integer",
          },
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "João da Silva" },
            email: {
              type: "string",
              format: "email",
              example: "joao@email.com",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-06-01T12:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2024-06-08T15:45:00.000Z",
            },
          },
        },
        CreateUserInput: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "João da Silva" },
            email: {
              type: "string",
              format: "email",
              example: "joao@email.com",
            },
            password: { type: "string", example: "senha123" },
          },
        },
        LoginUserInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "user@email.com",
            },
            password: { type: "string", example: "senha123" },
          },
        },
        TokenResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },
        UpdateUserInput: {
          type: "object",
          properties: {
            name: { type: "string", example: "João Atualizado" },
            email: {
              type: "string",
              format: "email",
              example: "joao@novoemail.com",
            },
          },
        },
        Task: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "Comprar leite" },
            description: {
              type: "string",
              example: "Comprar 2 litros de leite integral",
            },
            completed: { type: "boolean", example: false },
            userId: { type: "integer", example: 1 },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-06-08T15:30:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2024-06-08T15:30:00.000Z",
            },
          },
        },
        CreateTaskInput: {
          type: "object",
          required: ["title", "description"],
          properties: {
            title: { type: "string", example: "Comprar leite" },
            description: {
              type: "string",
              example: "Comprar 2 litros de leite integral",
            },
            completed: { type: "boolean", example: false },
          },
        },
        UpdateTaskInput: {
          type: "object",
          properties: {
            title: { type: "string", example: "Comprar leite" },
            description: {
              type: "string",
              example: "Comprar 2 litros de leite integral",
            },
            completed: { type: "boolean", example: true },
          },
        },
      },
      responses: {
        unauthorized: {
          description: "Não autorizado (token ausente ou inválido)"
        },
        notFound: {
          description: "Recurso não encontrado"
        },
        badRequest: {
          description: "Dados inválidos"
        },
        conflict: {
          description: "Email já em uso"
        }
      }
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/api/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
