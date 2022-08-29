const logger = require('../startup/logger');
const Description = require('../models/description');
const Answer = require('../models/answer');
const Code = require('../models/code');
const Question = require('../models/question');
const Solution = require('../models/solution');
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

async function clearup(){
  const description = await Description.deleteMany({});
  const answer = await Answer.deleteMany({});
  const code = await Code.deleteMany({});
  const solution = await Solution.deleteMany();
  const question = await Question.deleteMany({});
  const user = await User.deleteMany();

  logger.info('description: ', description);
  logger.info('answer: ', answer);
  logger.info('code: ', code);
  logger.info('solution: ', solution);
  logger.info('question: ', question);
  logger.info('users: ', user);
}

async function seeding(){
  const salt = await bcrypt.genSalt(10);
  const user = [
    { 
      name: 'Admin',
      email: 'admin@gmail.com',
      password: await bcrypt.hash('admin123', salt),
      isAdmin: true 
    },
    { 
      name: 'normal',
      email: 'normal@gmail.com',
      password: await bcrypt.hash('normal123', salt),
      isAdmin: false 
    }
  ];
  await User.insertMany(user);
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
  await Answer.insertMany(answers);
  await Code.insertMany(codes);
  await Description.insertMany(descriptions);

  const desFind = await Description.find();
  const ansFind = await Answer.find();
  const cdsFind = await Code.find();
  // const num = await Description.find().count();  
  const num = 2;
  for(i=0; i<num; i++) {
    let solution = new Solution({
      answer: ansFind[i],
      code: cdsFind[i]
    });
    await solution.save();

    let question = new Question({
      description: desFind[i],
      solutions: solution._id
    });
    await question.save();
  }
}

async function run(){
  if (!process.env.NODE_ENV)
    process.env.NODE_ENV = "test";
  const server = require('../index');

  await clearup();
  await seeding();
  await server.close();
  return process.exit(0);
}
run();