import express from 'express';
import { fileCase, searchCases, getOpenCases, getAllCases } from '../controllers/policeCaseController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// Use your controller function with upload middleware
router.post("/fileCase", upload.array("media", 5), fileCase);

router.get('/searchCase', protect(['police', 'admin']), searchCases);

router.get('/getAllCases', protect(['police', 'admin']), getAllCases);

router.get('/getOpenCases', protect(['police', 'admin']), getOpenCases);

// Route to get all cases
// router.get('/getCases', protect(['police', 'admin']), getAllCases);

export default router;