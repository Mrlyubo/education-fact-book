var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'cis550db1.cjrslxs9vdnj.us-east-2.rds.amazonaws.com',
  user: 'cis550project1',
  password: 'cis550sharekey',
  database: 'cis550project1'
});

connection.connect(function(err) {
  if (err) {
    console.log("Error Connection to DB" + err);
    return;
  }
  console.log("Connection established...");
});

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/rank', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'college_rank.html'));
});

router.get('/game', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'start_a_family.html'));
});

router.get('/income', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'income.html'));
});

router.get('/bo', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'Lv_bo_homework.html'));
});


// To add a new page, use the templete below
/*
router.get('/routeName', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'fileName.html'));
});
*/

// Login uses POST request
router.post('/login', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username

  var query = "REPLACE into User values('"+req.body.username+"','"+req.body.password+"');";
/* Write your query here and uncomment line 21 in javascripts/app.js*/
  	connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success'
      });
    }
  });
});

router.post('/getMovieByGenre', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username
  console.log(req.body.genre)

  var query = "select title,rating,vote_count from Genres g, Movies m "
  +"where g.movie_id=m.id and g.genre='"
  +req.body.genre+"' order by rating desc, vote_count desc limit 10;";
    connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('error: ', err);
    else {
      res.json(rows);
    }
  });
});






// template for GET requests
/*
router.get('/routeName/:customParameter', function(req, res) {

  var myData = req.params.customParameter;    // if you have a custom parameter
  var query = '';

  // console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});
*/

module.exports = router;
