const winston = require('winston');
// require('winston-mongodb');
// require('express-async-errors');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log'})
  ],
  exceptionHandlers: [
    new winston.transports.Console({ colorize: true, pretyPrint: true}),
    new winston.transports.File({ filename: 'uncaughtExceptions.log'})
  ]
});
module.exports = logger;
// module.exports = function() {
//   winston.exceptions.handle(
//     new winston.transports.Console({ colorize: true, prettyPrint: true }),
//     new winston.transports.File({ filename: 'uncaughtExceptions.log' }));
//
//   process.on('unhandledRejection', (ex) => {
//     throw ex;
//   });
//
//   winston.add(winston.transports.File, { filename: 'logfile.log' });
//   // winston.add(winston.transports.MongoDB, {
//   //   db: 'mongodb://localhost/vidly',
//   //   level: 'info'
//   // });
// }