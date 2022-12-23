const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./routes');
app.use(routes);

app.listen(4001, () => {
  console.log('listening at PORT 4001');
});