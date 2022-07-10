const Description = require('../models/description');
const mongoose = require('mongoose');
const config = require("config");

async function seeding(){
  const server = require('../index');

  const descriptions = [
    { title: 'Two Sum', serialNum: 1 },
    { title: 'Palindrome Number', serialNum: 9 }
  ];
  const result = await Description.insertMany(descriptions)
  console.log('result: ', result);
}

seeding();