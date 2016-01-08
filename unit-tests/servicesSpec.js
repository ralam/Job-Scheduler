'use strict';

describe('Job Scheduler service', function() {
  beforeEach(module('jobScheduler'));

  it('check the existence of the Job factory', inject(function(Job) {
    expect(Job).toBeDefined();
  }));

  describe('timeService helper functions', function() {
    it('minuteGenerator generates the correct number of options', inject(function(timeService) {
      expect(timeService.minuteGenerator().length).toEqual(6);
    }));

    it('hourGenerator generates the correct number of options', inject(function(timeService) {
      expect(timeService.hourGenerator().length).toEqual(50);
    }));

    it('parseTime generates a date object when given minutes in a :mm format', inject(function(timeService) {
      expect(timeService.parseTime(':10')).toEqual(jasmine.any(Date));
    }));

    it('parseTime generates a date object when given hours and minutes in a hh:mm format', inject(function(timeService) {
      expect(timeService.parseTime('10:10')).toEqual(jasmine.any(Date));
    }));
  });
});
