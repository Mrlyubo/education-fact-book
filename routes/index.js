var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'cis550db1.cjrslxs9vdnj.us-east-2.rds.amazonaws.com',
  user: 'cis550project1',
  password: 'cis550sharekey',
  database: 'zipcode'
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

router.get('/school', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'school.html'));
});

router.get('/college', function(req, res) {
  var cid=req.query.cid;
  var q1="select Institution,Location from college_information where Institution_id="+cid+";";
  var result={};
  //var svg = d3.select("svg");

  connection.query(q1, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      result["cname"]=rows[0].Institution;
      result["location"]=rows[0].Location;

      var q2="(select Rank from the_general_2015 where Institution_id='"+cid
      +"') union all " + "(select Rank from the_general_2016 where Institution_id='"+cid
      +"') union all "  + "(select Rank from the_general_2017 where Institution_id='"+cid
      +"') union all " + "(select Rank from the_general_2018 where Institution_id='"+cid
      +"') union all " + "(select Rank from the_general_2019 where Institution_id='"+cid +"');";
      connection.query(q2, function(err, rows, fields) {

        if (err) console.log(err);
        else {
          console.log(rows);
          result["the_2015"]=rows[0].Rank;
          result["the_2016"]=rows[1].Rank;
          result["the_2017"]=rows[2].Rank;
          result["the_2018"]=rows[3].Rank;
          result["the_2019"]=rows[4].Rank;

          res.render('college',result);
        }
      });


    }
  });

  
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

router.post('/search', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username
  //console.log(req.body)
  var query="select Institution_id from college_information where Institution='"+req.body.name+"';"
  connection.query(query, function(err, rows, fields) {
    console.log(rows);
    if (err) console.log('error: ', err);
    else {
      if(rows.length==0){
        res.json({
          result: 'fail'
        });
      }else{
        res.json({
          "result": 'success',
          "cid": rows[0].Institution_id
        });
      }
      
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

router.get('/top100_avg', function(req, res) {
  console.log("top100 avg");
  var query = "select the.Institution,Location,QS_Rank,THE_Rank, ARWU_Rank, "
  +"USNEWS_Rank, (QS_Rank+THE_Rank+ARWU_Rank+USNEWS_Rank)/4 as Average FROM "
  +"(((select Institution,Location,Rank as THE_Rank from the_general_2019) as the "
  +"NATURAL JOIN (select Institution,Rank as QS_Rank from qs_general_2019) as qs) "
  +"NATURAL JOIN (select Institution,Rank as ARWU_Rank from arwu_general_2018) as arwu) "
  +"NATURAL JOIN (select Institution,Rank as USNEWS_Rank from usnews_general_2019) as usnews "
  +"ORDER BY Average ASC Limit 100"; 
    connection.query(query, function(err, rows, fields) {
    if (err) console.log('error: ', err);
    else {
      //console.log(rows);
      res.json(rows);
    }
  });
});

router.get('/top100_grow', function(req, res) {
  console.log("top100 grow");
  var query = "select Institution, Location, Rank_2015, Rank_2019, growth from "
  +"(select Institution_id, Location, Rank_2015, Rank_2019, Rank_2015-Rank_2019 as growth from"
  +"(select Institution_id, Location, Rank as Rank_2015 from the_general_2015) as temp2015 "
  +"NATURAL JOIN (select Institution_id, Rank as Rank_2019 from the_general_2019) as temp2019 "
  +"order by growth desc limit 100) temp0 "
  +"NATURAL JOIN (select Institution_id,Institution from college_information) temp1;";
    connection.query(query, function(err, rows, fields) {
    if (err) console.log('error: ', err);
    else {
      //console.log(rows);
      res.json(rows);
    }
  });
});

router.get('/school/:selectedState', function(req, res) {
    console.log("best_of BackEnd called!");
    var selectedState = req.params.selectedState;
    console.log("selectedState = " + selectedState);
    var query = "SELECT S.leaid, AVG(S.mn_all) AS score, D.zipcode, H.median_price, Z.city, Z.state"+
                " FROM school_rating S, district_city D, house_price H, zip_city Z"+
                " WHERE Z.state = 'TX'  AND D.leaid = S.leaid AND H.zipcode = D.zipcode AND H.zipcode = Z.zipcode"+
                " GROUP BY D.leaid;";
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
          res.json(rows);
        }
    });
});

router.get('/getallraces', function(req, res) {
  console.log("getting all races");
  var query = "SELECT DISTINCT Race FROM cis550project1.People;";
  connection.query(query, function(err, rows, fields) {
      if (err) console.log(err);
      else {
        res.json(rows);
      }
  });
});

router.get('/getallgenders', function(req, res) {
  console.log("getting all genders");
  var query = "SELECT DISTINCT Gender FROM cis550project1.People;";
  connection.query(query, function(err, rows, fields) {
      if (err) console.log(err);
      else {
        res.json(rows);
      }
  });
});

router.get('/getallstates', function(req, res) {
  console.log("getting all genders");
  var query = "SELECT StateName FROM (SELECT DISTINCT StateID FROM cis550project1.People) AS A JOIN cis550project1.State ON A.StateID = cis550project1.State.StateID;";
  connection.query(query, function(err, rows, fields) {
      if (err) console.log(err);
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
