import { Router } from 'express';

import { UserController } from '@src/modules/user/controller/user-controller';
import { userSchemaValidator } from './middleware/user-schema-validator';

const router = Router();
const userController = new UserController();

router.get('/', userController.list);
router.get('/:userId', userController.show);
router.post('/', userSchemaValidator, userController.store);
router.delete('/:userId', userController.delete);
router.put('/:userId', userController.update);

export default router;
