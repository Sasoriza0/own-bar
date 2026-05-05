import { Router } from "express"; 
const router = new Router;

import userRouter from './userRouter.js' 

router.use('/user', userRouter);

export default router;