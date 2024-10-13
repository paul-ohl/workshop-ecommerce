import { Request, Response } from 'express';
import { ConfigService } from '../services/config.service';
import ConfigElement from '../types/configElement';
import ConfigSection from '../types/configSection';

export async function getConfig(_req: Request, res: Response) {
  res.send({
    config: await ConfigService.getAll()
  });
}

export async function addConfigElement(req: Request, res: Response) {
  try {
    const configSection = ConfigSection.create(req.params.configSection);
    const b = req.body;
    const configElement = ConfigElement.create(
      b.title,
      b.description,
      b.refs,
      b.isMultiSelection,
      b.isBase,
    );
    res.status(201).send({
      config: await ConfigService.createConfigElement(
        configSection,
        configElement,
      ),
    });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}

export async function updateConfigElement(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const b = req.body;
    const configElement = ConfigElement.create(
      b.title,
      b.description,
      b.refs,
      b.isMultiSelection,
      b.isBase,
    );
    res.send({
      config: await ConfigService.updateConfigElement(id, configElement),
    });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}
