// Node Modules
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

// File Modules
const arrayOfMyMiddlewares = require('./middlewares/middleware.js')

const app = express();

app.use( bodyParser.json() );
// app.use( bodyParser.urlencoded( { extended: true } ) );

// User Defined MiddleWares Go Here
app.use( arrayOfMyMiddlewares);

setUpRouter(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT
  ,() => { console.log(`App running on port ${PORT}.`) }
);