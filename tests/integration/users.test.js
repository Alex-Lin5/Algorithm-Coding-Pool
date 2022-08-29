const User = require('../../models/user');
const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const root = '/users';

describe(root, () => {
  beforeEach(() => { 
    server = require('../../index'); 
    token = new User().generateAuthToken();
  })
  afterEach(async () => { 
    await server.close(); 
  });

  describe('user.generateAuthToken method', () => {
    it('should return a valid JWT', async() => {
      const payload = { 
        _id: new mongoose.Types.ObjectId().toHexString(), 
        name: 'jwt',
        isAdmin: true 
      };
      const user = new User(payload);
      const token = user.generateAuthToken();
      const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
      const revert = await User.deleteOne({ name: 'jwt' });
      expect(decoded).toMatchObject(payload);
    });
  });

  describe('GET /me', () => {
    it('should return current user successfully', async() => {
      const user = await User.findOne({ isAdmin: false });
      const res =  await request(server).get(`${root}/me/${user._id}`)
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', 'normal');
    })
  })

  describe('POST /', () => {
    it('should return 400 if user already registered.', async() => {
      const user = User.findOne({ isAdmin: false });
      const res = await request(server).post(root).send(user);
      console.log('user: ', user);
      console.log('res.body: ', res.body);
      expect(res.status).toBe(400);
    })
    it('should return 200 if everything is good', async() => {
      const user = {
        name: 'temp',
        email: 'temp@gmail.com',
        password: 'temp123',
        isAdmin: false
      }
      const token = await user.generateAuthToken();
      const res = await request(server).post(root).send(user);
      const revert = await User.deleteOne({ name: 'temp' });
      expect(res.status).toBe(200);
      expect(res.header).toEqual(token);
      expect(res.body).toHaveProperty('name', 'temp');
    })
  })
})