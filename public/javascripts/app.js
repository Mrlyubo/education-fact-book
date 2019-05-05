//var app = angular.module('angularjsNodejsTutorial', []);
var app = angular.module('angularjsNodejsTutorial', ['nvd3']);

//Zezhong Yu
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

    $scope.autocomplete = function(){

      var hint_div=document.getElementById('hint')

      var name = $scope.college_name;

      if(name.length<3){
        $scope.ifshow=false;
      }

      if (name.length>=3){
        var search_request = $http({
        url: '/get_hint',
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
          $scope.ifshow=true;
          var rows=response['names']
          if(rows.length==0){
            $scope.noresult=true;
            $scope.result=false;
          }else{
            $scope.noresult=false;
            $scope.result=true;
            $scope.return_res=rows;
          }

          console.log(response);
        }else{
          alert("response fail");
        }
      });

      search_request.error(function(err) {
        // failed
        console.log("error: ", err);
      });
    }
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
    
    var cname=document.getElementById('cname').innerHTML;
    var cid=document.getElementById('cid').innerHTML;
    var request = $http({
      url: '/plot_data',
      method: "POST",
      data: {
        'cname': cname,
        'cid':cid
      }
    })

    request.success(function(response) {
      //console.log(response);
      var the={};
      var qs={};
      var arwu={};
      if(response.the.length!=0){
        the = response.the[0];
        delete the.Institution_id;
      }

      if(response.qs.length!=0){
        qs = response.qs[0];
        delete qs.Institution;
      }

      if(response.arwu.length!=0){
        arwu = response.arwu[0];
        delete arwu.Institution;
      }

      var x_the=[];
      var x_qs=[];
      var x_arwu=[];

      for(var key in the){
        x_the.push({'x':key,'y':the[key]});
      }

      for(var key in qs){
        x_qs.push({'x':key,'y':qs[key]});
      }

      for(var key in arwu){
        x_arwu.push({'x':key,'y':arwu[key]});
      }

      $scope.data = [{
                    values:x_the,
                    key: 'Times High Education', //key  - the name of the series.
                    color: '#ff44aa'  //color - optional: choose your own line color.
                    },
                    {
                    values:x_qs,
                    key: 'QS', //key  - the name of the series.
                    color: '#00bbff'  //color - optional: choose your own line color.
                    },
                    {
                    values:x_arwu,
                    key: 'ARWU', //key  - the name of the series.
                    color: '#9f88ff'  //color - optional: choose your own line color.
                    },
                ]


    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });

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
                    axisLabel: 'Year',
                },
                yAxis: {
                    axisLabel: 'Ranking',
                    axisLabelDistance: -10,

                },
                forceY:[0,10],
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            },
        };
     
});

app.controller('subject', function($scope, $http) {
  var cname=document.getElementById('cname').innerHTML;
  var cid=document.getElementById('cid').innerHTML;
  var request = $http({
    url: '/subject_data',
    method: "POST",
    data: {
      'cname': cname,
      'cid':cid
    }
  })

  request.success(function(response) {
      //console.log(response);
    var the={};
    var qs={};
    var arwu={};
    if(response.the.length!=0){
      the = response.the[0];
      delete the.Institution_id;
    }

    if(response.qs.length!=0){
      qs = response.qs[0];
      delete qs.Institution;
      delete qs.Location;
    }

    if(response.arwu.length!=0){
      arwu = response.arwu[0];
      delete arwu.Institution;
      delete arwu.Location;
    }

    for(var key in the){
      if(the[key]==null) the[key]='-';
      if(qs[key]==null) qs[key]='-';
      if(arwu[key]==null) arwu[key]='-';
    }

    console.log(arwu);
    $scope.the=the;
    $scope.qs=qs;
    $scope.arwu=arwu;

  });

  request.error(function(err) {
      // failed
      console.log("error: ", err);
  });



})


//Bo Lyu
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


//Shuai Zheng
app.controller('statsController', function($scope, $http) {
        var request = $http.get('/industry');
        request.success(function(data){
          //console.log(data);
            $scope.statsData = data;
        });
        request.error(function(data){
           console.log('err');
        });

    $scope.findStats= function(x) {
      var request = $http.get('/stats/'+x);
      request.success(function(data) {
            //console.log(data);
            $scope.statsTable = data;
      });
      request.error(function(data){
          console.log('err');
      });
    }
});

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


app.controller('getCorrController', function($scope, $http) {
        var request1 = $http.get('/findEduIncCorr');
        request1.success(function(data1){
          //console.log(data1);
            var EduIncCorrData = data1;
            $scope.h1 = EduIncCorrData[0];
        });
        request1.error(function(data1){
            console.log('err');
        });

         var request2 = $http.get('/findHeaIncCorr');
          request2.success(function(data2) {
              var HeaIncCorrData = data2;
              $scope.h2=HeaIncCorrData[0];

          });
          request2.error(function(data2) {
              console.log('err occured 2');
          });

         var request3 = $http.get('/findOppIncCorr');
            request3.success(function(data3) {
                var OppIncCorrData = data3;
              $scope.h3=OppIncCorrData[0];


            });
            request3.error(function(data3) {
                console.log('err occured 3');
            });

        var request4 = $http.get('/findQuaIncCorr');
            request4.success(function(data4) {
                var QuaIncCorrData = data4;
                $scope.h4= QuaIncCorrData[0];
            });
            request4.error(function(data4) {
                console.log('err occured 4');
            });
});

//Rui Li
app.controller('simsController', function($scope, $http, $interval) {
  // $scope.races = ['White', 'Black or African American', 'Asian', 'Hispanic or Latino'];
  console.log($scope.gen);
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
  $scope.status = Math.random();
  console.log($scope.status);
  var req2 = $http.get('/other_state');
      req2.success(function(data2) {
        $scope.rand_state = data2[0].State;
        console.log($scope.rand_state);
      });
      req2.error(function(data3) {
        console.log('err occured in sims');
      });
  $scope.first_gen = function(){
    var step1 = function(){
      $scope.gen = 1;
      if ($scope.selectedGender.Gender=='Male'){
        $scope.gender = 'female';
        console.log('find female');
      }
      else {
        $scope.gender = 'male';
        console.log('find male');
      }
      var promise = new Promise(function(resolve, reject){
      var pos1 = Math.random();
        if (pos1<=0.6) {
          var sch_state = $scope.selectedState.StateName;
        }
        else {
          var sch_state = $scope.rand_state;
        }
        console.log(sch_state);
        resolve(sch_state);
    });
    return promise;
    }

    var step2 = function(sch_state){
      // var pics = $http({
      //   method:'POST',
      //   url:"https://uifaces.co/a36be3b0003395e6652b815847ff87/?random&gender[]="+$scope.gender+"&limit=3",
      //   headers:'X-API-KEY:a36be3b0003395e6652b815847ff87'
      // });
      var pics = $.ajax({
        url: 'https://randomuser.me/api/?gender='+$scope.gender+'&results=3',
        dataType: 'json',
        success: function(data) {
          console.log(data);
          $scope.human = data;
        }
      });
      console.log($scope.gender);
      
      var promise = new Promise(function(resolve,reject){
      var req1 = $http.get('/getnum/'+sch_state);
      $scope.sch_state = sch_state;
      req1.success(function(data1) {
        var total = data1[0].count;
        console.log(data1);
        resolve(total);
      });
      req1.error(function(data1) {
        console.log('err occured in sims');
      });
      });
      return promise;
    }

    var step3 = function(total){
      var promise = new Promise(function(resolve, reject){
        var num = Math.ceil($scope.status*total)-1;
        if (num<0){
          num = 0;
        }
        console.log(total);
      var req3 = $http({
        url: '/sims_go',
        method: "POST",
        data: {
          'state': $scope.sch_state,
          'num': num
        }
      });
      req3.success(function(data1) {
        $scope.s_state = data1[0].state;
        $scope.sta = data1[0].state;
        $scope.uni = data1[0].name;
        console.log($scope.s_state);
        resolve($scope.s_state);
        console.log($scope.uni);
      });
      req3.error(function(data1) {
        console.log('err occured in sims');
      });
    });
    return promise;
  }

  var step4 = function(s_state){
    var promise = new Promise(function(resolve, reject){
      var pos2 = Math.random();
      if (pos2<=0.7) {
        $scope.sta = s_state;
        console.log(s_state);
        console.log($scope.sta);
        resolve();
      }
      else {
        var req4 = $http.get('/other_state');
        req4.success(function(data) {
          $scope.sta = data[0].State;
          console.log($scope.sta);
          resolve();
        });
        req4.error(function(data3) {
          console.log('err occured in sims');
          resolve();
        });
      }
    });
    return promise;
  }

  var step5 = function(){
    var promise = new Promise(function(resolve, reject){
      var req2 = $http.get('/other_state');
      req2.success(function(data2) {
        $scope.rand_state = data2[0].State;
        console.log($scope.rand_state);
        resolve();
      });
      req2.error(function(data3) {
        console.log('err occured in sims');
        resolve();
      });
    });
  }
  step1().then(step2).then(step3).then(step4).then(step5);
};

var auto = $interval(function(){
  $scope.human = $scope.human;
  $scope.baby_pic = $scope.baby_pic;
},100);

$scope.next_gen = function(){
  var step1 = function(){
    $scope.gen += 1;
    $scope.status += Math.random()*0.6-0.3;
    if ($scope.status>1){
      $scope.status = 1;
    }
    else if ($scope.status<0){
      $scope.status = 0;
    }
    var g = $scope.b_gender;
    if (g=='Male'){
      $scope.gender = 'female';
      console.log('find female');
    }
    else {
      $scope.gender = 'male';
      console.log('find male');
    }
    var promise = new Promise(function(resolve, reject){
    var pos1 = Math.random();
      if (pos1<=0.6) {
        var sch_state = $scope.sta;
      }
      else {
        var sch_state = $scope.rand_state;
      }
      console.log(sch_state);
      resolve(sch_state);
  });
  return promise;
  }

  var step2 = function(sch_state){
    // var pics = $http({
    //   method:'POST',
    //   url:"https://uifaces.co/a36be3b0003395e6652b815847ff87/?random&gender[]="+$scope.gender+"&limit=3",
    //   headers:'X-API-KEY:a36be3b0003395e6652b815847ff87'
    // });
    var pics = $.ajax({
      url: 'https://randomuser.me/api/?gender='+$scope.gender+'&results=3',
      dataType: 'json',
      success: function(data) {
        console.log(data);
        $scope.human = data;
      }
    });
    console.log($scope.gender);
    
    var promise = new Promise(function(resolve,reject){
    var req1 = $http.get('/getnum/'+sch_state);
    $scope.sch_state = sch_state;
    req1.success(function(data1) {
      var total = data1[0].count;
      console.log(data1);
      resolve(total);
    });
    req1.error(function(data1) {
      console.log('err occured in sims');
    });
    });
    return promise;
  }

  var step3 = function(total){
    var promise = new Promise(function(resolve, reject){
      var num = Math.ceil($scope.status*total)-1;
      if (num<0){
        num = 0;
      }
      console.log(total);
    var req3 = $http({
      url: '/sims_go',
      method: "POST",
      data: {
        'state': $scope.sch_state,
        'num': num
      }
    });
    req3.success(function(data1) {
      $scope.s_state = data1[0].state;
      $scope.sta = data1[0].state;
      $scope.uni = data1[0].name;
      console.log($scope.s_state);
      resolve($scope.s_state);
      console.log($scope.uni);
    });
    req3.error(function(data1) {
      console.log('err occured in sims');
    });
  });
  return promise;
}

var step4 = function(s_state){
  var promise = new Promise(function(resolve, reject){
    var pos2 = Math.random();
    if (pos2<=0.7) {
      $scope.sta = s_state;
      console.log(s_state);
      console.log($scope.sta);
      resolve();
    }
    else {
      var req4 = $http.get('/other_state');
      req4.success(function(data) {
        $scope.sta = data[0].State;
        console.log($scope.sta);
        resolve();
      });
      req4.error(function(data3) {
        console.log('err occured in sims');
      });
    }
  });
  return promise;
}
step1().then(step2).then(step3).then(step4);
};
$scope.baby = function(){
  var bab = Math.random();
    if (bab<0.5){
      $scope.baby_s = 'a boy!';
      $scope.b_gender = 'Male';
      $scope.baby_pic = "https://target.scene7.com/is/image/Target/GUEST_c03fdc36-4c92-45b1-9fa7-c1b11ab62993";
    }
    else {
      $scope.baby_s = 'a girl!';
      $scope.b_gender = 'Female';
      $scope.baby_pic = "https://target.scene7.com/is/image/Target/GUEST_82bc5831-9970-4051-ab45-87a09dfe68d7";
    }
}

});
   




