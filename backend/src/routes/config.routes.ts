import express from 'express';
import {
  addConfigElement,
  getConfig,
  updateConfigElement,
} from '../controllers/config.controller';

const configRouter = express.Router();

configRouter
  .get('/', getConfig)
  .post('/:configSection', addConfigElement)
  .patch('/:id', updateConfigElement);

export default configRouter;
