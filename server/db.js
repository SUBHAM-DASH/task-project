const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.USER,
  host: "localhost",
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  max: 5,
  connectionTimeoutMillis: 2000,
  idleTimeoutMillis: 20000,
  allowExitOnIdle: false,
});

function executeQuery(query) {
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results) => {
      if (err) {
        console.log(err.message);
        reject(err);
      } else {
        resolve(results.rows);
      }
    });
  });
}

function executeQueryWithParams(query, values) {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.rows);
      }
    });
  });
}

module.exports = { executeQuery, executeQueryWithParams };
