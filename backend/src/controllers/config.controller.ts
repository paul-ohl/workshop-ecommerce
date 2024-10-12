import { Request, Response } from 'express';
import { ConfigService } from '../services/config-service';

const configService = new ConfigService();

export async function getConfig(_req: Request, res: Response) {
  res.send(await configService.getAll());
}

export async function addConfigElement(req: Request, res: Response) {
  try {
    const configSection = req.params.configSection;
    const data = req.body;
    res.send({
      config: await configService.createConfigElement(configSection, data),
    });
  } catch (error: unknown) {
    res.status(400).send({ error: error.message });
  }
}

export async function updateConfigElement(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const data = req.body;
    res.send({ config: await configService.updateConfigElement(id, data) });
  } catch (error: unknown) {
    res.status(400).send({ error: error.message });
  }
}
