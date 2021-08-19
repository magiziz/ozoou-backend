// Dependencies
const express = require("express");
const app = express();
const postgress = require("./helpers/connection");
const router = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");

// Body parser and Cors middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ urlencoded: true }));
app.use(cors());

// postgress connect
postgress.connect();

app.use("/oozou", router);

app.listen(3001, () => console.log("Connected to PORT 5000"));
