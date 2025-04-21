import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from '~/config/dotenv';

const PORT = dotenv.PORT

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Node.js TypeScript API',
    version: '1.0.0',
    description: 'API Documentation for Node.js TypeScript Project',
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);

