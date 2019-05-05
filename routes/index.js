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

router.get('/general-stats', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'general-stats.html'));
});

router.get('/mongo-infor', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'mongo-infor.html'));
});

router.get('/school', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'school.html'));
});

router.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'test.html'));
});

router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
});


router.get('/dirPagination.tpl.html', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'dirPagination.tpl.html'));
});


router.get('/college', function(req, res) {
  var cid=req.query.cid;
  var q1="select Institution,Location,Institution_id from college_information where Institution_id="+cid+";";
  var result={};
  //var svg = d3.select("svg");

  connection.query(q1, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      result["cid"]=rows[0].Institution_id;
      result["cname"]=rows[0].Institution;
      result["location"]=rows[0].Location;
      res.render('college',result);

    }
  });

  
});


// To add a new page, use the templete below
/*
router.get('/routeName', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'fileName.html'));
});
*/

//Zezhong Yu
router.post('/subject_data',function(req,res){
  var cname=req.body.cname;
  var cid=req.body.cid;
  var result={};

  var q = "select * from the_bysubject_2019 where Institution_id="+cid+";";
  connection.query(q, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      result["the"]=rows;

      var q2 = "select * from qs_bysubject_2019 where Institution='"+cname+"';";
      connection.query(q2, function(err, rows, fields) {
        if (err) console.log(err);
        else {
          result["qs"]=rows;

          var q3 = "select * from arwu_bysubject_2018 where Institution='"+cname+"';";
          connection.query(q3, function(err, rows, fields) {
            if (err) console.log(err);
            else {
              result["arwu"]=rows;
              res.json(result);
            }
          })
        }

      })
    }
  })

})

router.post('/plot_data', function(req, res) {

  var cname=req.body.cname;
  var cid=req.body.cid;
  var result={};
  
  var q="select * from "
      +"(select Institution_id,Rank as '2015' from the_general_2015 where Institution_id='"+cid
      +"') as t1 natural join " + "(select Institution_id,Rank as '2016' from the_general_2016 where Institution_id='"+cid
      +"') as t2 natural join " + "(select Institution_id,Rank as '2017' from the_general_2017 where Institution_id='"+cid
      +"') as t3 natural join " + "(select Institution_id,Rank as '2018' from the_general_2018 where Institution_id='"+cid
      +"') as t4 natural join " + "(select Institution_id,Rank as '2019' from the_general_2019 where Institution_id='"+cid +"') as t5;";
  connection.query(q, function(err, rows, fields) {

    if (err) console.log(err);
    else {
      //console.log(rows);
      result["the"]=rows;

      var q2="select * from "
      +"(select Institution,Rank as '2015' from qs_general_2015 where Institution='"+cname
      +"') as t1 natural join " + "(select Institution,Rank as '2016' from qs_general_2016 where Institution='"+cname
      +"') as t2 natural join " + "(select Institution,Rank as '2017' from qs_general_2017 where Institution='"+cname
      +"') as t3 natural join " + "(select Institution,Rank as '2018' from qs_general_2018 where Institution='"+cname
      +"') as t4 natural join " + "(select Institution,Rank as '2019' from qs_general_2019 where Institution='"+cname +"') as t5;";
      connection.query(q2, function(err, rows, fields) {
        if (err) console.log(err);
        else{
          result["qs"]=rows;

          var q3="select * from "
          +"(select Institution,Rank as '2015' from arwu_general_2014 where Institution='"+cname
          +"') as t1 natural join " + "(select Institution,Rank as '2016' from arwu_general_2015 where Institution='"+cname
          +"') as t2 natural join " + "(select Institution,Rank as '2017' from arwu_general_2016 where Institution='"+cname
          +"') as t3 natural join " + "(select Institution,Rank as '2018' from arwu_general_2017 where Institution='"+cname
          +"') as t4 natural join " + "(select Institution,Rank as '2019' from arwu_general_2018 where Institution='"+cname +"') as t5;";
          connection.query(q3, function(err, rows, fields) {
            if (err) console.log(err);
            else{
              result["arwu"]=rows;
              res.json(result);
            }
            
          });
        }

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

router.post('/get_hint', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username
  //console.log(req.body)
  var query="select Institution,Institution_id from college_information where Institution like '%"+req.body.name+"%';"
  connection.query(query, function(err, rows, fields) {
    console.log(rows);
    if (err) console.log('error: ', err);
    else {
        res.json({
          "result": 'success',
          "names": rows
        });
       
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

//Bo Lyu
router.get('/school/:selectedState', function(req, res) {
    //console.log("selectedState BackEnd called!");
    var selectedStates = req.params.selectedState;
    //console.log("selectedStates 1= " + selectedStates);
    var statesChunks = selectedStates.split('&');
    //console.log("statesChunks 2= " + statesChunks);
    var selectedStatesStr  = "";
    for (var i = 0; i < statesChunks.length-1; i++ ) {
        selectedStatesStr += "'" + statesChunks[i] + "',";
    }
    selectedStatesStr = selectedStatesStr.substring(0, selectedStatesStr.length -1);
    //console.log("selectedStatesStr 3= " + selectedStatesStr);
    //console.log("selectedStatesStr length 3.0= " + selectedStatesStr.length);

    var selectedState = "'TX','AZ'";
    //console.log("selectedState 3.1 = " + selectedState);

    //var selectedState = selectedStatesStr;
    var query = " SELECT T6.leaid, ROUND(AVG(score), 3) AS score, T3.zipcode, T3.median_price, T3.city, T3.state, ROUND(score / median_price * 10000000,3)  AS ratio, T3.population "+
                    " FROM (SELECT * FROM (SELECT S.leaid, AVG(S.mn_all) AS score FROM school_rating S WHERE mn_all > 0 GROUP BY S.leaid) T5 NATURAL JOIN  "+
                         " (SELECT D.zipcode, D.leaid FROM district_city D) T4) T6,  "+
                         " (SELECT * FROM (SELECT H.zipcode, H.median_price FROM house_price H) T1 NATURAL JOIN  "+
                         " (SELECT Z.city, Z.zipcode, Z.state FROM zip_city Z WHERE Z.state in ("+selectedStatesStr+") ) T2 NATURAL JOIN population P) T3 "+
                    " WHERE  T6.zipcode = T3.zipcode  "+
                    " GROUP BY T3.city "+
                    " ORDER BY ratio DESC ";
                    //" LIMIT 50;";
    var options = [selectedState];
    console.log("query 4= " + query);
    connection.query(query, options, function(err, rows, fields) {
        if (err) console.log(err);
        else {
           console.log("query = " + query);
          res.json(rows);
        }
    });
});

//Shuai Zheng
router.get('/industry', function(req,res) {
  var query = "SELECT DISTINCT Industry FROM Occupation";
  //console.log("query", query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        //console.log(rows);
        res.json(rows);
    }
  });
});


router.get('/stats/:industry', function(req,res) {

  var query = "SELECT Gender, Race, Title,COUNT(DISTINCT(PersonID)) AS AMOUNT, AVG(Income) AS Average_Income FROM People P JOIN Occupation O On P.JobID = O.JobID AND Industry = '"  + req.params.industry + "' AND P.PersonID IN (SELECT P.PersonID FROM People P JOIN State S ON P.StateID = S.StateID WHERE OpportunityRank >= 25) GROUP BY Gender, Race, Title HAVING Average_Income >100000 ORDER BY AMOUNT DESC";
  //console.log("query", query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
       //console.log(rows);
        res.json(rows);
    }  
    });
});




router.get('/stateName', function(req,res) {
  var query = "SELECT DISTINCT stateName FROM State";
  //console.log("query", query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        //console.log(rows);
        res.json(rows);
    }
  });
});

router.get('/rankrange', function(req,res) {
  var query = "SELECT DISTINCT(OpportunityRank - OpportunityRank % 10) AS rank FROM State WHERE (OpportunityRank -  OpportunityRank % 10) != 0 ORDER BY rank";
  //console.log("query", query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        //console.log(rows);
        res.json(rows);
    }
  });
});



router.get('/findrank/:rank', function(req,res) {

  var query = "SELECT StateName, QualityofLifeRank, avg(income) AS Average_Income FROM People P JOIN State S ON P.StateID = S.StateID JOIN Occupation O ON O.JobID = P.JobID WHERE OpportunityRank<='"  + req.params.rank + "' GROUP BY StateName,QualityofLifeRank HAVING count(distinct(industry)) = (SELECT count(distinct(industry)) FROM Occupation) ORDER BY avg(income) DESC, QualityofLifeRank ASC";
  //console.log("query", query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
       //console.log(rows);
        res.json(rows);
    }  
    });
});



router.get('/findSalary/:stateName', function(req,res) {
  var query = "select Industry, Degreelevel, Major, avg(income) as AverageIncome from People p join Occupation o on p.JobID = o.JobID join Education e on o.JobID = e.JobID join State s on p.StateID = s.StateID where stateName = '"  + req.params.stateName + "' group by industry, Degreelevel order by avg(income) desc";
  //console.log("query", query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      //console.log(rows);
      res.json(rows);
    }  
    });
});



router.get('/findEduIncCorr', function(req,res) {
  var query = "SELECT TRUNCATE( (count(*) * sum(EducationRank * Income) - sum(EducationRank) * sum(Income)) / (sqrt(count(*) * sum(EducationRank * EducationRank) - sum(EducationRank) * sum(EducationRank)) * sqrt(count(*) * sum(Income * Income) - sum(Income) * sum(Income))),4) AS EduIncCorr, TRUNCATE((count(*) * sum(HealthcareRank * EducationRank) - sum(HealthcareRank) * sum(EducationRank)) / (sqrt(count(*) * sum(HealthcareRank * HealthcareRank) - sum(HealthcareRank) * sum(HealthcareRank)) * sqrt(count(*) * sum(EducationRank * EducationRank) - sum(EducationRank) * sum(EducationRank))),4) AS HeaEduCorr FROM People P JOIN State S ON P.StateID = S.StateID";
  //console.log("query", query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      //console.log(rows);
      res.json(rows);
    }  
    });
});


router.get('/findHeaIncCorr', function(req,res) {
   var query = "SELECT TRUNCATE((count(*) * sum(HealthcareRank * Income) - sum(HealthcareRank) * sum(Income)) / (sqrt(count(*) * sum(HealthcareRank * HealthcareRank) - sum(HealthcareRank) * sum(HealthcareRank)) * sqrt(count(*) * sum(Income * Income) - sum(Income) * sum(Income))),4) AS HeaIncCorr, TRUNCATE((count(*) * sum(OpportunityRank * EducationRank) - sum(OpportunityRank) * sum(EducationRank)) / (sqrt(count(*) * sum(OpportunityRank * OpportunityRank) - sum(OpportunityRank) * sum(OpportunityRank)) * sqrt(count(*) * sum(EducationRank * EducationRank) - sum(EducationRank) * sum(EducationRank))),4) AS EduOppCorr FROM People P JOIN State S ON P.StateID = S.StateID";
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
     // console.log(rows);
      res.json(rows);
    }  
    });
});


router.get('/findOppIncCorr', function(req,res) {
   var query = "SELECT TRUNCATE((count(*) * sum(OpportunityRank * Income) - sum(OpportunityRank) * sum(Income)) / (sqrt(count(*) * sum(OpportunityRank * OpportunityRank) - sum(OpportunityRank) * sum(OpportunityRank)) * sqrt(count(*) * sum(Income * Income) - sum(Income) * sum(Income))),4) AS OppIncCorr, TRUNCATE((count(*) * sum(QualityofLifeRank * EducationRank) - sum(QualityofLifeRank) * sum(EducationRank)) / (sqrt(count(*) * sum(QualityofLifeRank * QualityofLifeRank) - sum(QualityofLifeRank) * sum(QualityofLifeRank)) * sqrt(count(*) * sum(EducationRank * EducationRank) - sum(EducationRank) * sum(EducationRank))),4) AS EduQuaCorr FROM People P JOIN State S ON P.StateID = S.StateID";
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
     // console.log(rows);
      res.json(rows);
    }  
    });
});

router.get('/findQuaIncCorr', function(req,res) {
   var query = "SELECT TRUNCATE((count(*) * sum(QualityofLifeRank * Income) - sum(QualityofLifeRank) * sum(Income)) / (sqrt(count(*) * sum(QualityofLifeRank * QualityofLifeRank) - sum(QualityofLifeRank) * sum(QualityofLifeRank)) * sqrt(count(*) * sum(Income * Income) - sum(Income) * sum(Income))),4) AS QuaIncCorr, TRUNCATE((count(*) * sum(HealthcareRank * OpportunityRank) - sum(HealthcareRank) * sum(OpportunityRank)) / (sqrt(count(*) * sum(HealthcareRank * HealthcareRank) - sum(HealthcareRank) * sum(HealthcareRank)) * sqrt(count(*) * sum(OpportunityRank * OpportunityRank) - sum(OpportunityRank) * sum(OpportunityRank))),4) AS HeaOppCorr FROM People P JOIN State S ON P.StateID = S.StateID";
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      //console.log(rows);
      res.json(rows);
    }  
    });
});

//Rui Li
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

router.post('/sims_go', function(req, res) {
  console.log('sims_go called');
  console.log(req.body.state);
  var state = req.body.state;
  var num = req.body.num
  var query = "select name, state from School where state = '"+state+"' LIMIT "+num+",1;";
  connection.query(query, function(err, rows, fields) {
      if (err) console.log(err);
      else {
        res.json(rows);
      }
  });
});

router.get('/other_state', function(req,res) {
  console.log('other_state called');
  var query = "select State from Abbreviation ORDER BY RAND() LIMIT 1;";
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      //console.log(rows);
      res.json(rows);
    }  
    });
});
router.get('/getnum/:state', function(req,res) {
  console.log('getnum called');
  var s = req.params.state;
  var query = "select count from State_Count where State = '"+s+"';";
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      //console.log(rows);
      res.json(rows);
    }  
    });
});

router.get('/sims_rand', function(req,res) {
  console.log('sims_rand called');
  var query = "select State from Abbreviation ORDER BY RAND() LIMIT 3,1;";
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      //console.log(rows);
      res.json(rows);
    }  
    });
});



module.exports = router;
