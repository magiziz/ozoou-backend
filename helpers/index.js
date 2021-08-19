const { Client } = require("pg");

const postgress = new Client({
  user: "postgres",
  host: "localhost",
  database: "test_database",
  password: "test",
  port: 5432,
});

module.exports = postgress;
