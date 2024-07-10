import { appendFileSync as appendFile, writeFileSync } from 'fs';
import build from 'pino-abstract-transport';

const LOG_FILE_NAME = 'tmp.log';
writeFileSync(LOG_FILE_NAME, '');

export default (_options) =>
  build(
    function (source) {
      source.forEach((s) =>
        appendFile(LOG_FILE_NAME, JSON.stringify(s) + '\n')
      );
      source.on('close', () => appendFile(LOG_FILE_NAME, 'close\n'));
      source.on('data', () => appendFile(LOG_FILE_NAME, 'data\n'));
      source.on('drain', () => appendFile(LOG_FILE_NAME, 'drain\n'));
      source.on('end', () => appendFile(LOG_FILE_NAME, 'end\n'));
      source.on('error', () => appendFile(LOG_FILE_NAME, 'error\n'));
      source.on('finish', () => appendFile(LOG_FILE_NAME, 'finish\n'));
      source.on('pause', () => appendFile(LOG_FILE_NAME, 'pause\n'));
      source.on('pipe', () => appendFile(LOG_FILE_NAME, 'pipe\n'));
      source.on('readable', () => appendFile(LOG_FILE_NAME, 'readable\n'));
      source.on('resume', () => appendFile(LOG_FILE_NAME, 'resume\n'));
      source.on('unpipe', () => appendFile(LOG_FILE_NAME, 'unpipe\n'));
    },
    {
      close() {
        appendFile(LOG_FILE_NAME, 'close\n');
      },
    }
  );
