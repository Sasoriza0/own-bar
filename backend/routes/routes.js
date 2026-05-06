import { Router } from "express"; 
const router = new Router;

import userRouter from './userRoutes.js' 
import batchRouter from './batchRoutes.js' 

router.use('/user', userRouter);
router.use('/batch', batchRouter);

export default router;