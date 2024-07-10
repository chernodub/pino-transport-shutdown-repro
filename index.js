import { createServer } from 'http';
import pino from 'pino';

const logger = pino({
  transport: {
    target: './transport.js',
  },
});

createServer((req, res) => {
  logger.info(req.url);
  res.end();
}).listen(8080, () => {
  logger.info('App started');
});
