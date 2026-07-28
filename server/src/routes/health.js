import { Router } from 'express';
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    res.json({
      message: 'Health and education resources will be available once official data is integrated.',
      sources: { health: 'https://karunadu.karnataka.gov.in/hfw', education: 'https://schooleducation.karnataka.gov.in' },
    });
  } catch (err) { next(err); }
});

export default router;
