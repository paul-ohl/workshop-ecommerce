import request from 'supertest';
import express from 'express';
import { seedConfig } from '../../src/utils/config-seed';
import mongoose from 'mongoose';
import router from '../../src/routes/router';

const MONGO_URI_TESTS = 'mongodb://localhost:27017/test';
let app: any;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(`${MONGO_URI_TESTS}-${generateRandomString()}`, {
      connectTimeoutMS: 800,
      socketTimeoutMS: 800,
    });
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); // Quitte l'application si la connexion échoue
  }
};

beforeAll(async () => {
  await connectToDatabase();
  app = express();
  app.use(express.json());
  app.use('/', router);
});

afterEach(async () => {
  await mongoose.connection.db?.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Configuration routes', () => {
  test('get config route', async () => {
    const res = await request(app).get('/config');
    expect(res.status).toBe(200);
    //expect(res.body).toHaveProperty('config');
    expect(JSON.stringify(res.body)).toBe('[]');

    await seedConfig();
    const seededRes = await request(app).get('/config');
    expect(seededRes.status).toBe(200);
    expect(seededRes.body[0]).toHaveProperty('colorsConfigs');
    expect(seededRes.body[0]).toHaveProperty('techConfigs');
  });

  test('post config route', async () => {
    const validConfig = {
      title: 'Example Test',
      description: 'TESTESTEST',
      refs: [
        {
          label: 'TEST1',
          color: '#000000',
          pathToImg: 'shell_000000.jpg',
          value: 0,
          isDefault: true,
        },
        {
          label: 'TEST2',
          color: '#0000FF30',
          pathToImg: 'shell_0000FF.jpg',
          value: 0,
          isDefault: false,
        },
      ],
      isMultiSelection: false,
      isBase: false,
    };
    let res = await request(app).post('/config/colors').send(validConfig);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Critical error: no config found');

    await seedConfig();
    res = await request(app).post('/config/colors').send(validConfig);
    expect(res.status).toBe(201);
    expect(JSON.stringify(res.body.colorsConfigs)).toContain('Example Test');

    res = await request(app).post('/config/tech').send(validConfig);
    expect(res.status).toBe(201);
    expect(JSON.stringify(res.body.techConfigs)).toContain('Example Test');

    res = await request(app).post('/config/colors').send({
      title: 'Example Test',
      description: 'TESTESTEST',
      refs: [],
      isMultiSelection: false,
      isBase: false,
    });
    expect(res.status).toBe(201);
  });

  test('post config route with invalid data', async () => {
    await seedConfig();

    let res = await request(app)
      .post('/config/colors')
      .send({
        description: 'TESTESTEST',
        refs: [
          {
            label: 'TEST1',
            color: '#000000',
            pathToImg: 'shell_000000.jpg',
            value: 0,
            isDefault: true,
          },
          {
            label: 'TEST2',
            color: '#0000FF',
            pathToImg: 'shell_0000FF.jpg',
            value: 0,
            isDefault: false,
          },
        ],
        isMultiSelection: false,
        isBase: false,
      });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('title is required');

    res = await request(app)
      .post('/config/colors')
      .send({
        title: 'Example Test',
        description: 'TESTESTEST',
        refs: [
          {
            label: 'TEST1',
            color: '#000000',
            pathToImg: 'shell_000000.jpg',
            value: 0,
            isDefault: true,
          },
        ],
        isBase: false,
      });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('isMultiSelection is required');
  });

  test('patch config route failure', async () => {
    await seedConfig();
    // Find any element in the config
    const config = await request(app).get('/config');
    const id = config.body[0].colorsConfigs[0]._id;
    const res = await request(app)
      .patch(`/config/${id}`)
      .send({
        description: 'TESTESTEST',
        refs: [
          {
            label: 'TEST1',
            color: '#000000',
            pathToImg: 'shell_000000.jpg',
            value: 0,
            isDefault: true,
          },
          {
            label: 'TEST2',
            color: '#0000FF',
            pathToImg: 'shell_0000FF.jpg',
            value: 0,
            isDefault: false,
          },
        ],
        isMultiSelection: false,
        isBase: false,
      });
    expect(res.status).toBe(400);
  });

  test('patch config route', async () => {
    await seedConfig();
    // Find any element in the config
    const config = await request(app).get('/config');
    const id = config.body[0].colorsConfigs[0]._id;
    const oldTitle = config.body[0].colorsConfigs[0].title;
    const res = await request(app)
      .patch(`/config/${id}`)
      .send({
        title: 'Example Test',
        description: 'TESTESTEST',
        refs: [
          {
            label: 'TEST1',
            color: '#000000',
            pathToImg: 'shell_000000.jpg',
            value: 0,
            isDefault: true,
          },
          {
            label: 'TEST2',
            color: '#0000FF',
            pathToImg: 'shell_0000FF.jpg',
            value: 0,
            isDefault: false,
          },
        ],
        isMultiSelection: false,
        isBase: false,
      });
    expect(res.status).toBe(200);
    expect(JSON.stringify(res.body)).toContain('Example Test');
    expect(JSON.stringify(res.body)).not.toContain(oldTitle);
  });
});

function generateRandomString(): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
