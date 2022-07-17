const mongoose = require('mongoose');
const Description = require('./description');
const Answer = require('./answer');
const Code = require('./code');

const questionSchema = new mongoose.Schema({
  description: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Description',
    required: true
  },
  solutions: [{
    answer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer'
    },
    code: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Code'
    }
  }]
})
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;