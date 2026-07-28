import { Router } from 'express';
import { fetchKarnatakaNews } from '../services/newsService.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try { const { category } = req.query; const data = await fetchKarnatakaNews(category); res.json(data); }
  catch (err) { next(err); }
});

export default router;
