
// var express = require('express');
// var path = require('path');
// var bodyParser = require('body-parser');
// var MongoClient = require('mongodb').MongoClient;
// var application = express();
// var url = "mongodb://cis550team:cis550mongo@18.219.153.255/cismongo";
// var str = "";
//
//
//
// application.get('/data', function(req,res){
//   MongoClient.connect(url, function(err,client){
//   if(!err) {
//     var db = client.db('cismongo');
//     db.collection('cismongo').find({}).toArray(function (findErr, result) {
//       if (findErr) throw findErr;
//       res.json(result);
//       client.close();
//     });
//   }
//  });
// })
//
// var server = application.listen(8081, function() {});
