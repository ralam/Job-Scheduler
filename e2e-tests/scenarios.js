'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('job scheduler', function() {
  var selectDropdownbyNum = function ( element, optionNum ) {
    if (optionNum){
      var options = element.findElements(by.tagName('option'))
        .then(function(options){
          options[optionNum].click();
        });
    }
  };


  beforeEach(function() {
    browser.get('index.html');
  });

  describe('jobs list', function () {
    it ('updates the page after adding a job', function() {
      var inputValue = '';
      element(by.id('add-new-job')).click();
      element(by.id('new-job-task')).sendKeys('rake db:drop');
      element(by.id('new-job-dyno')).sendKeys('Free');
      element(by.id('new-job-frequency')).sendKeys('Daily');
      element(by.id('new-job-due')).sendKeys('00:00');
      element(by.id('new-job-submit')).click();
      element.all(by.className('job-task')).get(1).getAttribute('value').then(
        function(value) {
          expect(value).toEqual('rake db:drop');
        });
    });
  });


});
