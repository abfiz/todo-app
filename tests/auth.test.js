require('./setup');
const request = require('supertest');
const app = require('../app'); // your Express app
const User = require('../models/User');
require('./setup');

describe('Authentication', () => {
  it('should register a user', async () => {
    const res = await request(app)
      .post('/register')
      .send({ username: 'testuser', password: 'pass123' });

    expect(res.statusCode).toBe(302); // redirect to /dashboard
    const user = await User.findOne({ username: 'testuser' });
    expect(user).not.toBeNull();
  });

  it('should not allow duplicate usernames', async () => {
    await User.create({ username: 'user1', password: 'pass' });
    const res = await request(app)
      .post('/register')
      .send({ username: 'user1', password: 'pass' });

    expect(res.text).toContain('User already exists');
  });

  it('should login a registered user', async () => {
    await request(app)
      .post('/register')
      .send({ username: 'user2', password: 'pass123' });

    const res = await request(app)
      .post('/login')
      .send({ username: 'user2', password: 'pass123' });

    expect(res.statusCode).toBe(302); // redirect to dashboard
  });
});
