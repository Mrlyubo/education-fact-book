var app = angular.module('angularjsNodejsTutorial', ['nvd3']);

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

        $scope.data = [{
          values:[{x:1999,y:1,series:0},{x:1999,y:1,series:0},{x:1999,y:1,series:0}],
          key:"test", color="#2ca02c"
        }];


     
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
//Q4
app.controller('stateController', function($scope, $http) {

      $scope.states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
                       'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
                       'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
                       'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
                       'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
                       'DC', 'GU', 'PR'];
      console.log("stateController called!");
      $scope.selectState = function() {
          var selectedState = $scope.selectedState;
          console.log("selectedState = " + selectedState);
          var req = $http.get('/school/'+selectedState);
          req.success(function(data) {
              $scope.affordable = data;
          });
          req.error(function(data) {
              console.log('err');
          });
      };
<<<<<<< HEAD
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


=======

});

>>>>>>> bcd45ad5adfe5fa185e2894c2f58d9c4bb6cae07
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
<<<<<<< HEAD
});
   




=======
  // $scope.getRaces = function() {
  //     var req = $http.get('/getallraces');
  //     req.success(function(data) {
  //         $scope.races = data;
  //     });
  //     req.error(function(data) {
  //         console.log('err occured in sims');
  //     });
  // };

});
>>>>>>> bcd45ad5adfe5fa185e2894c2f58d9c4bb6cae07
