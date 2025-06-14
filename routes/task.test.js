require('./setup');
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Task = require('../models/task');
require('./setup');

const loginAndGetSession = async () => {
  await request(app).post('/register').send({ username: 'user', password: '123' });
  const res = await request(app).post('/login').send({ username: 'user', password: '123' });
  return res.headers['set-cookie'];
};

describe('Task Management', () => {
  it('should create a new task', async () => {
    const cookie = await loginAndGetSession();
    const res = await request(app)
      .post('/tasks')
      .set('Cookie', cookie)
      .send({ title: 'Test Task' });

    expect(res.statusCode).toBe(302);
    const tasks = await Task.find({});
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Test Task');
  });

  it('should not allow unauthenticated task creation', async () => {
    const res = await request(app).post('/tasks').send({ title: 'NoAuth' });
    expect(res.statusCode).toBe(302); // redirected to /login
  });
});
