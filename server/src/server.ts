import app from './app.js';
import env from './config/env.js';
import logger from './config/logger.js';

const PORT = env.PORT;

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`🌍 Environment: ${env.NODE_ENV}`);
  logger.info(`❤️ Health Check: http://localhost:${PORT}/api/v1/health`);
});

const shutdown = (signal: string): void => {
  logger.info(`${signal} received. Shutting down gracefully...`);

  server.close(() => {
    logger.info('HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('uncaughtException', (error) => {
  logger.fatal(error, 'Uncaught Exception');
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.fatal(reason, 'Unhandled Promise Rejection');
  process.exit(1);
});