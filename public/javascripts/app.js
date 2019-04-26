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

app.controller('recController', function($scope, $http) {
  // normal variables
    $scope.submitRec = function() {
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);
    console.log('submit here')
    var request = $http({
      url: '/getRec',
      method: "POST",
      data: {
        'movie_id': $scope.recID
      }
    })

    request.success(function(response) {
      // success
      // console.log('response');
      console.log(response);
      $scope.recMovies=response;
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
  };
});

app.controller('bestofController', function($scope, $http) {

  $scope.years=[];
  for(var i=2000;i<2018;i++){
    $scope.years.push(i);
  }
  console.log($scope.years);
  // normal variables
    $scope.submitYear = function() {
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);
    console.log('submit here')
    var request = $http({
      url: '/getBestof',
      method: "POST",
      data: {
        'year': $scope.selectedYear
      }
    })

    request.success(function(response) {
      // success
      // console.log('response');
      console.log(response);
      $scope.bestMovies=response;
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
  };
});

app.controller('posterController', function($scope, $http) {
  // normal variables
    //console.log('submit here')
    var request = $http.get('/getMoviesRandomly');
    var result=[];

    request.success(function(response) {
      // success
      // console.log('response');
      //console.log(response);
      $scope.randomMovies=response;
      var rows=response;

      for(var i=0;i<rows.length;i++){
        imdb_id=rows[i]['imdb_id']

        var request2 = $http.get('http://www.omdbapi.com/?apikey=ad9a9ad1&i='+imdb_id)
        request2.success(function(response) {
          //console.log(response);
          result.push(response);
        });
        request2.error(function(err) {
          // failed
          console.log("error: ", err);
        });

        //console.log(imdb_id);
      }

      console.log(result);

      $scope.movieData=result;
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });


    
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
