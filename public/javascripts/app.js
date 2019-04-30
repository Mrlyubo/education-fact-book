var app = angular.module('angularjsNodejsTutorial', []);

app.controller('loginController', function($scope, $http) {
  $scope.verifyLogin = function() {
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);

    var request = $http({
      url: '/login',
      method: "POST",
      data: {
        'username': $scope.username,
        'password': $scope.password
      }
    })

    request.success(function(response) {
      // success
      // console.log('response');
      console.log(response);
      if (response.result === "success") {
        // After you've written the INSERT query in routes/index.js, uncomment the following line
      	window.location.href = "http://localhost:8081/dashboard"
      }
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
  };
});

app.controller('dashboardController', function($scope, $http) {
  // normal variables
  var request = $http.get('/getUser');

  // Angular scope variables
  request.success(function(data){
    console.log("user succeed");
    $scope.userData=data;
  });

  request.error(function(data){
    console.log('err');
  });

  var request2 = $http.get('/getGenre');

  // Angular scope variables
  request2.success(function(data){
    console.log("genre succeed");
    console.log(data)
    $scope.genre=data;
  });

  request2.error(function(data){
    console.log('err');
  });

  $scope.getThisGenre = function(param) {
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);
    console.log(param);

    var request = $http({
      url: '/getMovieByGenre',
      method: "POST",
      data: {
        'genre': param
      }
    })

    request.success(function(response) {
      // success
      // console.log('response');
      console.log(response);
      $scope.movies=response;
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });

  };
});

app.controller('top100avgController', function($scope, $http) {
  // normal variables
    //console.log('submit here')
    var request = $http.get('/top100_avg');
    var even=[];
    var odd=[];

    request.success(function(response) {
      // success
      // console.log('response');
      //console.log(response);
      //$scope.randomMovies=response;
      var rows=response;

      for(var i=0;i<rows.length;i++){
        rows[i]['id']=i+1;
      }

      console.log(rows);

      $scope.top100avg=rows;
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });

    $scope.search = function() {
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);

    var search_request = $http({
      url: '/search',
      method: "POST",
      data: {
        'name': $scope.college_name,
      }
    })

    search_request.success(function(response) {
      // success
      // console.log('response');
      console.log(response);
      if (response.result === "success") {
        // After you've written the INSERT query in routes/index.js, uncomment the following line
        //window.location.href = "http://localhost:8081/dashboard"
        window.location.href = "/college?cid="+response.cid;
      }else{
        alert("No such university. Please check the spell.");
      }
    });

    search_request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
    }
});

app.controller('top100growController', function($scope, $http) {
  // normal variables
    //console.log('submit here')
    var request = $http.get('/top100_grow');

    request.success(function(response) {
      // success
      // console.log('response');
      //console.log(response);
      //$scope.randomMovies=response;
      var rows=response;

      for(var i=0;i<rows.length;i++){
        rows[i]['id']=i+1;
      }

      console.log(rows);

      $scope.top100grow=rows;
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
});


app.controller('rankplot', function($scope, $http) {
  // normal variables
    //console.log('submit here')
    /**
    var cname=document.getElementById('cname').innerHTML;
    var request = $http({
      url: '/plot_data',
      method: "POST",
      data: {
        'cname': cname
      }
    })**/

    $scope.options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Time (ms)'
                },
                yAxis: {
                    axisLabel: 'Voltage (v)',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: -10
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            },
            title: {
                enable: true,
                text: 'Title for Line Chart'
            },
            subtitle: {
                enable: true,
                text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            },
            caption: {
                enable: true,
                html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
                css: {
                    'text-align': 'justify',
                    'margin': '10px 13px 0px 7px'
                }
            }
        };

});


// Template for adding a controller
/*
app.controller('dummyController', function($scope, $http) {
  // normal variables
  var dummyVar1 = 'abc';

  // Angular scope variables
  $scope.dummyVar2 = 'abc';

  // Angular function
  $scope.dummyFunction = function() {

  };
});
*/

var ALjson = [
    {leaid: 100007, score: 0.30538333, zipcode: 35243, median_price: 3.06200, city: "BIRMINGHAM"},
    {leaid: 100008, score: 0.58085, zipcode: 35758, median_price: 2.98000, city: "MADISON"},
    {leaid: 100011, score: -0.31563, zipcode: 35094, median_price: 1.75000, city: "LEEDS"},
    {leaid: 100013, score: 0.25671667, zipcode: 35173, median_price: 2.68000, city: "TRUSSVILLE"},
    {leaid: 100090, score: -0.61503333, zipcode: 36206, median_price: .92000, city: "ANNISTON"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 1.27000, city: "ATHENS"},
]

//Find great school
app.controller('stateController', function($scope, $http) {

      $scope.states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
                       'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
                       'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
                       'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
                       'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
                       'DC', 'GU', 'PR'];

      function generateData(groups, points) { //# groups,# points per group
                           var data = [],
                               shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
                               random = d3.random.normal();

                           for (var i = 0; i < groups; i++) {
                               data.push({
                                   key: 'Group ' + i,
                                   values: []
                               });

                               for (var j = 0; j < points; j++) {
                                   data[i].values.push({
                                       x: random(),
                                       y: random(),
                                       size: Math.random(),
                                       shape: shapes[j % 6]
                                   });
                               }
                           }
                           return data;
                       };

       function generateNewData( backenddata ) { //# groups,# points per group
                            var data = [],
                                shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
                                random = d3.random.normal();

                            for (var i = 0; i < backenddata.length; i++) {
                                data.push({
                                    key: backenddata[i].city,
                                    values: []
                                });


                                data[i].values.push({
                                        x: backenddata[i].score,
                                        y: backenddata[i].median_price,
                                        size: Math.random(),
                                        shape: shapes[i % 6]
                                    });

                            }
                            return data;
                        };

      $scope.data = generateData(5,30);
      $scope.options = {
                               chart: {
                                   type: 'scatterChart',
                                   height: 450,
                                   width: 800,
                                   color: d3.scale.category10().range(),
                                   scatter: {
                                       onlyCircles: true
                                   },
                                   showDistX: true,
                                   showDistY: true,
                                   tooltipContent: function(key) {
                                       return '<h3>' + key + '</h3>';
                                   },
                                   duration: 350,
                                   xAxis: {
                                       axisLabel: 'School Rating',
                                       tickFormat: function(d){
                                           return d3.format('.02f')(d);
                                       }
                                   },
                                   yAxis: {
                                       axisLabel: 'Median House Price',
                                       tickFormat: function(d){
                                           return d3.format('.02f')(d);
                                       },
                                       axisLabelDistance: -5
                                   },
                                   zoom: {
                                       //NOTE: All attributes below are optional
                                       enabled: false,
                                       scaleExtent: [1, 10],
                                       useFixedDomain: false,
                                       useNiceScale: false,
                                       horizontalOff: false,
                                       verticalOff: false,
                                       unzoomEventType: 'dblclick.zoom'
                                   }
                               }
                            };

      $scope.refresh = function() {
          //$scope.data = generateData(1,20);
          $scope.data = generateNewData(ALjson);
          $scope.api.update();
      };

      $scope.selectState = function() {

          $scope.api.update();
          var selectedState = $scope.selectedState;
          $scope.checked = false;
          var req = $http.get('/school/'+ selectedState);
          req.success(function(response) {
              $scope.checked = true;
              $scope.affordable = response;
              $scope.data= generateNewData(response);
              $scope.api.update();
          });
          req.error(function(data) {
              console.log('err');
          });
      };
  });


// Controlloer for the Stremming data
app.controller('MainCtrl', function($scope) {
      $scope.options = {
          chart: {
              type: 'lineChart',
              margin : { right: 90 },
              x: function(d){ return d.x; },
              y: function(d){ return d.y; },
              xAxis: {
                  axisLabel: 'Time'
              },
              yAxis: {
                  axisLabel: 'Random Number',
                  tickFormat: function(d){
                      return d3.format(',.4f')(d);
                  }
              },
              rightAlignYAxis: true,
              transitionDuration: 500
          }
      };

      $scope.data = [{
          key: "Large Data",
          color: "orange",
          values: [
              {
                  x: 1,
                  y: 1
              }]
      }];

      // This is for timing
      var ttime = 0;

      // Run when called
      var run = true;

      // Call the populate function every second
      setInterval(function () {
          if (!run) return;
          $scope.data[0].values = [];

          // Generate a random value array and dump them in the data set
          for (i = 0; i < 5000; i++) {
              $scope.data[0].values.push({
                  x: i,
                  y: Math.random()
              });

          }

          /* Determine the amount of time required to execute the chart
           * update.
           */
          var now1 = new Date();
          $scope.api.update();
          var now2 = new Date();

          ttime = now2-now1;
          document.getElementById("timeExe").textContent=ttime;
      }, 2000);

      d3.select("#start-stop-button").on("click", function () {
          run = !run;
      });
  });
app.controller('simsController', function($scope, $http) {
  // $scope.races = ['White', 'Black or African American', 'Asian', 'Hispanic or Latino'];
  console.log("simsController called!");
  var request1 = $http.get('/getallraces');
    request1.success(function(data1) {
        console.log(data1);
        $scope.races = data1;
    });
    request1.error(function(data1) {
        console.log('err occured in sims');
    });
  var request2 = $http.get('/getallgenders');
    request2.success(function(data2) {
        $scope.genders = data2;
    });
    request2.error(function(data2) {
        console.log('err occured in sims');
    });
  var request3 = $http.get('/getallstates');
    request3.success(function(data3) {
        $scope.states = data3;
    });
    request3.error(function(data3) {
        console.log('err occured in sims');
    });
});
