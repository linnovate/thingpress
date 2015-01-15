// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','nvd3ChartDirectives'])
//angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('widgetCtrl',['$scope','$http',
  function($scope,$http){
    // get Neura stats
    $scope.neuraData = getNeuraData();
    $scope.climateData = {};
    function getNeuraData() {
      $http.get('http://thingpress.cloudapp.net/api/neuraStat').
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.date = data.date;
        $scope.glucose = data.glucose;
        $scope.steps = data.steps;
        $scope.calories = Math.floor(data.calories);
        $scope.sleepDuration = data.sleepDuration;
        $scope.gluNorm= ((data.glucose /200) * 180) - 90;
        $scope.percentage = Math.floor(data.workout.precentage);
        console.log(data);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }

    function getClimateData() {
      $http.get('http://thingpress.cloudapp.net/api/climate?room_id=microsoft-azure-hackathon').
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        setTimeout(getClimateData,500);
        $scope.climate = data;
        var arr=[];
        for(var i=0;i<data.length;i+=1) {
          var itm=data[i];
          arr.push([itm.date, itm.temp]);
        }
        $scope.exampleData.values=arr;
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }
    getClimateData();

    // get Climate
    $scope.exampleData = [
    {
      "key": "Series 1",
      "values": []
    }];

  }
])
