const request = require('supertest');
const Code = require('../../models/code');
const config = require("config");

const db = config.get('db');
const root = '/codes';

describe('/codes', () => {
  let server;
  console.log('db: ', db);
  beforeEach(() => {
    server = require('../../index');
  })
  afterEach(async () => {
    await server.close();
    const result = await Code.deleteMany();
    // console.log('Delete: ', result);
  })

  describe('GET /', () => {
    it('should return all code snippets', async () => {
      await Code.insertMany([
        { content: 'good code here'},
        { content: 'Java here', language: 'Java'}
      ])
      const res = await request(server).get(root);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(c => c.content === 'good code here')).toBeTruthy();
      expect(res.body.some(c => c.content === 'Java here')).toBeTruthy();  
    })
  })

  describe('POST /', () => {
    it('should create a code snippet', async () => {
      const code = { content: 'Java here', language: 'Java'};
      const res = await request(server)
        .post(root).send(code);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('language', 'Java');
    })
  })

  describe('GET /:id', () => {
    it('should return a specific code snippet', async () => {
      const code = new Code({
        content: 'Java here', language: 'Java'
      });
      await code.save();
      const res = await request(server).get(`${root}/${code._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('language', 'Java');
    })
  })

  describe('PUT /:id', () => {
    it('should update a specific code snippet', async () => {
      const code = new Code({ content: 'Java here', language: 'Java'});
      await code.save();
      const codeUp = {language: 'Javascript'};
      const res = await request(server)
        .put(`${root}/${code._id}`)
        .send(codeUp);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('language', 'Javascript');
    })
  })

  describe('DELETE /:id', () => {
    it('should delete a specific code snippet', async () => {
      const code = new Code({
        content: 'good code here'
      })
      await code.save();
      const res = await request(server)
        .delete(`${root}/${code._id}`);
      const codeRead = await Code.findById(code._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('content', 'good code here');
      expect(codeRead).toBeNull();
    })
  })
})