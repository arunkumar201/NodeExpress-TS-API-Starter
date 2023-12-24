import config from '../config/config';

const swaggerDef: any = {
  openapi: '3.0.0',
  info: {
    title: 'API documentation',
    version: '1.0.0',
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

export default swaggerDef;
