const request = require('supertest');
const Description = require('../../models/description');
const mongoose = require('mongoose');

const root = '/descriptions';
describe('/descriptions', () => {
  let server;
  beforeEach(() => {
    server = require('../../index');
  });
  afterEach(async () => {
    await server.close();
    await Description.deleteMany();
  });

  describe('GET /', () => {
    it('should return all descriptions', async() => {
      const descriptions = [
        {
          title: 'Two Sum',
          serialNum: 1
        },
        {
          title: 'Palindrome Number',
          serialNum: 9
        }
      ];
      await Description.collection.insertMany(descriptions);
      const res = await request(server).get('/descriptions');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(d => d.serialNum === 1)).toBeTruthy();
      expect(res.body.some(d => d.serialNum === 9)).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it
  })
})