const Description = require('../models/description');
const Answer = require('../models/answer');
const Code = require('../models/code');
const Question = require('../models/question');

async function clearup(){
  const description = await Description.deleteMany({});
  const answer = await Answer.deleteMany({});
  const code = await Code.deleteMany({});
  const question = await Question.deleteMany({});

  console.log('description: ', description);
  console.log('answer: ', answer);
  console.log('code: ', code);
  console.log('question: ', question);
}

async function seeding(){
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
  const num = await Description.find().count();
  for(i=0; i<num; i++) {
    let question = new Question({
      description: desFind[i],
      solutions: {
        answer: ansFind[i],
        code: cdsFind[i]
      }
    });
    await question.save();
  }
}

async function run(){
  // process.env.NODE_CONFIG_ENV = "test";
  process.env.NODE_ENV = "test";
  const server = require('../index');
  const config = require("config");
  const db = config.get('db');
  console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));
  console.log('db: ', db);

  await clearup();
  await seeding();
  await server.close();
  return process.exit(1);
}
run();