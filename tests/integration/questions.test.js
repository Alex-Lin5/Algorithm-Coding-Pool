// const request = require('supertest');
// const config = require("config");
// const mongoose = require('mongoose');

// const Question = require('../../models/question');
// const Answer = require('../../models/answer');
// const Code = require('../../models/code');
// const Description = require('../../models/description');

// const db = config.get('db');
// const root = '/questions';

// describe(root, () => {
//   let server;
//   console.log('db: ', db);
//   beforeEach(() => {
//     server = require('../../index');
//   })
//   afterEach(async () => {
//     const result = await server.close();
//     // console.log('Sever closed, ', result);
//     // let question;
//     // do {
//     //   question = await Question.findOne();
//     //   if(question) await Question.deleteOne({
//     //     _id: question._id
//     //   });
//     // } while(question);
//     // await Question.deleteMany();
//   })

//   describe('GET /', () => {
//     it('should return all questions', async () => {
//       const questions = await Question.find().populate('solutions.answer', 'description');
//       const res = await request(server).get(root);

//       expect(res.status).toBe(200);
//       // expect(res.body.length).toBe(2);
//       expect(res.body.some(q => q.answer === questions[0].answer._id))
//         .toBeTruthy();
//       expect(res.body.some(q => q.description === questions[1].description._id))
//         .toBeTruthy();
//     })
//   })

//   describe('POST /', () => {
//     it('should create a question', async () => {
//       const descriptionID = new mongoose.Types.ObjectId().toString();
//       const answerID = new mongoose.Types.ObjectId().toString();
//       const codeID = new mongoose.Types.ObjectId().toString();
//       const question = { 
//         description: descriptionID,
//         // solutions: {
//         //   answer: answerID,
//         //   code: codeID
//         // }
//       };
//       const res = await request(server)
//         .post(root).send(question);
//       const revert = await Question.findOneAndDelete({
//         description: descriptionID
//       })

//       expect(res.status).toBe(200);
//       expect(res.body).toHaveProperty('_id');
//       expect(res.body).toHaveProperty('description', descriptionID);
//       expect(res.body).toHaveProperty('solutions.answer', answerID);
//     })
//   })

//   describe('GET /:id', () => {
//     it('should return a specific question', async () => {
//       const answer = await Answer.findOne({
//         content: 'good answer here'
//       })
//       const question = await Question.findOne({
//         'solutions.answer': answer._id
//       });
//       const res = await request(server).get(`${root}/${question._id}`);

//       expect(res.status).toBe(200);
//       expect(res.body).toHaveProperty('solutions.answer', 'answer._id');
//     })
//   })

//   describe('PUT /:id', () => {
//     it('should update a specific question', async () => {
//       const description = await Description.findOne({
//         serialNum: 1
//       })
//       const question = await Question.findOne({
//         description: description._id
//         });
//       const questionUp = {
//         description: new mongoose.Types.ObjectId()
//       }
//       const res = await request(server)
//         .put(`${root}/${question._id}`)
//         .send(questionUp);
//       const revert = await Question.findByIdAndUpdate(question._id, {
//         description: description._id
//       })

//       expect(res.status).toBe(200);
//       expect(res.body).toHaveProperty('description', description._id);
//     })
//   })

//   describe('DELETE /:id', () => {
//     it('should delete a specific question', async () => {
//       const descriptionID = new mongoose.Types.ObjectId().toString();
//       const answerID = new mongoose.Types.ObjectId().toString();
//       const codeID = new mongoose.Types.ObjectId().toString();
//       const question = new Question({ 
//         description: descriptionID,
//         solutions: {
//           answer: answerID,
//           code: codeID
//         }
//       });
//       await question.save();
//       const res = await request(server)
//         .delete(`${root}/${question._id}`);
//       const questionFind = await Question.findOne({
//         description : descriptionID
//       });

//       expect(res.status).toBe(200);
//       expect(res.body).toHaveProperty('solutions.code', codeID);
//       expect(questionFind).toBeNull();
//     })
//   })
// })