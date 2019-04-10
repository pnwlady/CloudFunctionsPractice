'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_SENDER = process.env.SENDGRID_SENDER;
const Sendgrid = require('sendgrid')(SENDGRID_API_KEY);

const app = express();

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Parse form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.render('index'));

app.post('/hello', (req, res, next) => {
  const sgReq = Sendgrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [{
        to: [{ email: req.body.email }],
        subject: 'Hello World!'
      }],
      from: { email: SENDGRID_SENDER },
      content: [{
        type: 'text/plain',
        value: 'SendGrid on App Engine with Node.js.'
      }]
    }
  });

  Sendgrid.API(sgReq, (err) => {
    if (err) {
      next(err);
      return;
    }
    // Render the index route on success
    res.render('index', {
      sent: true
    });
    return;
  });
});

app.listen(process.env.PORT || 8080);