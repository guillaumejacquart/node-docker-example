import express from "express";
import * as config from "./config";

// Init express
const app = express();

// Init MySQL Connection
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: config.get('db.host'),
  user: config.get('db.user'),
  password: config.get('db.password'),
  database: config.get('db.name')
});
connection.connect();

// Init redis connection
var redis = require("redis"),
  client = redis.createClient({
    host: config.get('redis.host')
  });

client.on("error", function (err) {
  console.log("Error " + err);
});

client.set("foo", "bar", redis.print);

// Init test routes

app.get("/", function (req, res) {
  res.send("Hello World from : " + req.connection.localAddress);
});

app.get("/db", (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    return res.json(results);
  });  
})

app.get("/redis", function (req, res) {
  client.get('foo', (err, reply) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({
      key: 'foo',
      value: reply
    });
  })
});

// Init API listening

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
