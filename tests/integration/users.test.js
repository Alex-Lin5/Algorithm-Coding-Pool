const User = require('../../models/user');
const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const root = '/users';

describe(root, () => {
  beforeEach(() => { 
    server = require('../../index'); 
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
      expect(decoded._id).toBe(payload._id);
      expect(decoded.isAdmin).toBe(payload.isAdmin);
    });
  });

  describe('GET /me/:id', () => {
    it('should return current user successfully', async() => {
      const user = await User.findOne({ isAdmin: false });
      const address = `${root}/me/${user._id}`;
      const token = user.generateAuthToken();
      // const res =  await request(server).get(address).set('x-auth-token', token);
      const res =  await request(server).get(address);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', 'normal');
    })
  })

  describe('POST /', () => {
    it('should return 400 if user already registered.', async() => {
      const user = {
        name: 'normal',
        email: 'normal@gmail.com',
        password: 'normal123',
        isAdmin: false   
      }
      const res = await request(server).post(root).send(user);
      // console.log('400 post user: ', user);
      // console.log('400 post res.body: ', res.body);
      expect(res.status).toBe(400);
    })
    it('should return 200 if everything is good', async() => {
      const user = {
        name: 'temp',
        email: 'temp@gmail.com',
        password: 'temp123',
        isAdmin: false
      }
      const res = await request(server).post(root).send(user);    
      const revert = await User.deleteOne({ name: 'temp' });
      const token = res.headers['x-auth-token'];
      const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
      expect(res.status).toBe(200);
      expect(decoded.isAdmin).toBe(false);
      expect(res.body).toHaveProperty('name', 'temp');
    })
  })
})