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

});
