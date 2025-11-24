import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const fileLogger = (req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    // Check if status code is 400 or higher
    if (res.statusCode >= 400) {
      logError(req, res, data);
    }
    originalSend.call(this, data);
  };
  
  next();
};

const logError = (req, res, data) => {
  const today = new Date().toISOString().split('T')[0];
  const logsDir = path.join(__dirname, '../logs');
  const logFile = path.join(logsDir, `${today}.log`);
  
  // Create logs directory if it doesn't exist
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  
  const logEntry = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    statusCode: res.statusCode,
    error: data,
    ip: req.ip
  };
  
  const logString = JSON.stringify(logEntry, null, 2) + '\n';
  
  fs.appendFileSync(logFile, logString);
};
