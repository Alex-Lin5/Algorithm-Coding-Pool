const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 3,
    maxlength: 30000,
    default: 'No answer.'
  }
});
const Answer = mongoose.model('Answer', answerSchema);

exports.Answer = Answer;