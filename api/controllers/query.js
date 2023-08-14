const db = require('../config/db/js');
const validate = require('./validation/query.js');

async function queryRun() {
  let result = null;

  try {
    result = await db.query(sqlExplain);
  } catch(error) {
    console.log(error); // replace with more formal logging
  }

  if(!result) {
    return {
      status: 500,
      err_msg: "unexpected error"
    }
  }

  return {
    status: 200,
    msg: "success",
    data: result.rows
  }
}

async function explain(request, response) {
  if(validate(request)) {
    return response.status(400).json({ err_msg: "bad request" });
  }

  const sqlExplain = "EXPLAIN ANALYZE " + request.body.query;

  const result = await queryRun(sqlExplain);

  response.status(result.status).json(result);
};

async function execute(request, response, next) {
  if(validate(request)) {
    return response.status(400).json({ err_msg: "bad request" });
  }

  const result = await queryRun(request.body.query);

  response.status(result.status).json(result);
};
  

module.exports = {
  execute,
  explain
};