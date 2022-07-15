const Description = require('../models/description');
const mongoose = require('mongoose');
const config = require("config");

async function seeding(){
  const server = require('../index');

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
  const result = await Description.insertMany(descriptions);
  console.log('result: ', result);
}

seeding();