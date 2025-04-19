// backend/routes/faqRoutes.js
import express from 'express';
import { getFAQs, getFAQByQuestion } from '../controllers/faqController.js';

const router = express.Router();

router.get('/getFaq/', getFAQs);
router.get('/getAnswers/:question', getFAQByQuestion)
// router.post('/createFaq', createFAQ);

export default router;
