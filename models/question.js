const mongoose = require('mongoose');
const Description = require('./description');
const Solution = require('./solution');

const questionSchema = new mongoose.Schema({
  description: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Description',
    required: true
  },
  solutions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Solution'
  }]
})
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;