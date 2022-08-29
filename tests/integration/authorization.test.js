const User = require('../../models/user');
const Code = require('../../models/code');
const request = require('supertest');

describe('authorization middleware', () => {
  let token; 
  const code = { content: 'authentication test'};
  const address = '/codes';
  beforeEach(() => { 
    server = require('../../index'); 
    // token = new User().generateAuthToken();
  })
  afterEach(async () => { 
    await server.close(); 
  });

  const exec = () => {
    // return request(server).post(address).set('x-auth-token', token).send(code);
  }

  it('should return 401 if no token is provided', async () => {
    token = ''; 
    const res = await exec();
    console.log('res 401', res.body);
    expect(res.status).toBe(401);
  });

  it('should return 400 if token is invalid', async () => {
    token = 'wrong'; 
    const res = await exec();
    console.log('res 400', res.body);
    expect(res.status).toBe(400);
  });

  it('should return 200 if token is valid', async () => {
    // token = 'test_jwt';
    const res = await exec();
    const revert = await Answer.findOneAndDelete({
      content: answer.content
    })
    console.log('res 200', res.body);
    expect(res.status).toBe(200);
  });
});