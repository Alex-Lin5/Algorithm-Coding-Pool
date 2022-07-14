const Solution = require('../models/solution');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const solutions = await Solution.find();
  res.send(solutions);
});
router.post('/', async (req, res) => {
  const solution = new Solution({
    content: req.body.content,
  });
  await solution.save();
  res.send(solution);
});
router.get('/:id', async (req, res) => {
  const solution = await Solution.findById(req.params.id);
  if (!solution) return res.status(404)
    .send('Can not find the solution');
  res.send(solution);
});
router.put('/:id', async (req, res) => {
  const solution = await Solution.findByIdAndUpdate(req.params.id, {
    content: req.body.content,
  }, {new: true});
  if (!solution) return res.status(404)
    .send('Can not find the solution');
  res.send(solution);
});
router.delete('/:id', async (req, res) => {
  const solution = await Solution.findByIdAndDelete(req.params.id);
  if (!solution) return res.status(404)
    .send('Can not find the solution');
  res.send(solution);
});

module.exports = router;