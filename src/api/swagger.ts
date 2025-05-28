
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Todo List',
      version: '1.0.0',
      description: 'Documentação da API de tarefas com autenticação',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./src/api/routes/*.ts'], // Caminho dos arquivos com comentários Swagger
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;