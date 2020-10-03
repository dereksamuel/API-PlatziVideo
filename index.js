'use strict';

const express = require('express');
const Router = require('./routes/home');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(Router);

const server = app.listen(8000, () => {
  console.log(`Listening on port: ${server.address().port}`);
});
