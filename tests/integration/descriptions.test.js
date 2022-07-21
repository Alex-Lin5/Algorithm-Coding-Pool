const request = require('supertest');
const Description = require('../../models/description');
const config = require("config");

const db = config.get('db');
const root = '/descriptions';

describe(root, () => {
  let server;
  console.log('db: ', db);
  beforeEach(() => {
    server = require('../../index');
  });
  afterEach(async () => {
    await server.close();
  });

  describe('GET /', () => {
    it('should return all descriptions', async() => {
      const res = await request(server).get(root);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(d => d.serialNum === 1)).toBeTruthy();
      expect(res.body.some(d => d.serialNum === 9)).toBeTruthy();
    });
  });

  describe('POST /', () => {
    it('should create a new description item', async() => {
      const description = { title: 'Two Sum II', serialNum: 2 };
      const res = await request(server)
        .post('/descriptions').send(description);
      const revert = await Description.deleteOne({
        title: 'Two Sum II', serialNum: 2
      })

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('serialNum', 2);
      expect(description).not.toBeNull();
    });
  });

  describe('GET /:id', () => {
    it('should return specific description', async() => {
      const description = await Description.findOne({
        title: 'Two Sum', serialNum: 1
      })
      const res = await request(server).get(`${root}/${description._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('serialNum', 1);
    });
  });


  describe('PUT /:id', () => {
    it('should update an existed description item', async() => {
      const description = await Description.findOne({
        title: 'Two Sum', serialNum: 1
      })
      const descriptionUp = { title: 'Two Sum III', serialNum: 3 };
      const res = await request(server)
        .put(`${root}/${description._id}`)
        .send(descriptionUp);
      const revert = await Description.findByIdAndUpdate(description._id, {
        title: 'Two Sum', serialNum: 1   
      })
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('serialNum', 3);
    });
  });

  describe('DELETE /:id', () => {
    it('should delete the specific description item', async() => {
      const description = new Description({
        title: 'Three Sum', serialNum: 10
      });
      await description.save();
      const res = await request(server)
        .delete(`${root}/${description._id}`).send();
      const descriptionRead = await Description.findById(description._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('serialNum', 10);
      expect(descriptionRead).toBeNull();
    });
  });
})