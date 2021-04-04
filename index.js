require("dotenv").config();
const express = require('express');
const route = express();
const port = process.env.PORT || 4000;

const mariadb = require("mariadb/callback");
const conn = mariadb.createConnection({
  host: process.env.DB_HOST || "mydb.com",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PWD || "",
});
conn.query("SELECT 1 as val", (err, rows) => {
  console.log(rows); //[ {val: 1}, meta: ... ]
  conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"], (err, res) => {
    console.log(">>", res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    conn.end();
  });
});

route.get('/', (req, res) => {
    res.send('hello word')
})

route.listen(port, () => {
    console.log(`my app is running at http://localhost:${port}`);
})

module.exports = route;