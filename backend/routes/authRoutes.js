import express from "express";
const router = express.Router();
import { register, login, getCurrentUser } from "../controllers/authControllers.js";
import { protect } from "../middleware/authMiddleware.js";

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getCurrentUser);

export default router;
