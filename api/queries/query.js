const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123',
  port: 5432,
});

const execExplainForQuery = (request, response) => {
  // console.log(prevQuery)
  const returnObject = request.queresult;

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
  const returnObject = request.queresult;

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
  execExplainForQuery,
  execQueryRequestPOST
};