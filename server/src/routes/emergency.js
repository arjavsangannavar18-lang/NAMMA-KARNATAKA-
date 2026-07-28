import { Router } from 'express';
import { getEmergencyContacts } from '../services/emergencyService.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try { const data = getEmergencyContacts(); res.json(data); }
  catch (err) { next(err); }
});

export default router;
