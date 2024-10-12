import express from 'express';
import configRouter from './config.routes';

const router = express.Router();

router.get('/health-check', (_req, res) => {
  res.send('OK');
});

router.use('/config', configRouter);

export default router;
