'use strict';

describe('Job Scheduler controllers', function () {
  beforeEach(module('jobScheduler'));

  describe('job controller', function () {
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
    }));

    it ('should create an array of "jobs" with two jobs fetched from xhr', function() {
      expect(scope.jobs).toBeUndefined();
      $httpBackend.flush();

      expect(scope.jobs).toEqual(
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
        }]
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
      scope.newJob = {
        $setPristine: function() {},
        $setUntouched: function() {}
      };
      scope.save(job);

      expect(scope.jobs).toEqual(
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
        }]
      );

    });

    it ("should delete jobs by index", function($controller) {
      $httpBackend.flush();
      scope.remove(1);

      expect(scope.jobs).toEqual(
        [{
          task: "Test",
          dynoSize: "Free",
          frequency: "Daily",
          lastRun: "never",
          nextDue: "2018-01-11T09:34:22.511Z"
        }]
      );
    });
  });
});
