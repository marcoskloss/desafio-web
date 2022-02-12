import { Router } from 'express';

import userRoutes from '@src/modules/user/routes';

const router = Router();

router.use('/users', userRoutes);

export default router;
