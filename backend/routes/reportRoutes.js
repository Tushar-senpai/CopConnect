import express from 'express';
import { fileReport, getReports } from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to file a report (Only Citizens can file reports)
router.post('/fileReport', protect(['citizen']), fileReport);

// Route to get all reports (Only Police can access)
router.get('/getReports', protect(['police']), getReports);

export default router;
