//var app = angular.module('angularjsNodejsTutorial', []);
var app = angular.module('angularjsNodejsTutorial', ['nvd3']);


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
