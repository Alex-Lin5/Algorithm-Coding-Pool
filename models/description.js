const mongoose = require('mongoose');

const descriptionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    default: 'unknown'
  },
  brief: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 1000,
    default: 'None.'
  },
  serialNum: {
    type: Number,
    required: true,
    min: 1,
    max: 10000,
    default: 0
  },
  solved: {
    type: Boolean,
    default: false
  },
  difficulty: {
    type: String,
    default: 'Easy'
  }
});
const Description = mongoose.model('Description', descriptionSchema);
module.exports = Description;