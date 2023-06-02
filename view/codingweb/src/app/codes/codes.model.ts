export interface Code{
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
    maxlength: 50
  }
}
