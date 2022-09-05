const logger = require('../startup/logger');
const auth = require('../middleware/authorization');
// const Answer = require('../models/answer');
// const Code = require('../models/code');
const Solution = require('../models/solution');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const solutions = await Solution.find();
  logger.verbose(`Get all solutions: ${solutions}`);
  res.send(solutions);
})
router.post('/', auth, async (req, res) => {
  const solution = new Solution({
    answer: req.body.answer,
    code: req.body.code
  });
  await solution.save();
  logger.verbose(`Post the solution: ${solution}`);
  res.status(200).send(solution);
})
router.get('/:id', async (req, res) => {
  const solution = await Solution.findById(req.params.id);
  if (!solution){
    logger.error(`Can not find the solution: ${req.params.id}`);
    return res.status(404).send('Can not find the solution.');
  } 
  logger.verbose(`Get the solution: ${solution}`);
  res.status(200).send(solution);
})
router.put('/:id', auth, async (req, res) => {
  const solution = await Solution.findByIdAndUpdate(req.params.id, {
    answer: req.body.answer,
    code: req.body.code
  }, {new: true})
  if (!solution) {
    logger.error(`Can not find the solution: ${req.params.id}`);
    return res.status(404).send('Can not find the solution');
  }
  logger.verbose(`Put the solution: ${solution}`);
  res.status(200).send(solution);
})
router.delete('/:id', auth, async (req, res) => {
  const solution = await Solution.findByIdAndDelete(req.params.id);
  if (!solution) {
    logger.error(`Can not find the solution: ${req.params.id}`);
    return res.status(404).send('Can not find the solution');
  } 
  logger.verbose(`Delete the solution: ${solution}`);
  res.status(200).send(solution);
})

module.exports = router;