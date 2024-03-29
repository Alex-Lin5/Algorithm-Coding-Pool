const logger = require('../startup/logger');
const auth = require('../middleware/authorization');
const Description = require('../models/description');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const descriptions = await Description.find().sort('serialNum');
  logger.verbose(`Get all descriptions: ${descriptions}`);
  res.status(200).send(descriptions);
});
router.post('/', auth, async (req, res) => {
  const description = new Description({
    title: req.body.title,
    brief: req.body.brief,
    serialNum: req.body.serialNum,
    solved: req.body.solved,
    difficulty: req.body.difficulty
  });
  await description.save();
  logger.verbose(`Post the description: ${description}`);
  res.status(200).send(description);
});
router.get('/:id', async (req, res) => {
  const description = await Description.findById(req.params.id);
  if (!description) {
    logger.error(`Description can not be found: ${req.params.id}`);
    return res.status(404).send('Can not find the description.');
  } 
  logger.verbose(`Get the description: ${description}`);    
  res.status(200).send(description);
});
router.put('/:id', auth, async(req, res) => {
  const description = await Description.findByIdAndUpdate(req.params.id, 
    {
      title: req.body.title,
      brief: req.body.brief,
      serialNum: req.body.serialNum,
      solved: req.body.solved,
      difficulty: req.body.difficulty        
    }, { new: true});
  if (!description) {
    logger.error(`Description can not be found: ${req.params.id}`);
    return res.status(404).send('Description ID can not be found.');
  }
  logger.verbose(`Put the description: ${description}`);  
  res.status(200).send(description);
});
router.delete('/:id', auth, async(req, res) => {
  const description = await Description.findByIdAndDelete(req.params.id);
  if (!description){
    logger.error(`Description can not be found: ${req.params.id}`);
    return res.status(404).send('Description ID can not be found.');
  }
  logger.verbose(`Delete the description: ${description}`);
  res.status(200).send(description);
});

module.exports = router;