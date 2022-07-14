const Answer = require('../models/answer');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const answers = await Answer.find();
  res.send(answers);
});
router.post('/', async (req, res) => {
  const answer = new Answer({
    content: req.body.content,
  });
  await answer.save();
  res.send(answer);
});
router.get('/:id', async (req, res) => {
  const answer = await Answer.findById(req.params.id);
  if (!answer) return res.status(404)
    .send('Can not find the answer');
  res.send(answer);
});
router.put('/:id', async (req, res) => {
  const answer = await Answer.findByIdAndUpdate(req.params.id, {
    content: req.body.content,
  }, {new: true});
  if (!answer) return res.status(404)
    .send('Can not find the answer');
  res.send(answer);
});
router.delete('/:id', async (req, res) => {
  const answer = await Answer.findByIdAndDelete(req.params.id);
  if (!answer) return res.status(404)
    .send('Can not find the answer');
  res.send(answer);
});

module.exports = router;