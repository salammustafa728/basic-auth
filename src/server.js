'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const errorHandler = require('./handler/500');
const notfound = require('./handler/404');

const signinRoutes = require('./routes/auth/signup');
const routerSignin = require('./routes/auth/signin');


app.use(express.json());
app.use(cors());
app.use(signinRoutes);
app.use(routerSignin);

function start(port) {
    app.listen(port, () => {
      console.log(`Running on ${port}`);
    });
  }
  
app.get('/', (req, res) => {
  res.send('Home');
});

app.use(errorHandler);
app.use('*',notfound);

module.exports = {
    app: app,
    start: start,
  };