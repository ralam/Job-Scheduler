'use strict';

describe('Job Scheduler controllers', function () {
  beforeEach(module('jobScheduler'));

  describe('job controller', function () {
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('jobs/jobs.json').
          respond([{
            task: "Test",
            dynoSize: "Free",
            frequency: "Daily",
            lastRun: "never",
            nextDue: "2012-04-23T18:25:43.511Z"
          }]);

      scope = $rootScope.$new();
      ctrl = $controller('JobListCtrl', {$scope: scope});
    }));

    it ('should create a "jobs" model with one job fetched from xhr', function() {
      expect(scope.jobs).toBeUndefined();
      $httpBackend.flush();

      expect(scope.jobs).toEqual(
        [{
          task: "Test",
          dynoSize: "Free",
          frequency: "Daily",
          lastRun: "never",
          nextDue: "2012-04-23T18:25:43.511Z"
        }]);
    });
  });

});
