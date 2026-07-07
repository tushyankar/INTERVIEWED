import app from './app/app.js';
import env from './config/env.js';
import logger from './config/logger.js';

const server = app.listen(env.PORT, () => {
  logger.info(`Server running on http://localhost:${env.PORT}`);
});

process.on('SIGINT', () => {
  logger.info('Shutting down server...');
  server.close(() => process.exit(0));
});