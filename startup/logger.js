const winston = require('winston');
const logger = winston.createLogger({
  level: 'verbose',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'algorithm_coding_collection' },
  transports: [
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: winston.format.json()
    }),
    new winston.transports.Http({
      level: 'warn',
      format: winston.format.json()
    }),
    new winston.transports.Console({
      level: 'verbose',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ filename: './logs/combined.log' })
  ],
  exceptionHandlers: [
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: './logs/exceptions.log' })
  ],
  rejectionHandlers: [
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: './logs/rejections.log' })
  ]
});

module.exports = logger;