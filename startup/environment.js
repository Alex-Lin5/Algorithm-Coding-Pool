const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
  const nodeEnv = config.util.getEnv('NODE_ENV');
  console.log('The NODE_ENV is:', nodeEnv);
  const db = config.get('db');
  mongoose.connect(db)
    .then(() => console.log(`Connected to ${db}...`))
};
