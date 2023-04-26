const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123',
  port: 5432,
});

let returnObject = {
  errorExplain: false,
  errorLog: false,
  errorQuery: false,
};

const prepareReturnObject = (req, res, next) => {
  returnObject.errorExplain = false;
  returnObject.errorLog = false;
  returnObject.errorQuery = false;
  next();
};

const modifyHeaders = (req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Credentials' : true,
    'Access-Control-Allow-Methods' : 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers' : 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  });
  // console.log("header modified");
  next();
};

// const logQuery = (req, res, next) => {
//   const { inputQuery } = req.body;
//   const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

//   const query = `INSERT INTO queries(time,content) VALUES (${timestamp},${inputQuery});`

//   pool.query(query, (error, result) => {
//     if(error) {
//       //error handling code
//       return;
//     }

//     res
//   });

//   // next();
// };

// const exec_get1 = (request, response) => {
//   // const { query } = request.body;
//   const query = "SELECT * FROM tab;";
//     // request.body['inquery']

//   pool.query(query, (error, result) => {
//     if(error) {
//       response.status(606).send(`bad query: ${query}`);
//       return;
//     }
//     exec_explain(response, query, result, () => { response.json(result); });
//     result['explain'] = 'vuivethanhcong3453';
//   })

//   console.log("dhuaisd");
// };

const execExplainForQuery = (request, response) => {
  // console.log(prevQuery)

  const queryToExplain  = request.body.query;

  console.log(request.body)

  if( queryToExplain.toLowerCase().indexOf('select') !== 0 ) {
    // returnObject.resultExplain = null;
    response.status(200).json( {...returnObject} );
    // next();
  }

  const query = "EXPLAIN ANALYZE " + queryToExplain;

  pool.query(query, (error, result) => {
    if(error) {
      // prev_resp.status(400);
      returnObject.errorExplain = true;
      response.status(200).json( {...returnObject} );
      return;
    }
    // prev_resp.status(201);
    // console.log(result)
    returnObject.resultExplain = result.rows;
    console.log(result.rows);

    // func();
    response.status(200).json( {...returnObject} );
  })

  // next();
};

const execQueryRequestPOST = (request, response, next) => {
  const { query } = request.body;

  // console.log("vcl: "+JSON.stringify(request.body));

  pool.query(query, (error, result) => {
    // let returnObject = {error:false};

    if(error) {
      returnObject.errorQuery = true;
      // return;
    }
    // console.log("dsadads |"+JSON.stringify(result)+"||"); 

    if(result) { returnObject.resultQuery = result.rows; }
    // execExplainForQuery(request, response);

    response.status(200).json( {...returnObject} );
  })

  // console.log("dhuaisd");
  // next();
};
  

module.exports = {
  prepareReturnObject,
  execExplainForQuery,
  execQueryRequestPOST,
  modifyHeaders
};