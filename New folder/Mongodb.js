
// var MongoClient = require('mongodb').MongoClient;
//
// MongoClient.connect("mongodb://cis550team:cis550mongo@18.219.153.255/cismongo", function(err, client) {
//   if(!err) {
//     //console.log("We are connected");
//     //db.collection('cismongo').find(db.cismongo.count())
//       var db = client.db('cismongo');
//
//     db.collection('cismongo').findOne({}, function (findErr, result) {
//       if (findErr) throw findErr;
//       console.log(result.loc);
//       client.close();
//     });
//   }
// });
