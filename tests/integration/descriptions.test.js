const request = require('supertest');
const Description = require('../../models/description');
const mongoose = require('mongoose');
const config = require("config");

const root = '/descriptions';
const db = config.get('db');

describe('/descriptions', () => {
  let server;
  console.log('db: ', db);
  beforeEach(() => {
    server = require('../../index');
  });
  afterEach(async () => {
    await server.close();
    const result = await Description.deleteMany();
    console.log('Delete: ', result);
  });

  describe('GET /', () => {
    it('should return all descriptions', async() => {
      const descriptions = [
        { title: 'Two Sum', serialNum: 1 },
        { title: 'Palindrome Number', serialNum: 9 }
      ];
      const result = await Description.insertMany(descriptions)
      // console.log('result: ', result);
      const res = await request(server).get('/descriptions');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(d => d.serialNum === 1)).toBeTruthy();
      expect(res.body.some(d => d.serialNum === 9)).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    // it
  })
})