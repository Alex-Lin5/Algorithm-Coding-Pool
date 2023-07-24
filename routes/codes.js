const logger = require('../startup/logger');
const auth = require('../middleware/authorization');
const Code = require('../models/code');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // console.log("Get req query is ", req.query);
  const pageSize = req.query.pageSize;
  const currentPage = req.query.page;
  const codesQuery = Code.find();
  if(req.query.count == 'true'){
    logger.verbose("Counting codes number, do not return codes list.");
    Code.find().countDocuments().then(cap => {
      logger.verbose("Get codes capacity is", cap.toString());
      res.status(200).send(cap.toString());  
    })
    return;
  }
  
  if (pageSize && currentPage) {
    codesQuery.skip(pageSize * currentPage).limit(pageSize);
    logger.verbose(`current page of page size is (${currentPage}, ${pageSize}).`);
  } 
  codesQuery.then(codesList => {
    logger.verbose(`Get Codes list: ${codesList}.`);
    res.status(200).send(codesList);
  })
});
router.post('/', auth, async (req, res) => {
  const code = new Code({
    content: req.body.content,
    language: req.body.language,
    result: req.body.result,
    performance: req.body.performance
  });
  await code.save();
  logger.verbose(`Post the code: ${code}`);
  res.status(200).send(code);
});
router.get('/:id', async (req, res) => {
  const code = await Code.findById(req.params.id);
  if (!code) {
    logger.error(`Can not find the code: ${req.params.id}`);
    return res.status(404).send('Can not find the code');
  } 
  logger.verbose(`Get the code: ${code}`);
  res.status(200).send(code);
});
router.put('/:id', auth, async (req, res) => {
  const code = await Code.findByIdAndUpdate(req.params.id, {
    content: req.body.content,
    language: req.body.language,
    result: req.body.result,
    performance: req.body.performance
  }, {new: true});
  if (!code) {
    logger.error(`Can not find the code: ${req.params.id}`);
    return res.status(404).send('Can not find the code');
  } 
  logger.verbose(`Put the code: ${code}`);
  res.status(200).send(code);
});
router.delete('/:id', auth, async (req, res) => {
  const code = await Code.findByIdAndDelete(req.params.id);
  if (!code) {
    logger.error(`Can not find the code: ${req.params.id}`);
    return res.status(404).send('Can not find the code');
  } 
  logger.verbose(`Delete the code: ${code}`);
  res.status(200).send(code);
});

module.exports = router;