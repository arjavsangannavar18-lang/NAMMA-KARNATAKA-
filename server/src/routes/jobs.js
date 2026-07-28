import { Router } from 'express';
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    res.json({
      message: 'Government job notifications will be available once official sources are integrated.',
      sources: { kpsc: 'https://kpsc.kar.nic.in', kea: 'https://cetonline.karnataka.gov.in/kea', employment: 'https://emp.kar.nic.in' },
    });
  } catch (err) { next(err); }
});

export default router;
