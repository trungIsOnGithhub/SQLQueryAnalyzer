require('dotenv').config('../.env');
const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.PG_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.PG_PASSWORD,
  port: process.env.DB_PORT
});

modules.export = function(sql, param) {
    return pool.query(sql, param);
}