'use strict';

describe('Job Scheduler controllers', function () {

  beforeEach(module('jobScheduler'));
  beforeEach(module('jobSchedulerServices'));

  describe('job list controller', function () {
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;

      $httpBackend.expectGET('jobs/jobs.json').
          respond([
            {
              task: "Test",
              dynoSize: "Free",
              frequency: "Daily",
              lastRun: "never",
              nextDue: "2018-01-11T09:34:22.511Z"
            },
            {
              task: "Test2",
              dynoSize: "Free",
              frequency: "Hobby",
              lastRun: "never",
              nextDue: "2017-11-23T18:22:40.511Z"
            }
        ]);

      scope = $rootScope.$new();
      ctrl = $controller('JobListCtrl', {$scope: scope});
      scope.newJob = {
        $setPristine: function() {},
        $setUntouched: function() {}
      };
    }));

    it ('should create an array of "jobs" with two jobs fetched from xhr', function() {
      expect(JSON.stringify(scope.jobs)).toEqual(JSON.stringify([]));
      $httpBackend.flush();

      expect(JSON.stringify(scope.jobs)).toEqual(JSON.stringify(
        [{
          task: "Test",
          dynoSize: "Free",
          frequency: "Daily",
          lastRun: "never",
          nextDue: "2018-01-11T09:34:22.511Z"
        },
        {
          task: "Test2",
          dynoSize: "Free",
          frequency: "Hobby",
          lastRun: "never",
          nextDue: "2017-11-23T18:22:40.511Z"
        }])
      );
    });

    it ("should save a new job to the jobs list", function(){
      var baseTime = new Date(2016, 9, 23);
      var job = {
        task: "Test3",
        dynoSize: "Free",
        frequency: "Daily",
        lastRun: "never",
        nextDue: baseTime
      };
      $httpBackend.flush();
      spyOn(scope.newJob, '$setPristine');
      spyOn(scope.newJob, '$setUntouched');
      //currently fails when POST times out because there is no backend
      scope.save(job);

      expect(JSON.stringify(scope.jobs)).toEqual(JSON.stringify(
        [{
          task: "Test",
          dynoSize: "Free",
          frequency: "Daily",
          lastRun: "never",
          nextDue: "2018-01-11T09:34:22.511Z"
        },
        {
          task: "Test2",
          dynoSize: "Free",
          frequency: "Hobby",
          lastRun: "never",
          nextDue: "2017-11-23T18:22:40.511Z"
        },
        {
          task: "Test3",
          dynoSize: "Free",
          frequency: "Daily",
          lastRun: "never",
          nextDue: baseTime
        }])
      );

      expect(scope.newJob.$setPristine).toHaveBeenCalled();
      expect(scope.newJob.$setUntouched).toHaveBeenCalled();
    });

    it ("should delete jobs by index", function() {
      $httpBackend.flush();
      scope.remove(1);

      expect(JSON.stringify(scope.jobs)).toEqual(JSON.stringify(
        [{
          task: "Test",
          dynoSize: "Free",
          frequency: "Daily",
          lastRun: "never",
          nextDue: "2018-01-11T09:34:22.511Z"
        }])
      );
    });

    it ("should clear the job model on cancellation", function() {
      $httpBackend.flush();
      spyOn(scope.newJob, '$setPristine');
      spyOn(scope.newJob, '$setUntouched');
      scope.cancel();

      expect(scope.jobs.length).toEqual(2);
      expect(scope.newJob.$setPristine).toHaveBeenCalled();
      expect(scope.newJob.$setUntouched).toHaveBeenCalled();
      expect(scope.job).toEqual({});
    });
  });

  describe('job list controller', function () {

    it ("should populate the correct number of options", inject(function($controller) {

      var scope = {},
          ctrl = $controller('FrequencyCtrl', {$scope: scope});
      expect(scope.nextDueValues.length).toEqual(3);
    }));
  });
});
