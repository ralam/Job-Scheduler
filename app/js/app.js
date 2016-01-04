(function () {
  'use strict';

  // Declare app level module which depends on views, and components
  var jobScheduler = angular.module('jobScheduler', [
    'ngRoute',
    'jobSchedulerControllers'
  ]);

  jobScheduler.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/index'});
  }]);

  jobScheduler.directive('jobsList', function () {
    return {
      restrict: 'E',
      templateUrl: './templates/jobs-list.html'
    };
  });

  jobScheduler.directive('newJob', function () {
    return {
      restrict: 'E',
      templateUrl: './templates/new-job.html'
    };
  });
})();
