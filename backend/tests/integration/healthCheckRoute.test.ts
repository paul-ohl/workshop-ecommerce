import request from 'supertest';
import express from 'express';
import router from '../../src/routes/router';

let app: any;

beforeAll(async () => {
  app = express();
  app.use(express.json());
  app.use('/', router);
});

test('health-check route', async () => {
  const res = await request(app).get('/health-check');
  expect(res.status).toBe(200);
  expect(res.text).toEqual('OK');
});
