import { File } from '../models/File';
import { AppError } from '../middlewares/errorHandler';

export const uploadFile = async (userId: string, chatId: string, fileData: Express.Multer.File) => {
  const file = await File.create({
    uploader: userId,
    chat: chatId,
    filename: fileData.filename,
    originalName: fileData.originalname,
    mimeType: fileData.mimetype,
    size: fileData.size,
    url: `/uploads/${fileData.filename}`
  });
  return file;
};

export const getFile = async (fileId: string) => {
  const file = await File.findById(fileId);
  if (!file) throw new AppError('Archivo no encontrado', 404);
  return file;
};
