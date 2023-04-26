const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;
const funModules = require('./query');

app.use( bodyParser.json() );
// app.use( bodyParser.urlencoded( { extended: true } ) );

app.use(funModules.modifyHeaders);
app.use(funModules.prepareReturnObject);

// app.get('/exec', funModules.exec_get1);
app.post('/exec', funModules.execQueryRequestPOST);
app.post('/explain',funModules.execExplainForQuery);

app.listen(PORT
  ,() => { console.log(`App running on port ${PORT}.`) }
);