import { createServer } from './server';
import { connectDB } from './config/database';
import { env } from './config/env';
import logger from './middlewares/logger';

const startServer = async () => {
  try {
    // await connectDB(); // COMENTADO TEMPORALMENTE PARA QUE ARRANQUE SIN BDD
    
    const { server } = createServer();
    
    server.listen(env.PORT, () => {
      logger.info(`Servidor ejecutándose en puerto ${env.PORT} en modo ${env.NODE_ENV}`);
    });

    const shutdown = () => {
      logger.info('Apagando servidor...');
      server.close(() => {
        logger.info('Servidor apagado');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    logger.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
