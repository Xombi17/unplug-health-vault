import { Router } from 'express';
import { VaccineController } from '../controllers/vaccineController';
import { authenticateUser } from '../middleware/auth';

const router = Router();
const vaccineController = VaccineController.getInstance();

// Apply authentication middleware to all routes
router.use(authenticateUser);

// Upload and process vaccine certificate
router.post(
  '/process-certificate',
  vaccineController.uploadMiddleware,
  vaccineController.processCertificate.bind(vaccineController)
);

// Get vaccine history
router.get('/history', vaccineController.getVaccineHistory.bind(vaccineController));

// Get vaccine recommendations
router.get('/recommendations', vaccineController.getVaccineRecommendations.bind(vaccineController));

export default router; 