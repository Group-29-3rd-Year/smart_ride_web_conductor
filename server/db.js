const Pool = require("pg").Pool

const pool = new Pool({
  user: "postgres",
  password: "Dimuthu97@",
  host: "localhost",
  port: 5432,
  database: "smartride",
});

module.exports = pool;