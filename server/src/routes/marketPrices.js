import { Router } from 'express';
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { commodity } = req.query;
    res.json({
      message: 'APMC market prices will be available once official data sources are integrated.',
      commodity: commodity || 'all',
      sources: { apmc: 'https://apmc.karnataka.gov.in', agmarknet: 'https://agmarknet.gov.in' },
    });
  } catch (err) { next(err); }
});

export default router;
