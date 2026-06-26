import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 10,
  message: { error: 'Demasiados intentos desde esta IP, por favor intenta de nuevo después de 15 minutos.' }
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 100,
  message: { error: 'Límite de peticiones excedido.' }
});
