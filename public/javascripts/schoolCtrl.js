var app = angular.module('plunker', ['nvd3']);

var ALjson = [
    {leaid: 100007, score: 0.30538333, zipcode: 35243, median_price: 406200, city: "BIRMINGHAM", state:"AL"},
    {leaid: 100008, score: 0.58085, zipcode: 35758, median_price: 298000, city: "MADISON",state:"AL"},
    {leaid: 100011, score: -0.31563, zipcode: 35094, median_price: 175000, city: "LEEDS",state:"AL"},
    {leaid: 100013, score: 0.25671667, zipcode: 35173, median_price: 268000, city: "TRUSSVILLE",state:"AL"},
    {leaid: 100090, score: -0.61503333, zipcode: 36206, median_price: 92000, city: "ANNISTON",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
]

//Find great school
app.controller('stateController', function($scope, $http) {

      $scope.states = ['AL', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
                       'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
                       'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
                       'NM', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
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
                                    key: backenddata[i].city + ","+backenddata[i].state,
                                    values: []
                                });


                                data[i].values.push({
                                        x: backenddata[i].score,
                                        y: backenddata[i].median_price,
                                        pop: backenddata[i].population,
                                        size: backenddata[i].population/1000,
                                        shape: shapes[i % 6]
                                    });

                            }
                            return data;
                        };

      $scope.data = generateData(5,30);
      $scope.options = {
                               chart: {
                                   showLegend: true,
                                   legendPosition:"right",
                                   type: 'scatterChart',
                                   height: 1200,
                                   width: 800,
                                   color: d3.scale.category10().range(),
                                   scatter: {
                                       onlyCircles: true
                                   },
                                   showDistX: true,
                                   showDistY: true,
                                   tooltip: {
                                     contentGenerator: function (e) {
                                       var series = e.series[0];
                                       //console.dir(e);
                                       if (series.value === null) return;

                                       var rows =
                                         "<tr>" +
                                           "<td class='key'>" + 'School Rating: ' + "</td>" +
                                           "<td class='x-value'><strong>" +  e.value  + "  Above Avg.<strong></td>" +

                                         "</tr>" +
                                         "<tr>" +
                                           "<td class='key'>" + 'Median House Price: ' + "</td>" +
                                           "<td class='x-value'><strong> $" + (series.value?series.value.toFixed(2):0) /1000+ " K</strong></td>" +

                                         "</tr>"+
                                         "<tr>" +
                                           "<td class='key'>" + 'Population: ' + "</td>" +
                                           "<td class='x-value'><strong> " + e.point.pop+ " </strong></td>" +

                                         "</tr>";


                                       var header =
                                         "<thead>" +
                                           "<tr>" +
                                             "<td class='legend-color-guide'><div style='background-color: " + series.color + ";'></div></td>" +
                                             "<td class='key'><strong>" + series.key + "</strong></td>" +
                                           "</tr>" +
                                         "</thead>";

                                       return "<table>" +
                                           header +
                                           "<tbody>" +
                                             rows +
                                           "</tbody>" +
                                         "</table>";
                                     }
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
                                       scaleExtent: [100000, 1000000],
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
      $scope.toggleLegend = function() {
          //$scope.data = generateData(1,20);
          nv.models.multiBarHorizontalChart().x(function(d) {
                return d.x
            }).y(function(d) {
                return d.y
            }).showLegend(false);
          $scope.api.update();
          // nv.tooltip.cleanup();
      };

      $scope.selectState = function() {

          var selectedState = $scope.selectedState;
          var req = $http.get('/school/'+ selectedState);
          req.success(function(response) {

              $scope.affordable = response;
              console.dir(response);
              $scope.data= generateNewData(response);
              setTimeout($scope.api.refresh(), 3000);
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
