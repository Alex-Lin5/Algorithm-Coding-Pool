const Description = require('../models/description');
const mongoose = require('mongoose');
const config = require("config");
const Answer = require('../models/answer');
const Code = require('../models/code');
const Solution = require('../models/solution');

async function seeding(){
  const db = config.get('db');
  const server = require('../index');
  // console.log('server: ', server);
  console.log('db: ', db);

  const descriptions = [
    { title: 'Two Sum', serialNum: 1 },
    { title: 'Palindrome Number', serialNum: 9 }
  ];
  const answers = [
    { content: 'good answer here'},
    { content: 'Test answer'}
  ];
  const codes = [
    { content: 'good code here'},
    { content: 'Java here', language: 'Java'}
  ];
  const solutions = [];
  await Answer.insertMany(answers);
  await Code.insertMany(codes);
  await Solution.insertOne({
    answer: Answer.findOne()._id,
    code: Code.findOne()._id
  });
  const result = await Description.insertMany(descriptions);
  console.log('result: ', result);
}

seeding();