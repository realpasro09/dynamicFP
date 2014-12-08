'use strict';

module.exports = {
  db: 'mongodb://testing:testing@ds045107.mongolab.com:45107/dynamycfp',
	debug: true,
//  aggregate: 'whatever that is not false, because boolean false value turns aggregation off', //false
  aggregate: false,
  mongoose: {
    debug: false
  },
  app: {
    name: 'Dynamic Fine Prints - No more boring fine prints... Now, you are ready to read!'
  },
  facebook: {
    clientID: '330033637181364',
    clientSecret: 'b44643f67c9785dc063abd540525a2b4',
    callbackURL: 'http://ukkkada13baf.kmiloaguilar.koding.io:3000/auth/facebook/callback'
  },
  twitter: {
    clientID: 'DEFAULT_CONSUMER_KEY',
    clientSecret: 'CONSUMER_SECRET',
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  },
  github: {
    clientID: 'DEFAULT_APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  google: {
    clientID: 'DEFAULT_APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  linkedin: {
    clientID: 'DEFAULT_API_KEY',
    clientSecret: 'SECRET_KEY',
    callbackURL: 'http://localhost:3000/auth/linkedin/callback'
  },
  emailFrom: 'postmaster@kmiloaguilar.com', // sender address like ABC <abc@example.com>
  mailer: {
    service: 'SMTP', // Gmail, SMTP
    auth: {
      user: 'postmaster@kmiloaguilar.com',
      pass: '5ckxl0bhis41'
    },
	  host: 'smtp.mailgun.org',
	  port: 587
  }
};
