// const request = require('supertest');
// const Solution = require('../../models/solution');
// const Answer = require('../../models/answer');
// const Code = require('../../models/code');
// const config = require("config");

// const db = config.get('db');
// const root = '/solutions';

// describe(root, () => {
//   let server;
//   console.log('db: ', db);
//   beforeEach(() => {
//     server = require('../../index');
//   })
//   afterEach(async () => {
//     await server.close();
//     let solution;
//     do {
//       solution = await Solution.findOne();
//       if(solution) await Solution.deleteOne({
//         _id: solution._id
//       });
//     } while(solution);
//     // await Solution.deleteMany();
//   })

//   describe('GET /', () => {
//     it('should return all solutions', async () => {
//       const solutions = [
//         { 
//           answerContent: 'good answer here',
//           codeContent: 'good code here'},
//         { 
//           answerContent: 'Test answer',
//           codeContent: 'Java here', 
//           language: 'Java'}
//       ];
//       for (let solution of solutions){
//         await request(server).post(root).send(solution);      
//       }
//       const res = await requset(server).get(root);

//       expect(res.status).toBe(200);
//       expect(res.body.length).toBe(2);
//       // expect(res.body.some(s => s.answer === 'good answer here')).toBeTruthy();
//       // expect(res.body.some(s => s.answer === 'Test answer')).toBeTruthy();
//     })
//   })

//   describe('POST /', () => {
//     it('should create a solution', async () => {
//       const solution = { 
//         answerContent: 'Test answer',
//         codeContent: 'Java here', 
//         language: 'Java'};
//       const res = await request(server)
//         .post(root).send(solution);
//       const answer = await Answer.findOne({content: 'Test answer'});
//       const code = await Code.findOne({content: 'Java here'});

//       expect(res.status).toBe(200);
//       expect(res.body).toHaveProperty('_id');
//       expect(res.body).toHaveProperty('answer', answer._id);
//       expect(res.body).toHaveProperty('code', code._id);
//     })
//   })

//   describe('GET /:id', () => {
//     it('should return a specific solution', async () => {
//       const solution = new Solution({
//         content: 'dummy solutions' });
//       await solution.save();
//       const res = await request(server).get(`${root}/${solution._id}`);

//       expect(res.status).toBe(200);
//       expect(res.body).toHaveProperty('content', 'dummy solutions');
//     })
//   })

//   describe('PUT /:id', () => {
//     it('should update a specific solution', async () => {
//       const solution = new Solution({ content: 'dummy solutions'});
//       await solution.save();
//       const answerUp = {content: 'updated solution'};
//       const res = await request(server)
//         .put(`${root}/${solution._id}`)
//         .send(answerUp);

//       expect(res.status).toBe(200);
//       expect(res.body).toHaveProperty('content', 'updated solution');
//     })
//   })

//   describe('DELETE /:id', () => {
//     it('should delete a specific solution', async () => {
//       const solution = {
//         answerContent: 'Test answer',
//         codeContent: 'Java here',
//         language: 'Java'};
//       await request(server).post(root).send(solution);
//       const answerFind = await Answer.findOne({
//         content : 'Test answer'
//       });
//       const solutionFind = await Solution.findOne({
//         answer: answerFind._id
//       });
//       const res = await request(server)
//         .delete(`${root}/${solutionFind._id}`);

//       expect(res.status).toBe(200);
//       // expect(res.body).toHaveProperty('content', 'good solution here');
//       expect(solutionFind).toBeNull();
//     })
//   })
// })