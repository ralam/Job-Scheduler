(function (){
  'use strict';

  /* Services */

  var jobSchedulerServices = angular.module('jobSchedulerServices', ['ngResource']);

  jobSchedulerServices.factory('Job', ['$resource',
    function($resource){
      return $resource('jobs/jobs.json', {}, {
        query: {method:'GET', isArray:true},
        save: {method:'POST'}
      });
    }]);

  jobSchedulerServices.service('timeService', function(){
    this.tenMinutesFromNow = function() {
      var plusTenMinutes;
      var timeNow = new Date();
      timeNow.setMinutes(timeNow.getMinutes() + 10);
      plusTenMinutes = new Date(timeNow);
      return plusTenMinutes;
    };

    this.parseTime = function(nextDue) {
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

    this.minuteGenerator = function() {
      var minutes = [];
      var minute = 1;
      while (minute < 7) {
        minutes.push(":" + minute.toString() + "0");
        minute += 1;
      };
      return minutes;
    };

    this.hourGenerator = function(){
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
  });
})();
