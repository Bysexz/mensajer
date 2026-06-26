import winston from 'winston';
import { env } from '../config/env';

// 1. Definimos los transportes dinámicamente
const transports = [];

if (env.NODE_ENV === 'development') {
  // En tu ordenador: guarda en archivos locales y muestra en consola bonita
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  );
} else {
  // En Vercel (Producción): SOLO consola en formato JSON (sin tocar el disco duro)
  transports.push(
    new winston.transports.Console({
      format: winston.format.json()
    })
  );
}

// 2. Creamos el logger con los transportes permitidos para el entorno actual
const logger = winston.createLogger({
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'voxy-server' },
  transports: transports
});

export default logger;
