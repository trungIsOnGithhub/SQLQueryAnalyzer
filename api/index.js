// Node Modules
const cors = require('cors');
const express = require('express');

// File Modules
const router = require('./router/index.js');
const customMiddlewares = require('./middlewares/index.js');

const app = express();

app.use(bodyParser.json());
app.use(customMiddlewares);

router.setup(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT
  ,() => { console.log(`App running on port ${PORT}.`) }
);