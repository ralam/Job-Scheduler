(function() {
  'use strict';

  var jobSchedulerServices = angular.module('jobSchedulerServices', ['ngResource']);

  jobSchedulerServices.factory('Job',  ['$resource',
    function($resource){
      return $resource('jobs.json', {}, {
        query: {method: 'GET', isArray:true}
      });
    }
  ]);
})();
