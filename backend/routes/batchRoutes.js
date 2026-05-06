import { Router } from "express"; 
const router = new Router;

import { createBatch, getAllBatches, addMeasurement,updateBatchStatus, deleteBatch} from "../controllers/batchController.js"; 
import authMiddleware from '../middlewares/authMiddleware.js'; 

router.post('/create', authMiddleware, createBatch);
router.get('/get', authMiddleware, getAllBatches);
router.patch('/:id/status', authMiddleware, updateBatchStatus);
router.delete('/:id', authMiddleware, deleteBatch);

router.post('/:id/measurements', authMiddleware, addMeasurement);


export default router;