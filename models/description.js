const mongoose = require('mongoose');
const Joi = require('joi');

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

function validate(description){
  const descriptionSchema = Joi.object({
      title: Joi.string().min(3).max(50).required(),
      brief: Joi.string().min(5).max(10000),
      serialNum: Joi.number.min(1).max(10000).required(),
      solved: Joi.boolean,
      difficulty: Joi.string()
  });
  // return Joi.validate(description, schema);
  return descriptionSchema.validate(description);
}

module.exports = Description;
module.exports = validate;