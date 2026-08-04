import fs from 'fs';
import path from 'path';

const logDirectory = path.resolve('logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const logFilePath = path.join(logDirectory, 'app.log');

const writeLog = (level, message) => {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] [${level}] ${message}\n`;
  fs.appendFileSync(logFilePath, entry);
  console.log(entry.trim());
};

export const logger = {
  info: (message) => writeLog('INFO', message),
  error: (message) => writeLog('ERROR', message),
  warn: (message) => writeLog('WARN', message)
};
