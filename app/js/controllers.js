(function() {
  'use strict';

  var jobSchedulerControllers = angular.module('jobSchedulerControllers', ['jobSchedulerServices']);

  /* controllers */

  jobSchedulerControllers.controller('JobListCtrl', ['$scope', 'Job', 'timeService',
  function($scope, Job, timeService) {
    $scope.jobs = Job.query();
    // $http.get('jobs/jobs.json').success(function(data) {
    //   $scope.jobs = data;
    // });

    $scope.save = function(job){
      var nextDue = job.nextDue;
      var job;

      nextDue = timeService.parseTime(nextDue);

      job = {
        'task': job.task,
        'dynoSize': job.dynoSize,
        'frequency': job.frequency,
        'lastRun': 'never',
        'nextDue': nextDue};
      $scope.jobs.push(job);
      Job.save(job);

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

  jobSchedulerControllers.controller('FrequencyCtrl', ['$scope', 'timeService', function($scope, timeService) {
    $scope.nextDueOptions = [];
    $scope.frequencyOptions = ['Daily', 'Hourly', 'Every 10 minutes'];
    $scope.nextDueValues = [timeService.hourGenerator(), timeService.minuteGenerator(), [timeService.tenMinutesFromNow()]];
    $scope.getOptions = function(){
      var idx = $scope.frequencyOptions.indexOf($scope.job.frequency);
      $scope.nextDueOptions = $scope.nextDueValues[idx];
    };
  }]);
})();
