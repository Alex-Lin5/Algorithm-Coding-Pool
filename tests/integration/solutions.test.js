const request = require('supertest');
const Solution = require('../../models/solution');
const config = require("config");

const db = config.get('db');
const root = '/solutions';

describe('/solutions', () => {
  let server;
  console.log('db: ', db);
  beforeEach(() => {
    server = require('../../index');
  })
  afterEach(async () => {
    await server.close();
    await Solution.deleteMany();
  })

  describe('GET /', () => {
    it('should return all solutions', async () => {
      await Solution.insertMany([
        { 
          answerContent: 'good answer here',
          codeContent: 'good code here'},
        { 
          answerContent: 'Test answer',
          codeContent: 'Java here', 
          language: 'Java'}
      ]);
      const res = await request(server).get(root);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(s => s.answerContent === 'good answer here')).toBeTruthy();
      expect(res.body.some(s => s.answerContent === 'Test answer')).toBeTruthy();  
    })
  })

  describe('POST /', () => {
    it('should create a solution', async () => {
      const solution = { content: 'dummy answers'};
      const res = await request(server)
        .post(root).send(solution);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('content', 'dummy answers');
    })
  })

  describe('GET /:id', () => {
    it('should return a specific solution', async () => {
      const solution = new Solution({
        content: 'dummy solutions' });
      await solution.save();
      const res = await request(server).get(`${root}/${solution._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('content', 'dummy solutions');
    })
  })

  describe('PUT /:id', () => {
    it('should update a specific solution', async () => {
      const solution = new Solution({ content: 'dummy solutions'});
      await solution.save();
      const answerUp = {content: 'updated solution'};
      const res = await request(server)
        .put(`${root}/${solution._id}`)
        .send(answerUp);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('content', 'updated solution');
    })
  })

  describe('DELETE /:id', () => {
    it('should delete a specific solution', async () => {
      const solution = new Solution({
        content: 'good solution here'
      })
      await solution.save();
      const res = await request(server)
        .delete(`${root}/${solution._id}`);
      const codeRead = await Solution.findById(solution._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('content', 'good solution here');
      expect(codeRead).toBeNull();
    })
  })
})