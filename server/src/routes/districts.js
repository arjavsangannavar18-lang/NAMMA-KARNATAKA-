import { Router } from 'express';
import { getDistrictList, getDistrictInfo } from '../services/districtService.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try { const data = getDistrictList(); res.json(data); }
  catch (err) { next(err); }
});

router.get('/:name', async (req, res, next) => {
  try { const { name } = req.params; const data = await getDistrictInfo(name); res.json(data); }
  catch (err) { next(err); }
});

export default router;
