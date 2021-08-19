// Setting up the dependencies
const express = require("express");
const postgress = require("../helpers/connection");
const router = express.Router();

router.get("/", (req, res) => {
  postgress
    .query(userCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
});

module.exports = router;
