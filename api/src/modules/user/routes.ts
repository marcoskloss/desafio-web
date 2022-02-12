import { Router } from 'express';

import { UserController } from '@src/modules/user/controller/user-controller';
import { userSchemaValidator } from './middleware/user-schema-validator';
import { userImageUploader } from './middleware/user-image-uploader';

const router = Router();
const userController = new UserController();

router.put(
  '/upload-image/:userId',
  userImageUploader.single('image'),
  userController.uploadImage
);

router.get('/image/:userId', userController.getImage);
router.delete('/image/:userId', userController.deleteImage);

router.get('/', userController.list);
router.post('/', userSchemaValidator, userController.store);

router.get('/:userId', userController.show);
router.delete('/:userId', userController.delete);
router.put('/:userId', userController.update);

export default router;
