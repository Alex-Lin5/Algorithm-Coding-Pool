const request = require('supertest');
const Answer = require('../../models/answer');
const config = require("config");

const db = config.get('db');
const root = '/answers';

describe('/answers', () => {
  let server;
  console.log('db: ', db);
  beforeEach(() => {
    server = require('../../index');
  })
  afterEach(async () => {
    await server.close();
  })

  describe('GET /', () => {
    it('should return all answers', async () => {
      const res = await request(server).get(root);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(a => a.content === 'good answer here')).toBeTruthy();
      expect(res.body.some(a => a.content === 'Test answer')).toBeTruthy();  
    })
  })

  describe('POST /', () => {
    it('should create a answer', async () => {
      const answer = { content: 'dummy answers'};
      const res = await request(server)
        .post(root).send(answer);
      await Answer.deleteOne({
        content: answer.content
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('content', 'dummy answers');
    })
  })

  describe('GET /:id', () => {
    it('should return a specific answer', async () => {
      const answer = await Answer.findOne({
        content: 'Test answer'
      });
      const res = await request(server).get(`${root}/${answer._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('content', 'Test answer');
    })
  })

  describe('PUT /:id', () => {
    it('should update a specific answer', async () => {
      const answer = await Answer.findOne({
        content: 'good answer here'
      })
      const answerUp = {content: 'updated answer'};
      const res = await request(server)
        .put(`${root}/${answer._id}`)
        .send(answerUp);
      const revert = await Answer.findOneAndUpdate(answer._id, {
        content: 'good answer here'
      })

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('content', 'updated answer');
    })
  })

  describe('DELETE /:id', () => {
    it('should delete a specific answer', async () => {
      const answer = new Answer({
        content: 'delete answer here'
      })
      await answer.save();
      const res = await request(server)
        .delete(`${root}/${answer._id}`);
      const answerFind = await Answer.findById(answer._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('content', 'delete answer here');
      expect(answerFind).toBeNull();
    })
  })
})