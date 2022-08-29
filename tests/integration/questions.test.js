const request = require('supertest');
const mongoose = require('mongoose');

const Question = require('../../models/question');
const Answer = require('../../models/answer');
const Code = require('../../models/code');
const Description = require('../../models/description');
const Solution = require('../../models/solution');

const root = '/questions';

describe(root, () => {
  let server;
  beforeEach(() => {
    server = require('../../index');
  })
  afterEach(async () => {
    await server.close();
  })

  describe('GET /', () => {
    it('should return all questions', async () => {
      const answer = await Answer.findOne({
        content: 'good answer here'
      })
      const solution = await Solution.findOne({
        answer: answer._id
      })
      const questions = await Question.find().populate(['solutions', 'description']);
      const description = await Description.findOne();
      const res = await request(server).get(root);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(q => q.description == description._id)).toBeTruthy();
      expect(res.body[0].solutions).toEqual(expect.arrayContaining([solution._id.toString()]))
    })
  })

  describe('POST /', () => {
    it('should create a question', async () => {
      const descriptionID = new mongoose.Types.ObjectId().toString();
      const solutionID = new mongoose.Types.ObjectId().toString();
      const question = { 
        description: descriptionID,
        solutions: [solutionID]
      };
      const res = await request(server)
        .post(root).send(question);
      const revert = await Question.findOneAndDelete({
        description: descriptionID
      })
      console.log('description,', res.body.description);
      console.log('res get one:', res.body);
      console.log('res solutions,', res.body.solutions);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('description', descriptionID);
      expect(res.body.solutions).toEqual(expect.arrayContaining([solutionID]))
    })
  })

  describe('GET /:id', () => {
    it('should return a specific question', async () => {
      const code = await Code.findOne({
        content: 'good code here'
      })
      const solution = await Solution.findOne({
        code: code._id
      })
      const question = await Question.findOne({
        solutions: { $in: solution._id }
      });
      const res = await request(server).get(`${root}/${question._id}`);

      expect(res.status).toBe(200);
      // expect(res.body).toHaveProperty('solutions', solution._id);
      expect(res.body.solutions).toEqual(expect.arrayContaining([solution._id.toString()]));
    })
  })

  describe('PUT /:id', () => {
    it('should update a specific question', async () => {
      const description = await Description.findOne({
        serialNum: 1
      })
      const question = await Question.findOne({
        description: description._id
        });
      const descriptionUp = new mongoose.Types.ObjectId().toString();
      const questionUp = {
        description: descriptionUp
      }
      const res = await request(server)
        .put(`${root}/${question._id}`)
        .send(questionUp);
      const revert = await Question.findByIdAndUpdate(question._id, {
        description: description._id
      })

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('description', descriptionUp._id);
    })
  })

  describe('DELETE /:id', () => {
    it('should delete a specific question', async () => {
      const descriptionID = new mongoose.Types.ObjectId().toString();
      const solutionID = new mongoose.Types.ObjectId().toString();
      const question = new Question({ 
        description: descriptionID,
        solutions: [solutionID]
      });
      await question.save();
      const res = await request(server)
        .delete(`${root}/${question._id}`);
      const questionFind = await Question.findOne({
        description : descriptionID
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('description', descriptionID);
      expect(res.body.solutions).toEqual(expect.arrayContaining([solutionID]))
      expect(questionFind).toBeNull();
    })
  })
})