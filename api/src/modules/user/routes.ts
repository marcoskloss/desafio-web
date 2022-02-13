import express, { Router } from 'express';

import { UserController } from '@src/modules/user/controller/user-controller';
import { userSchemaValidator } from './middleware/user-schema-validator';
import { userImageUploader } from './middleware/user-image-uploader';
import path from 'path';

const router = Router();
const userController = new UserController();

router.put(
  '/upload-image/:userId',
  userImageUploader.single('image'),
  userController.uploadImage
);

router.use(
  '/images',
  express.static(path.resolve(__dirname, '..', '..', 'images'))
);

router.delete('/image/:userId', userController.deleteImage);

router.get('/', userController.list);
router.post('/', userSchemaValidator, userController.store);

router.get('/:userId', userController.show);
router.delete('/:userId', userController.delete);
router.put('/:userId', userController.update);

export default router;
