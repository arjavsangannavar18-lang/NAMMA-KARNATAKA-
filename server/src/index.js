import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import weatherRoutes from './routes/weather.js';
import newsRoutes from './routes/news.js';
import transportRoutes from './routes/transport.js';
import marketPriceRoutes from './routes/marketPrices.js';
import jobRoutes from './routes/jobs.js';
import districtRoutes from './routes/districts.js';
import emergencyRoutes from './routes/emergency.js';
import healthRoutes from './routes/health.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, standardHeaders: true, legacyHeaders: false, message: { error: 'Too many requests, please try again later.' } });
app.use('/api/', limiter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'NAMMA KARNATAKA API', version: '1.0.0' });
});

app.use('/api/weather', weatherRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/market-prices', marketPriceRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/districts', districtRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/health-resources', healthRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 NAMMA KARNATAKA API running on http://localhost:${PORT}`);
});

export default app;
