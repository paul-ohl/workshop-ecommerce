import express from "express";
import { ConfigService } from "../services/config-service";

const router = express.Router();
const configService = new ConfigService();

router.get("/health-check", (_req, res) => {
  res.send("OK");
});

router.get("/config", async (_req, res) => {
  res.send(await configService.getAll());
});

export default router;
