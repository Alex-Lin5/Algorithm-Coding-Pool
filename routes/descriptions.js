const Description = require('../models/description');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const descriptions = await Description.find().sort('serialNum');
  res.status(200).send(descriptions);
});
router.post('/', async (req, res) => {
  const description = new Description({
    title: req.body.title,
    brief: req.body.brief,
    serialNum: req.body.serialNum,
    solved: req.body.solved,
    difficulty: req.body.difficulty
  });
  await description.save();
  res.status(200).send(description);
});
router.get('/:id', async (req, res) => {
  const description = await Description.findById(req.params.id);
  if (!description) return res.status(404)
    .send('Can not find the description.');
  res.status(200).send(description);
});
router.put('/:id', async(req, res) => {
  const description = await Description.findByIdAndUpdate(req.params.id, 
    {
      title: req.body.title,
      brief: req.body.brief,
      serialNum: req.body.serialNum,
      solved: req.body.solved,
      difficulty: req.body.difficulty        
    }, { new: true});
  if (!description) 
    return res.status(404).send('Description ID can not be found.');
  
  res.status(200).send(description);
});
router.delete('/:id', async(req, res) => {
  const description = await Description.findByIdAndDelete(req.params.id);
  if (!description)
    return res.status(404).send('Description ID can not be found.');

  res.status(200).send(description);
});

module.exports = router;