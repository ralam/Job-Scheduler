(function() {
  'use strict';

  var jobSchedulerControllers = angular.module('jobSchedulerControllers', []);
  /* helper functions to generate values used in controllers */
  var hourGenerator = function () {
    var hours = [];
    var hour = 0;
    while (hour < 25) {
      var stringHour = hour.toString();
      if ((stringHour).length < 2) {
        stringHour = "0" + stringHour;
      };
      hours.push(stringHour + ":00")
      hours.push(stringHour + ":30")
      hour += 1;
    };

    return hours;
  };

  var minuteGenerator = function () {
    var minutes = [];
    var minute = 1;
    while (minute < 7) {
      minutes.push(":" + minute.toString() + "0");
      minute += 1;
    };
    return minutes
  };

  jobSchedulerControllers.controller('JobListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('jobs/jobs.json').success(function(data) {
      $scope.jobs = data;
    });
  }]);

  jobSchedulerControllers.controller('NewJobCtrl', function($scope) {
    $scope.date = new Date();
    $scope.minutes = $scope.date.getMinutes();
  });
  jobSchedulerControllers.controller('FrequencyCtrl', function($scope) {
    var frequencyOptions = ['Daily', 'Hourly', 'Every 10 minutes'];
    var nextDueOptions = [hourGenerator(), minuteGenerator(), [new Date()]];
    $scope.options = [{'frequency': 'Daily'}, {'frequency': 'Hourly'}, {'frequency': 'Every 10 minutes'}];
  });


})();

var hours = "00";
var minutes = "00";
