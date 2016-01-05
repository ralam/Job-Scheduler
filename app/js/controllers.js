(function() {
  'use strict';

  var jobSchedulerControllers = angular.module('jobSchedulerControllers', []);

  /* controllers */

  jobSchedulerControllers.controller('JobListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('jobs/jobs.json').success(function(data) {
      $scope.jobs = data;
    });

    $scope.save = function(job){
      var nextDue = job.nextDue;
      var job;

      nextDue = parseTime(nextDue);

      job = {
        'id': $scope.jobs[$scope.jobs.length - 1]["id"] + 1,
        'task': job.task,
        'dynoSize': job.dynoSize,
        'frequency': job.frequency,
        'lastRun': 'never',
        'nextDue': nextDue};
      $scope.jobs.push(job);
      $http.post('jobs/jobs.json', JSON.stringify($scope.jobs));

      // would normally be in sucess callback of $http
      $scope.newJob.$setPristine();
      $scope.newJob.$setUntouched();
      $scope.job = {};
    };

    $scope.cancel = function(job){
      $scope.newJob.$setPristine();
      $scope.newJob.$setUntouched();
      $scope.job = {};
    };

    $scope.remove = function(idx) {
      var jobToRemove = $scope.jobs[idx];

      // placeholder delete, no backend to connect to
      $http.delete('jobs/job.json' + jobToRemove.id);

      // would normally be in a success callback from $http
      $scope.jobs.splice(idx, 1);
    };
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
  };

  var parseTime = function(nextDue) {
    var nextDueDate, minutes, hours;
    if (typeof nextDue === 'string') {
      nextDueDate = new Date();
      if (nextDue.length === 3) {
        minutes = parseInt(nextDue.slice(1));
        nextDueDate.setMinutes(minutes);
      } else {
        hours = nextDue.slice(0, 2);
        minutes = nextDue.slice(3);
        nextDueDate.setMinutes(minutes);
        nextDueDate.setHours(hours);
        nextDueDate.setDate(nextDueDate.getDate() + 1);
        nextDueDate = new Date(nextDueDate);
      };

      nextDue = nextDueDate;
    };
    return nextDue;
  };
})();

var hours = "00";
var minutes = "00";
