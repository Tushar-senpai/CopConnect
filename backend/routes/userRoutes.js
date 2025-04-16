import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Routes

router.get('/police', protect(['police']), (req, res) => {
  res.json({ message: 'Welcome, Police Officer' });
});

router.get('/citizen', protect(['citizen']), (req, res) => {
  res.json({ message: 'Welcome, Citizen' });
});

export default router;
