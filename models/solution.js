const mongoose = require('mongoose');
const Answer = require('./answer');
const Code = require('./code');

const solutionSchema = new mongoose.Schema({
  answer: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Answer',
    required: true
  },
  code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Code',
    require: true
  }
});
const Solution = mongoose.model('Solution', solutionSchema);

module.exports = Solution;