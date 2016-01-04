(function 9) {
  'use strict';

  // Declare app level module which depends on views, and components
  var jobScheduler = angular.module('myApp', [
    'ngRoute',
    'jobSchedulerControllers'
  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/index'});
  }]);
}
