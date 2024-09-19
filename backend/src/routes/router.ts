import express from "express";
import { ConfigService } from "../services/config-service";

const router = express.Router();
const configService = new ConfigService();

router.get('/health-check', (_req, res) => {
  res.send("OK")
})

router
  .get('/config', async (_req, res) => {
    res.send({ config: await configService.getAll() });
  })
  .patch('/config/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      res.send({ config: await configService.updateConfigElement(id, data) });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  });

export default router;

