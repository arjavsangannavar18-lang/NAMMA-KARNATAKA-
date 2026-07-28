import { Router } from 'express';
import { getWeatherByCity, getWeatherForKarnataka } from '../services/weatherService.js';

const router = Router();

router.get('/:city', async (req, res, next) => {
  try { const { city } = req.params; const data = await getWeatherByCity(city); res.json(data); }
  catch (err) { next(err); }
});

router.get('/', async (req, res, next) => {
  try { const data = await getWeatherForKarnataka(); res.json(data); }
  catch (err) { next(err); }
});

export default router;
