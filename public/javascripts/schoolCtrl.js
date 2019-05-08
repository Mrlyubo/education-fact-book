var app = angular.module('plunker', ['nvd3','angularUtils.directives.dirPagination','angularjs-dropdown-multiselect']);

var ALjson = [
    {leaid: 100007, score: 0.30538333, zipcode: 35243, median_price: 406200, city: "BIRMINGHAM", state:"AL"},
    {leaid: 100008, score: 0.58085, zipcode: 35758, median_price: 298000, city: "MADISON",state:"AL"},
    {leaid: 100011, score: -0.31563, zipcode: 35094, median_price: 175000, city: "LEEDS",state:"AL"},
    {leaid: 100013, score: 0.25671667, zipcode: 35173, median_price: 268000, city: "TRUSSVILLE",state:"AL"},
    {leaid: 100090, score: -0.61503333, zipcode: 36206, median_price: 92000, city: "ANNISTON",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
    {leaid: 100120, score: -0.031825, zipcode: 35611, median_price: 127000, city: "ATHENS",state:"AL"},
];
console.log('SchoolCtrl.js called!!');

// Login controller





//Find great school
app.controller('stateController', function($scope, $http) {

       // Variables
       $scope.example14model = [];

      // Dynamic graph
      $scope.states = ['AL', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
                       'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
                       'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
                       'NM', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
                       'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
                       'DC', 'GU', 'PR'];

      function generateNewData( backenddata, states ) {
            var allStates = []
            var allStatesIdx = {};
            var selectedStates = states;
            var statesChunks = selectedStates.split('&');

            for (var i = 0; i < statesChunks.length-1; i++ ) {
              allStatesIdx[statesChunks[i]] = i;
              allStates.push(statesChunks[i]);
            };

            var data = [],
            shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
            random = d3.random.normal();

            for (var i = 0; i < allStates.length; i++) {
                data.push({
                    key: allStates[i],
                    values: []
                });
            };

            for (var i = 0; i < backenddata.length; i++) {
                var key  = backenddata[i].state;
                var idx = allStatesIdx[key];
                data[idx].values.push({
                        x: backenddata[i].score,
                        y: backenddata[i].median_price/1000,
                        pop: backenddata[i].population,
                        city: backenddata[i].city,
                        size: backenddata[i].population/1000,
                        shape: "circle"
                    });
            };
            return data;
      };
      function reqState(states) {
            var req = $http.get('/school/'+ states);
            console.log(" first states = " + states);
            req.success(function(response) {
                $scope.affordable = response;
                $scope.data= generateNewData(response, states);
                setTimeout($scope.api.refresh(), 6000);
            });
            req.error(function(data) {
                console.log('err');
            });
        };
      reqState('PA&CA&');
      $scope.options = {
                               // legend:{display: false},
                               chart: {
                                   showLegend: true,
                                   legendPosition:"right",
                                   type: 'scatterChart',
                                   height: 800,
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
                                           "<td class='key'><h5>" + 'School Rating:' + "</h5></td>" +
                                           "<td class='x-value'><strong><h5>" +  e.value  + "  Above Avg.</h5><strong></td>" +

                                         "</tr>" +
                                         "<tr>" +
                                           "<td class='key'><h5>" + 'Median House Price: ' + "</h5></td>" +
                                           "<td class='x-value'><strong> <h5>$" + (series.value?series.value.toFixed(2):0) + " K</h5></strong></td>" +

                                         "</tr>"+
                                         "<tr>" +
                                           "<td class='key'><h5>" + 'Population: ' + "</h5></td>" +
                                           "<td class='x-value'><strong> <h5>" + e.point.pop+ "</h5> </strong></td>" +
                                         "</tr> "+

                                         "</tr>"+
                                         "<tr>" +
                                           "<td class='key'><h5>" + 'Location: ' + "</h5></td>" +
                                           "<td class='x-value'><strong> <h5>" + e.point.city.toLowerCase()+", "+series.key+ "</h5> </strong></td>" +
                                         "</tr> ";;


                                       var header =
                                         "<thead>" +
                                           "<tr>" +
                                             "<td class='legend-color-guide'><h5><div style='background-color: " + series.color + ";'></h5></div></td>" +
                                             "<td class='key'><strong><h5>" + series.key + "</h5></strong></td>" +
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
                                       axisLabel: 'School Rating Score',
                                       tickFormat: function(d){
                                           return d3.format('.02f')(d);
                                       },
                                       axisLabelDistance: 10
                                   },
                                   yAxis: {
                                       axisLabel: 'Median House Price ($1000)',
                                       tickFormat: function(d){
                                           return d3.format('.02f')(d);
                                       },
                                       axisLabelDistance: 10
                                   },
                                   zoom: {
                                       //NOTE: All attributes below are optional
                                       enabled: false,
                                       scaleExtent: [1, 1000],
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
          //var selectedState = $scope.selectedState;
          var statesModel = $scope.example14model;
          var states = "";
          for (var i = 0; i < statesModel.length; i ++) {
              console.log(statesModel[i].id);
              states += statesModel[i].id + '&';
          }
          reqState(states);
      };

      // Sort when column clicked
      $scope.sortColumn = "name";
      $scope.reverseSort = false;
      $scope.sortData = function (column) {
          $scope.reverseSort = ($scope.sortColumn == column) ?  !$scope.reverseSort : false;
          $scope.sortColumn = column;
      }
      $scope.getSortClass = function (column) {

          if ($scope.sortColumn == column) {
              return $scope.reverseSort
                ? 'arrow-down'
                : 'arrow-up';
          }

          return '';
        }

      // Live Search filter
      $scope.search = function (item) {
        //console.dir(item);
        if ($scope.searchText == undefined) {
            return true;
        }
        else {
            if (item.city.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1
               ||item.state.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1) {
                return true;
            }
        }
        return false;
    };

      // Pagination
      $scope.currentPage = 1;
      $scope.pageSize = 10;
      $scope.pageChangeHandler = function(num) {
          console.log('meals page changed to ' + num);
      };

      // Multiple Select
      $scope.example14data=[{"label":"Alabama","id":"AL"},{"label":"Alaska","id":"AK"},{"label":"American Samoa","id":"AS"},{"label":"Arizona","id":"AZ"},{"label":"Arkansas","id":"AR"},{"label":"California","id":"CA"},{"label":"Colorado","id":"CO"},{"label":"Connecticut","id":"CT"},{"label":"Delaware","id":"DE"},{"label":"District Of Columbia","id":"DC"},{"label":"Federated States Of Micronesia","id":"FM"},{"label":"Florida","id":"FL"},{"label":"Georgia","id":"GA"},{"label":"Guam","id":"GU"},{"label":"Hawaii","id":"HI"},{"label":"Idaho","id":"ID"},{"label":"Illinois","id":"IL"},{"label":"Indiana","id":"IN"},{"label":"Iowa","id":"IA"},{"label":"Kansas","id":"KS"},{"label":"Kentucky","id":"KY"},{"label":"Louisiana","id":"LA"},{"label":"Maine","id":"ME"},{"label":"Marshall Islands","id":"MH"},{"label":"Maryland","id":"MD"},{"label":"Massachusetts","id":"MA"},{"label":"Michigan","id":"MI"},{"label":"Minnesota","id":"MN"},{"label":"Mississippi","id":"MS"},{"label":"Missouri","id":"MO"},{"label":"Montana","id":"MT"},{"label":"Nebraska","id":"NE"},{"label":"Nevada","id":"NV"},{"label":"New Hampshire","id":"NH"},{"label":"New Jersey","id":"NJ"},{"label":"New Mexico","id":"NM"},{"label":"New York","id":"NY"},{"label":"North Carolina","id":"NC"},{"label":"North Dakota","id":"ND"},{"label":"Northern Mariana Islands","id":"MP"},{"label":"Ohio","id":"OH"},{"label":"Oklahoma","id":"OK"},{"label":"Oregon","id":"OR"},{"label":"Palau","id":"PW"},{"label":"Pennsylvania","id":"PA"},{"label":"Puerto Rico","id":"PR"},{"label":"Rhode Island","id":"RI"},{"label":"South Carolina","id":"SC"},{"label":"South Dakota","id":"SD"},{"label":"Tennessee","id":"TN"},{"label":"Texas","id":"TX"},{"label":"Utah","id":"UT"},{"label":"Vermont","id":"VT"},{"label":"Virgin Islands","id":"VI"},{"label":"Virginia","id":"VA"},{"label":"Washington","id":"WA"},{"label":"West Virginia","id":"WV"},{"label":"Wisconsin","id":"WI"},{"label":"Wyoming","id":"WY"}]
      $scope.example14settings = {
          scrollableHeight: '200px',
          scrollable: true,
          enableSearch: true
      };
      $scope.example2settings = {
          displayProp: 'id'
      };
  });

// Pagination
app.controller('MyController', function MyController($scope) {

  $scope.currentPage = 1;
  $scope.pageSize = 10;
  $scope.meals = ALjson;

  $scope.pageChangeHandler = function(num) {
      console.log('meals page changed to ' + num);
  };
});
app.controller('OtherController', function OtherController($scope) {
  $scope.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
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

// checkboxes
app.controller('AppCtrl', function ($scope) {
    $scope.example14model = [];
    $scope.example14data=[{"label":"Alabama","id":"AL"},{"label":"Alaska","id":"AK"},{"label":"American Samoa","id":"AS"},{"label":"Arizona","id":"AZ"},{"label":"Arkansas","id":"AR"},{"label":"California","id":"CA"},{"label":"Colorado","id":"CO"},{"label":"Connecticut","id":"CT"},{"label":"Delaware","id":"DE"},{"label":"District Of Columbia","id":"DC"},{"label":"Federated States Of Micronesia","id":"FM"},{"label":"Florida","id":"FL"},{"label":"Georgia","id":"GA"},{"label":"Guam","id":"GU"},{"label":"Hawaii","id":"HI"},{"label":"Idaho","id":"ID"},{"label":"Illinois","id":"IL"},{"label":"Indiana","id":"IN"},{"label":"Iowa","id":"IA"},{"label":"Kansas","id":"KS"},{"label":"Kentucky","id":"KY"},{"label":"Louisiana","id":"LA"},{"label":"Maine","id":"ME"},{"label":"Marshall Islands","id":"MH"},{"label":"Maryland","id":"MD"},{"label":"Massachusetts","id":"MA"},{"label":"Michigan","id":"MI"},{"label":"Minnesota","id":"MN"},{"label":"Mississippi","id":"MS"},{"label":"Missouri","id":"MO"},{"label":"Montana","id":"MT"},{"label":"Nebraska","id":"NE"},{"label":"Nevada","id":"NV"},{"label":"New Hampshire","id":"NH"},{"label":"New Jersey","id":"NJ"},{"label":"New Mexico","id":"NM"},{"label":"New York","id":"NY"},{"label":"North Carolina","id":"NC"},{"label":"North Dakota","id":"ND"},{"label":"Northern Mariana Islands","id":"MP"},{"label":"Ohio","id":"OH"},{"label":"Oklahoma","id":"OK"},{"label":"Oregon","id":"OR"},{"label":"Palau","id":"PW"},{"label":"Pennsylvania","id":"PA"},{"label":"Puerto Rico","id":"PR"},{"label":"Rhode Island","id":"RI"},{"label":"South Carolina","id":"SC"},{"label":"South Dakota","id":"SD"},{"label":"Tennessee","id":"TN"},{"label":"Texas","id":"TX"},{"label":"Utah","id":"UT"},{"label":"Vermont","id":"VT"},{"label":"Virgin Islands","id":"VI"},{"label":"Virginia","id":"VA"},{"label":"Washington","id":"WA"},{"label":"West Virginia","id":"WV"},{"label":"Wisconsin","id":"WI"},{"label":"Wyoming","id":"WY"}]
    $scope.example14settings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true
    };

    $scope.example2settings = {
        displayProp: 'id'
    };
});

var directiveModule = angular.module('angularjs-dropdown-multiselect', []);
directiveModule.directive('ngDropdownMultiselect', ['$filter', '$document', '$compile', '$parse',
function ($filter, $document, $compile, $parse) {

    return {
        restrict: 'AE',
        scope: {
            selectedModel: '=',
            options: '=',
            extraSettings: '=',
            events: '=',
            searchFilter: '=?',
            translationTexts: '=',
            groupBy: '@'
        },
        template: function (element, attrs) {
            var checkboxes = attrs.checkboxes ? true : false;
            var groups = attrs.groupBy ? true : false;

            var template = '<div class="multiselect-parent btn-group dropdown-multiselect">';
            template += '<button type="button" class="dropdown-toggle" ng-class="settings.buttonClasses" ng-click="toggleDropdown()">{{getButtonText()}}&nbsp;<span class="caret"></span></button>';
            template += '<ul class="dropdown-menu dropdown-menu-form" ng-style="{display: open ? \'block\' : \'none\', height : settings.scrollable ? settings.scrollableHeight : \'auto\' }" style="overflow: scroll" >';
            template += '<li ng-hide="!settings.showCheckAll || settings.selectionLimit > 0"><a data-ng-click="selectAll()"><span class="glyphicon glyphicon-ok"></span>  {{texts.checkAll}}</a>';
            template += '<li ng-show="settings.showUncheckAll"><a data-ng-click="deselectAll();"><span class="glyphicon glyphicon-remove"></span>   {{texts.uncheckAll}}</a></li>';
            template += '<li ng-hide="(!settings.showCheckAll || settings.selectionLimit > 0) && !settings.showUncheckAll" class="divider"></li>';
            template += '<li ng-show="settings.enableSearch"><div class="dropdown-header"><input type="text" class="form-control" style="width: 100%;" ng-model="searchFilter" placeholder="{{texts.searchPlaceholder}}" /></li>';
            template += '<li ng-show="settings.enableSearch" class="divider"></li>';

            if (groups) {
                template += '<li ng-repeat-start="option in orderedItems | filter: searchFilter" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role="presentation" class="dropdown-header">{{ getGroupTitle(getPropertyForObject(option, settings.groupBy)) }}</li>';
                template += '<li ng-repeat-end role="presentation">';
            } else {
                template += '<li role="presentation" ng-repeat="option in options | filter: searchFilter">';
            }

            template += '<a role="menuitem" tabindex="-1" ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))">';

            if (checkboxes) {
                template += '<div class="checkbox"><label><input class="checkboxInput" type="checkbox" ng-click="checkboxClick($event, getPropertyForObject(option,settings.idProp))" ng-checked="isChecked(getPropertyForObject(option,settings.idProp))" /> {{getPropertyForObject(option, settings.displayProp)}}</label></div></a>';
            } else {
                template += '<span data-ng-class="{\'glyphicon glyphicon-ok\': isChecked(getPropertyForObject(option,settings.idProp))}"></span> {{getPropertyForObject(option, settings.displayProp)}}</a>';
            }

            template += '</li>';

            template += '<li class="divider" ng-show="settings.selectionLimit > 1"></li>';
            template += '<li role="presentation" ng-show="settings.selectionLimit > 1"><a role="menuitem">{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a></li>';

            template += '</ul>';
            template += '</div>';

            element.html(template);
        },
        link: function ($scope, $element, $attrs) {
            var $dropdownTrigger = $element.children()[0];

            $scope.toggleDropdown = function () {
                $scope.open = !$scope.open;
            };

            $scope.checkboxClick = function ($event, id) {
                $scope.setSelectedItem(id);
                $event.stopImmediatePropagation();
            };

            $scope.externalEvents = {
                onItemSelect: angular.noop,
                onItemDeselect: angular.noop,
                onSelectAll: angular.noop,
                onDeselectAll: angular.noop,
                onInitDone: angular.noop,
                onMaxSelectionReached: angular.noop
            };

            $scope.settings = {
                dynamicTitle: true,
                scrollable: false,
                scrollableHeight: '300px',
                closeOnBlur: true,
                displayProp: 'label',
                idProp: 'id',
                externalIdProp: 'id',
                enableSearch: false,
                selectionLimit: 0,
                showCheckAll: true,
                showUncheckAll: true,
                closeOnSelect: false,
                buttonClasses: 'btn btn-default',
                closeOnDeselect: false,
                groupBy: $attrs.groupBy || undefined,
                groupByTextProvider: null,
                smartButtonMaxItems: 0,
                smartButtonTextConverter: angular.noop
            };

            $scope.texts = {
                checkAll: 'Check All',
                uncheckAll: 'Uncheck All',
                selectionCount: 'checked',
                selectionOf: '/',
                searchPlaceholder: 'Search...',
                buttonDefaultText: 'Select',
                dynamicButtonTextSuffix: 'checked'
            };

            $scope.searchFilter = $scope.searchFilter || '';

            if (angular.isDefined($scope.settings.groupBy)) {
                $scope.$watch('options', function (newValue) {
                    if (angular.isDefined(newValue)) {
                        $scope.orderedItems = $filter('orderBy')(newValue, $scope.settings.groupBy);
                    }
                });
            }

            angular.extend($scope.settings, $scope.extraSettings || []);
            angular.extend($scope.externalEvents, $scope.events || []);
            angular.extend($scope.texts, $scope.translationTexts);

            $scope.singleSelection = $scope.settings.selectionLimit === 1;

            function getFindObj(id) {
                var findObj = {};

                if ($scope.settings.externalIdProp === '') {
                    findObj[$scope.settings.idProp] = id;
                } else {
                    findObj[$scope.settings.externalIdProp] = id;
                }

                return findObj;
            }

            function clearObject(object) {
                for (var prop in object) {
                    delete object[prop];
                }
            }

            if ($scope.singleSelection) {
                if (angular.isArray($scope.selectedModel) && $scope.selectedModel.length === 0) {
                    clearObject($scope.selectedModel);
                }
            }

            if ($scope.settings.closeOnBlur) {
                $document.on('click', function (e) {
                    var target = e.target.parentElement;
                    var parentFound = false;

                    while (angular.isDefined(target) && target !== null && !parentFound) {
                        if (_.contains(target.className.split(' '), 'multiselect-parent') && !parentFound) {
                            if (target === $dropdownTrigger) {
                                parentFound = true;
                            }
                        }
                        target = target.parentElement;
                    }

                    if (!parentFound) {
                        $scope.$apply(function () {
                            $scope.open = false;
                        });
                    }
                });
            }

            $scope.getGroupTitle = function (groupValue) {
                if ($scope.settings.groupByTextProvider !== null) {
                    return $scope.settings.groupByTextProvider(groupValue);
                }

                return groupValue;
            };

            $scope.getButtonText = function () {
                if ($scope.settings.dynamicTitle && ($scope.selectedModel.length > 0 || (angular.isObject($scope.selectedModel) && _.keys($scope.selectedModel).length > 0))) {
                    if ($scope.settings.smartButtonMaxItems > 0) {
                        var itemsText = [];

                        angular.forEach($scope.options, function (optionItem) {
                            if ($scope.isChecked($scope.getPropertyForObject(optionItem, $scope.settings.idProp))) {
                                var displayText = $scope.getPropertyForObject(optionItem, $scope.settings.displayProp);
                                var converterResponse = $scope.settings.smartButtonTextConverter(displayText, optionItem);

                                itemsText.push(converterResponse ? converterResponse : displayText);
                            }
                        });

                        if ($scope.selectedModel.length > $scope.settings.smartButtonMaxItems) {
                            itemsText = itemsText.slice(0, $scope.settings.smartButtonMaxItems);
                            itemsText.push('...');
                        }

                        return itemsText.join(', ');
                    } else {
                        var totalSelected;

                        if ($scope.singleSelection) {
                            totalSelected = ($scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp])) ? 1 : 0;
                        } else {
                            totalSelected = angular.isDefined($scope.selectedModel) ? $scope.selectedModel.length : 0;
                        }

                        if (totalSelected === 0) {
                            return $scope.texts.buttonDefaultText;
                        } else {
                            return totalSelected + ' ' + $scope.texts.dynamicButtonTextSuffix;
                        }
                    }
                } else {
                    return $scope.texts.buttonDefaultText;
                }
            };

            $scope.getPropertyForObject = function (object, property) {
                if (angular.isDefined(object) && object.hasOwnProperty(property)) {
                    return object[property];
                }

                return '';
            };

            $scope.selectAll = function () {
                $scope.deselectAll(false);
                $scope.externalEvents.onSelectAll();

                angular.forEach($scope.options, function (value) {
                    $scope.setSelectedItem(value[$scope.settings.idProp], true);
                });
            };

            $scope.deselectAll = function (sendEvent) {
                sendEvent = sendEvent || true;

                if (sendEvent) {
                    $scope.externalEvents.onDeselectAll();
                }

                if ($scope.singleSelection) {
                    clearObject($scope.selectedModel);
                } else {
                    $scope.selectedModel.splice(0, $scope.selectedModel.length);
                }
            };

            $scope.setSelectedItem = function (id, dontRemove) {
                var findObj = getFindObj(id);
                var finalObj = null;

                if ($scope.settings.externalIdProp === '') {
                    finalObj = _.find($scope.options, findObj);
                } else {
                    finalObj = findObj;
                }

                if ($scope.singleSelection) {
                    clearObject($scope.selectedModel);
                    angular.extend($scope.selectedModel, finalObj);
                    $scope.externalEvents.onItemSelect(finalObj);
                    if ($scope.settings.closeOnSelect) $scope.open = false;

                    return;
                }

                dontRemove = dontRemove || false;

                var exists = _.findIndex($scope.selectedModel, findObj) !== -1;

                if (!dontRemove && exists) {
                    $scope.selectedModel.splice(_.findIndex($scope.selectedModel, findObj), 1);
                    $scope.externalEvents.onItemDeselect(findObj);
                } else if (!exists && ($scope.settings.selectionLimit === 0 || $scope.selectedModel.length < $scope.settings.selectionLimit)) {
                    $scope.selectedModel.push(finalObj);
                    $scope.externalEvents.onItemSelect(finalObj);
                }
                if ($scope.settings.closeOnSelect) $scope.open = false;
            };

            $scope.isChecked = function (id) {
                if ($scope.singleSelection) {
                    return $scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp]) && $scope.selectedModel[$scope.settings.idProp] === getFindObj(id)[$scope.settings.idProp];
                }

                return _.findIndex($scope.selectedModel, getFindObj(id)) !== -1;
            };

            $scope.externalEvents.onInitDone();
        }
    };
}]);
