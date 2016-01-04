(function() {
  'use strict';

  var jobSchedulerControllers = angular.module('jobSchedulerControllers', []);

  /* helper methods to generate values used in controllers */
  var hourGenerator = function(){
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

  var minuteGenerator = function(){
    var minutes = [];
    var minute = 1;
    while (minute < 7) {
      minutes.push(":" + minute.toString() + "0");
      minute += 1;
    };
    return minutes
  };

  var tenMinutesFromNow = function() {
    var plusTenMinutes;
    var timeNow = new Date();
    timeNow.setMinutes(timeNow.getMinutes() + 10);
    plusTenMinutes = new Date(timeNow);
    return plusTenMinutes;
  }

  /* controllers */

  jobSchedulerControllers.controller('JobListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('jobs/jobs.json').success(function(data) {
      $scope.jobs = data;
    });

    $scope.save = function(job){
      var job = {
        'task': job.task,
        'dynoSize': job.dynoSize,
        'frequency': job.frequency,
        'lastRun': 'never',
        'nextDue': job.nextDue};
      $scope.jobs.unshift(job);
      $http.post('jobs/jobs.json', JSON.stringify($scope.jobs));
    }
  }]);

  jobSchedulerControllers.controller('FrequencyCtrl', function($scope) {
    $scope.nextDueOptions = [];
    $scope.frequencyOptions = ['Daily', 'Hourly', 'Every 10 minutes'];
    $scope.nextDueValues = [hourGenerator(), minuteGenerator(), [tenMinutesFromNow()]];
    $scope.getOptions = function(){
      var idx = $scope.frequencyOptions.indexOf($scope.job.frequency);
      $scope.nextDueOptions = $scope.nextDueValues[idx];
    }
  });
})();

var hours = "00";
var minutes = "00";
