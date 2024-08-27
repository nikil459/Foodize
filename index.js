
// var con = require('./connection');
// var express = require("express");
// var app = express();
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))
// app.get('/', function (_req, res) {
//   res.sendFile(__dirname +'/signup.html');
// });
// app.post('/', function (req, res) {
//   console.log(req.body)
//   var name = req.body.name;
//   var phonenumber = req.body.phonenumber;
//   var email = req.body.email;
//   var password = req.body.password;

//   con.connect(function (error) {
//     if (error) throw error;
//     var sql = "insert into  signupdetails(name,phonenumber,email,password)values(?,?,?,?)";
//     con.query(sql, [name, phonenumber, email, password], function (error, result) {
//       if (error) throw error;
//       res.send('signup successfully' + result.insertId);
//     });
//   });
// });
// app.listen(6501);



var mysql = require("mysql");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root459",
  database: "foodize",
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (_req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  console.log(req.body);
  var name = req.body.name;
  var phonenumber = req.body.phonenumber;
  var email = req.body.email;
  var password = req.body.password;

  pool.getConnection(function (error, con) {
    if (error) {
      throw error;
    }

    var sql =
      "INSERT INTO signupdetails (name, phonenumber, email, password) VALUES (?, ?, ?, ?)";
    con.query(sql, [name, phonenumber, email, password], function (error, result) {
      con.release(); 

      if (error) {
        throw error;
      }

      // res.send("Signup successfully with ID: " + result.insertId);
      res.send("Signup successfully");
    });
  });
});

app.listen(6501, function () {
  console.log("Server is running on port 6501");
});



























// const express = require('express');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 5500; // Change this to your desired port

// // Middleware for parsing form data
// app.use(bodyParser.urlencoded({ extended: true }));

// // MySQL database configuration
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root459",
//   database: "foodize"
// });

// // Connect to the MySQL database
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database: ' + err.stack);
//     return;
//   }
//   console.log('Connected to the database as ID ' + db.threadId);
// });
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/signup.html');
// });
// // Handle form submissions
// app.post('/submit', (req, res) => {
//   const { name, phonenumber, email, password } = req.body;

//   // Insert data into the MySQL database
//   const sql = 'INSERT INTO signupdetails (name, phonenumber, email, password) VALUES (?, ?, ?, ?)';
//   const values = [name, phonenumber, email, password];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error('Error submitting data to the database: ' + err.stack);
//       res.status(500).send('Error submitting data to the database');
//       return;
//     }
//     console.log('Data submitted successfully.');
//     res.redirect('/'); // Redirect to a success page or another page
//   });
//   // db.end()
// });
// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
