const request = require('supertest');
const Code = require('../../models/code');

const root = '/codes';

describe(root, () => {
  let server;
  beforeEach(() => {
    server = require('../../index');
  })
  afterEach(async () => {
    await server.close();
  })

  describe('GET /', () => {
    it('should return all code snippets', async () => {
      const res = await request(server).get(root);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(c => c.content === 'good code here')).toBeTruthy();
      expect(res.body.some(c => c.content === 'Java here')).toBeTruthy();  
    })
  })

  describe('POST /', () => {
    it('should create a code snippet', async () => {
      const code = { content: 'post code here', language: 'C++'};
      const res = await request(server)
        .post(root).send(code);
      const revert = await Code.deleteOne({
        language: 'C++'
      })

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('language', 'C++');
    })
  })

  describe('GET /:id', () => {
    it('should return a specific code snippet', async () => {
      const code = await Code.findOne({
        content: 'Java here', language: 'Java'
      })
      const res = await request(server).get(`${root}/${code._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('language', 'Java');
    })
  })

  describe('PUT /:id', () => {
    it('should update a specific code snippet', async () => {
      const code = await Code.findOne({
        language: 'Java'
      })
      const codeUp = {language: 'Javascript'};
      const res = await request(server)
        .put(`${root}/${code._id}`)
        .send(codeUp);
      const revert = await Code.findByIdAndUpdate(code._id, {
        language: 'Java'
      })

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('language', 'Javascript');
    })
  })

  describe('DELETE /:id', () => {
    it('should delete a specific code snippet', async () => {
      const code = new Code({
        content: 'delete code here'
      })
      await code.save();
      const res = await request(server)
        .delete(`${root}/${code._id}`);
      const codeRead = await Code.findById(code._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('content', 'delete code here');
      expect(codeRead).toBeNull();
    })
  })
})