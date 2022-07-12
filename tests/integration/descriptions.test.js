const request = require('supertest');
const Description = require('../../models/description');
const config = require("config");

const db = config.get('db');
const root = '/descriptions';

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
      await Description.insertMany([
        { title: 'Two Sum', serialNum: 1 },
        { title: 'Palindrome Number', serialNum: 9 }
      ])
      const res = await request(server).get(root);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(d => d.serialNum === 1)).toBeTruthy();
      expect(res.body.some(d => d.serialNum === 9)).toBeTruthy();
    });
  });

  describe('POST /', () => {
    it('should create a new description item', async() => {
      const description = { title: 'Two Sum', serialNum: 1 };
      const res = await request(server)
      .post('/descriptions').send(description);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('serialNum', 1);
      expect(description).not.toBeNull();
    });
  });

  describe('GET /:id', () => {
    it('should return specific description', async() => {
      const description = new Description({
        title: 'Two Sum', serialNum: 1
      });
      await description.save();
      const res = await request(server).get(`${root}/${description._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('serialNum', 1);
    });
  });


  describe('PUT /:id', () => {
    it('should update an existed description item', async() => {
      const description = new Description({
        title: 'Two Sum', serialNum: 1
      });
      await description.save();
      const descriptionUp = { title: 'Two Sum 2', serialNum: 2 };
      const res = await request(server)
      .put(`${root}/${description._id}`)
      .send(descriptionUp);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('serialNum', 2);
    });
  });

  describe('DELETE /:id', () => {
    it('should delete the specific description item', async() => {
      const description = new Description({
        title: 'Two Sum', serialNum: 1
      });
      await description.save();
      const res = await request(server)
        .delete(`${root}/${description._id}`).send();
      const descriptionRead = await Description.findById(description._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('serialNum', 1);
      expect(descriptionRead).toBeNull();
    });
  });
})