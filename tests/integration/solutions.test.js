const request = require('supertest');
const mongoose = require('mongoose');

const Solution = require('../../models/solution');
const Answer = require('../../models/answer');
const Code = require('../../models/code');

const root = '/solutions';

describe('/solutions', () => {
  let server;
  beforeEach(() => {
    server = require('../../index');
  })
  afterEach(async () => {
    await server.close();
  })

  describe('GET /', () => {
    it('should return all solutions', async () => {
      const res = await request(server).get(root);

      const answer = await Answer.findOne({
        content: 'good answer here'
      })
      const code = await Code.findOne({
        content: 'Java here'
      })

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(s => s.answer == answer._id)).toBeTruthy();
      expect(res.body.some(s => s.code == code._id)).toBeTruthy();  
    })
  })

  describe('POST /', () => {
    it('should create a solution', async () => {
      const answer = new mongoose.Types.ObjectId();
      const code = new mongoose.Types.ObjectId();
      const solution = { answer, code };
      const res = await request(server)
        .post(root).send(solution);
      const revert = await Solution.deleteOne({
        'answer': answer._id
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('code', code._id.toString());
    })
  })

  describe('GET /:id', () => {
    it('should return a specific solution', async () => {
      const answer = await Answer.findOne({
        content: 'good answer here'
      })      
      const solution = await Solution.findOne({
        'answer': answer._id
      });
      const res = await request(server).get(`${root}/${solution._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('answer', answer._id.toString());
    })
  })

  describe('PUT /:id', () => {
    it('should update a specific solution', async () => {
      const answer = await Answer.findOne({
        content: 'good answer here'
      })
      const solution = await Solution.findOne({
        answer: answer._id
      })
      const codeID = solution.code;
      const answerUP = new mongoose.Types.ObjectId().toString();
      const codeUP = new mongoose.Types.ObjectId().toString();
      const solutionUp = {
        answer: answerUP,
        code: codeUP
      };
      const res = await request(server)
        .put(`${root}/${solution._id}`)
        .send(solutionUp);

      // const updated = await Solution.findById(solution._id).populate(['answer', 'code']);
      const updated = await Solution.findById(solution._id);
      const revert = await Solution.findByIdAndUpdate(solution._id, {
        answer: answer._id,
        code: codeID
      })
      const reverted = await Solution.findById(solution._id).populate(['answer', 'code']);

      console.log('Updated:', updated);
      console.log('reverted:', reverted);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('answer', answerUP);
      expect(res.body).toHaveProperty('code', codeUP);
      // expect(res.body.answer).toEqual(answerUP);
      // expect(res.body).toHaveProperty('code', codeUP);
    })
  })

  describe('DELETE /:id', () => {
    it('should delete a specific solution', async () => {
      const answer = new mongoose.Types.ObjectId().toString();
      const solution = new Solution({
        answer: answer,
        code: new mongoose.Types.ObjectId()
      })
      await solution.save();
      const res = await request(server)
        .delete(`${root}/${solution._id}`);
      const solutionFind = await Solution.findById(solution._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('answer', answer);
      expect(solutionFind).toBeNull();
    })
  })
})