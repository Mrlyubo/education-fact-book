var express = require('express'); //import package
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Bo Lyu
var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://cis550team:cis550mongo@18.219.153.255/cismongo";

const cors = require('cors');

app.use(cors());


var bodyParser = require('body-parser')


app.use(express.urlencoded({extended: true})); 
app.use(express.json());  


var fs = require('fs');

// app.get('/data/:var1', function(req,res){
//   console.log(req.params.var1);



app.get('/data', function(req,res){

  var salary = req.query.salary;
  var salarynum = Number(salary);
  // console.log(req.query);
  var bachelor = req.query.bachelor;
  var bachelornum = Number(bachelor)/100*3371;
  var master = req.query.master;
  var masternum = Number(master)/100*2650;
  var phd = req.query.phd;
  var phdnum = Number(phd)/100*1118;

  MongoClient.connect(url,{useNewUrlParser: true}, function(err,client){
  if(!err) {
    var db = client.db('cismongo');

    db.collection('cismongo').find({"Average_Income": {$gte: salarynum}, "Education_Level.Bachelor_Degree": {$gte: bachelornum},  
      "Education_Level.Master_Degree": {$gte: masternum}, "Education_Level.Phd_Degree": {$gte: phdnum}}, 
      {"_id": 0, "loc": 1, "State_Name": 1, "Average_Income":1}).toArray(function (findErr, result) {
      if (findErr) throw findErr;
      res.json(result);
      client.close();
    });
  }
 });
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen('8081', function() {
  console.log('Server running on port 8081');
});

module.exports = app;
