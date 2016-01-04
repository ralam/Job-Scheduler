(function() {
  'use strict';

  var jobSchedulerControllers = angular.module('jobSchedulerControllers', []);

  jobSchedulerControllers.controller('JobListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('jobs/jobs.json').success(function(data) {
      $scope.jobs = data;
    });
  }]);
})();
