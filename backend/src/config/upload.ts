import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

export interface IUploadConfig {
  driver: 'disk' | 'S3';
  tmpFolder: string;
  uploadsFolder: string;
  multer: { storage: StorageEngine };
  config: {
    disk: {};
  };
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
export default {
  driver: process.env.STORAGE_DRIVER || 'disk',
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('HEX');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },
  config: {
    disk: {},
  },
} as IUploadConfig;
