import { Router } from "express"; 
const router = new Router;

import { createBatch, getAllBatches} from "../controllers/batchController.js"; 
import authMiddleware from '../middlewares/authMiddleware.js'; 

router.post('/create', authMiddleware, createBatch);
router.get('/get', authMiddleware, getAllBatches);

export default router;