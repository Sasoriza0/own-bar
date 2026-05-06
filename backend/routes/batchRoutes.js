import { Router } from "express"; 
const router = new Router;

import { createBatch, getAllBatches, addMeasurement} from "../controllers/batchController.js"; 
import authMiddleware from '../middlewares/authMiddleware.js'; 

router.post('/create', authMiddleware, createBatch);
router.get('/get', authMiddleware, getAllBatches);
router.post('/:id/measurements', authMiddleware, addMeasurement);
export default router;