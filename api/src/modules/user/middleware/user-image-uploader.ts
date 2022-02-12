import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';

const userImageUploaderConfig = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadPath = path.resolve(__dirname, '..', '..', '..', 'images');
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const filename = randomUUID() + '-' + file.originalname;

    cb(null, filename);
  },
});

export const userImageUploader = multer({ storage: userImageUploaderConfig });
