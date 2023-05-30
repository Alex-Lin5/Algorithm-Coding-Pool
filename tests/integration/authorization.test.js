const User = require('../../models/user');
// const Code = require('../../models/code');
const request = require('supertest');

describe('authorization middleware', () => {
  let server;
  let user;
  let token; 
  let address;
  // const code = { content: 'authentication test'};
  beforeEach(async() => { 
    server = await require('../../index'); 
    user = await User.findOne({ isAdmin: false });
    address = `/users/me/${user._id}`;
    // token = new User().generateAuthToken();
  })
  afterEach(async () => { 
    await server.close(); 
  });

  const exec = () => {
    // let token = user.generateAuthToken();
    return request(server).get(address).set('x-auth-token', token);
  }

  it('should return 401 if no token is provided', async () => {
    token = ''; 
    const res = await request(server).get(address).set('x-auth-token', token);
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
    // token = user.generateAuthToken();
    const res = await exec();
    // const revert = await Answer.findOneAndDelete({
    //   content: answer.content
    // })
    console.log('res 200', res.body);
    expect(res.status).toBe(200);
  });
});