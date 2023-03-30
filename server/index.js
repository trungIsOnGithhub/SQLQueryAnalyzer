const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const funModules = require('./api');

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.get('/exec', funModules.execQuery);
app.post('/exec1', funModules.execQuery);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});