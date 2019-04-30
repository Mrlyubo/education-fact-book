//var app = angular.module('angularjsNodejsTutorial', []);
var app = angular.module('angularjsNodejsTutorial', ['nvd3']);


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

/**
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
/**
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
**/


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
//Find great school
app.controller('stateController', function($scope, $http) {

      $scope.states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
                       'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
                       'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
                       'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
                       'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
                       'DC', 'GU', 'PR'];

      function generateData(groups, points) {
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
      $scope.data = generateData(5,30);
      // $scope.toggle = true;
      function generateTrueData( backenddata ) {
                         console.log("BackEnddata length 3 = " + backenddata.length);
                         var data = [];
                         data.push({values:[]});
                         for (var j = 0; j < backenddata.length; j++) {
                             data[0].values.push({
                                      x: backenddata.score,
                                      y: backenddata.median_price
                            });
                         }
                          return data;
                      };

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
      $scope.affordable = {};
      $scope.refresh = function() {
          // console.log(" refresh called 2!");
          $scope.data = generateData(1,20);
          //$scope.data = $scope.affordable;
       };

      $scope.selectState = function() {
          var selectedState = $scope.selectedState;
          console.log("selectedState = " + selectedState);
          var req = $http.get('/school/'+ selectedState);
          req.success(function(data) {
              $scope.affordable = data;
              console.log("refresh called 1!");
              $scope.data = generateTrueData( $scope.affordable);

          });
          req.error(function(data) {
              console.log('err');
          });
      };
  });

app.controller('findHighSalaryController', function($scope, $http) {
        var request = $http.get('/stateName');
        request.success(function(data){
            $scope.stateName =  data;
            //console.log(data);
        });
        request.error(function(data){
            console.log('err');
        });

        $scope.Submit = function() {
        var request = $http.get('/findSalary/'+$scope.stateName);
        var industry = [];
        var degree= [];
        var income = [];
        request.success(function(data) {
         $scope.Topsalary = data;
         //console.log(data);
        // for (var i = 0; i < data.length; i++) {
        // var row = data[i];
        // industry.push(row.industry);
        // degree.push(row.Degreelevel);
        // income.push(row.AverageIncome);
        // }

        // console.log(industry);
        // $scope.industry = industry;
        // $scope.degree = degree;
        // $scope.income = income;

            });
            request.error(function(data){
                console.log('err');
            });
        };     
});



//Find Genres table
app.controller('getRankController', function($scope, $http) {
        var request = $http.get('/rankrange');
        request.success(function(data){
          //console.log(data);
            $scope.rankData = data;
        });
        request.error(function(data){
            console.log('err');
        });

    $scope.findRank= function(x) {
      var request = $http.get('/findrank/'+x);
      request.success(function(data) {
            //console.log(data);
            $scope.rankTable = data;
      });
      request.error(function(data){
          console.log('err');
      });
    }
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
   




