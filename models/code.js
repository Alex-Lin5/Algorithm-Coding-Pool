const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  content: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 10000,
    default: `class Solution(object):\n\tdef: `
  },
  language: {
    type: String,
    enum: ['Python', 'Java', 'Javascript', 'C++'],
    default: 'Python'
  },
  result: {
    type: String,
    minlength: 5,
    maxlength: 10000,
    default: 'Program do not run correctly.'
  },
  performance: {
    type: String,
    minlength: 5,
    maxlength: 50,
    default: 'Not avaiable.'
  }
});
const Code = mongoose.model('Code', codeSchema);

module.exports = Code;