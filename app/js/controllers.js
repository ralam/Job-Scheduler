(function() {
  'use strict';

  var jobSchedulerControllers = angular.module('jobSchedulerControllers', ['jobSchedulerServices']);

  /* controllers */

  jobSchedulerControllers.controller('JobListCtrl', ['$scope', 'Job', 'timeService', '$http',
  function($scope, Job, timeService, $http) {
    $scope.jobs = Job.query();

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
      Job.save(job);

      // push job onto $scope.jobs because there is no backend
      $scope.jobs.push(job);
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

      // placeholder delete, no id to use in ngResource
      $http.delete('jobs/job.json');

      // splice job from $scope.jobs because there is no backend
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
