import { Router } from 'express';
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { type } = req.query;
    res.json({
      message: 'Transport data will be available once official BMTC/KSRTC/Metro APIs are integrated.',
      type: type || 'all',
      sources: { bmtc: 'https://bmtc.karnataka.gov.in', ksrtc: 'https://ksrtc.in', metro: 'https://english.bmrc.co.in' },
    });
  } catch (err) { next(err); }
});

export default router;
