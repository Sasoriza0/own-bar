import { Router } from "express"; 
const router = new Router;

import { register, login } from "../controllers/userController.js"; 

router.post('/registration', register);
router.post('/login', login);

export default router;