const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "orgDb",
    password: "yash05062004",
    port: 5432
});

module.exports = pool;