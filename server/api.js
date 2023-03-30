const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432,
});

// const getAll = (request, response) => {
//   const query = 'SELECT name..da FrOM users WHere id=1';
//   pool.query(query, (error, results) => {
//     if (error) {
//       response.status(404).send(`bad query: ${query}`);
//       return;
//     }
//     response.status(200).json(results.rows)
//   })
// }

const execQuery = (request, response) => {
  // const { query } = request.body;
  const query = "SELECT * FROM administrative_regions;";
  response.set({
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Credentials' : true,
    'Access-Control-Allow-Methods' : 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers' : 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers' });
    // request.body['inquery']

  pool.query(query, (error, result) => {
    if(error) {
      response.status(606).send(`bad query: ${query}`);
      return;
    }
    response.status(201).json(result.rows);
  })

  console.log("dhuaisd");
};

module.exports = {
  // getAll,
  // getById,
  // createNew,
  // deleteById,
  execQuery
};