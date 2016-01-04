(function() {
  'use strict';

  var jobSchedulerControllers = angular.module('jobSchedulerControllers', []);

  jobSchedulerControllers.controller('JobListCtrl', ['$scope', 'Job',
    function($scope, Job){
      $scope.jobs= Job.query();
    }
  ]);


})();
