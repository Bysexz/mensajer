import multer from 'multer';
import path from 'path';
import { env } from '../config/env';
import fs from 'fs';
import os from 'os'; // <--- Importamos 'os' para acceder a la carpeta temporal
import { AppError } from './errorHandler';

// Si está en Vercel (production), usamos la carpeta temporal del sistema operativo (/tmp/uploads)
const uploadDir = env.NODE_ENV === 'production'
  ? path.join(os.tmpdir(), 'uploads')
  : env.UPLOAD_DIR;

// Intentamos crear la carpeta de forma segura
if (!fs.existsSync(uploadDir)) {
  try {
    fs.mkdirSync(uploadDir, { recursive: true });
  } catch (error) {
    console.warn('Aviso: No se pudo crear la carpeta en el disco (esperado en Serverless):', error.message);
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // <--- Usa la ruta segura adaptada
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'video/mp4', 'audio/mpeg'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError('Tipo de archivo no soportado', 400));
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: env.MAX_FILE_SIZE },
  fileFilter
});
