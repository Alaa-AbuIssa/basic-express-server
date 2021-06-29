'use strict';
const express = require('express');
const app = express();
const logger = require('./middleware/ logger');
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const validator=require('./middleware/validator');


function start(port) {
  app.listen(port, () => {
    console.log(`Listening on PORT ${port}`);
  });

}
app.use(logger);

app.get('/', (req, res) => {
  res.status(200).send('Hello From Alaa');
});

app.get('/error', (req, res) => {
  throw new Error('Something Error');
});



// GET http://localhost:3000/person?name=alaa

app.get('/person',validator, (req, res) => {
  const name = req.query.name;
  if (name) {
    res.status(200).json({ name });
  } else {
    res.status(500).json({error:'Something went wrong'});
  }
});

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  app: app,
  start: start,
};


