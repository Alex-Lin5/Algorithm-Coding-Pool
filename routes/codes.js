const Code = require('../models/code');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const codes = await Code.find();
  res.status(200).send(codes);
});
router.post('/', async (req, res) => {
  const code = new Code({
    content: req.body.content,
    language: req.body.language,
    result: req.body.result,
    performance: req.body.performance
  });
  await code.save();
  res.status(200).send(code);
});
router.get('/:id', async (req, res) => {
  const code = await Code.findById(req.params.id);
  if (!code) return res.status(404)
    .send('Can not find the code');
  res.status(200).send(code);
});
router.put('/:id', async (req, res) => {
  const code = await Code.findByIdAndUpdate(req.params.id, {
    content: req.body.content,
    language: req.body.language,
    result: req.body.result,
    performance: req.body.performance
  }, {new: true});
  if (!code) return res.status(404)
    .send('Can not find the code');
  res.status(200).send(code);
});
router.delete('/:id', async (req, res) => {
  const code = await Code.findByIdAndDelete(req.params.id);
  if (!code) return res.status(404)
    .send('Can not find the code');
  res.status(200).send(code);
});

module.exports = router;