const mongoose = require('mongoose');
const { answer } = require('./answer');
const { code } = require('./code');

const solutionSchema = new mongoose.Schema({
  answer: {
    type: answer.Schema,
    required: true
  },
  code: {
    type: code.Schema,
    require: true
  }
});
const Solution = mongoose.model('Solution', solutionSchema);

exports.Solution = Solution;