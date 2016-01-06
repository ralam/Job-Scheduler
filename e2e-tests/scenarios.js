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

    it('updates the page after adding a job', function() {
      var inputValue;

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
      expect(element.all(by.className('dyno-size')).first().getText()).toEqual('Dyno Size:\nFree');
      expect(element.all(by.className('frequency')).first().getText()).toEqual('Frequency\nDaily');
    });

    it('fails validation if a job field is missing', function() {
      var inputValue;

      element(by.id('add-new-job')).click();
      element(by.id('new-job-task')).sendKeys();
      element(by.id('new-job-dyno')).sendKeys('Free');
      element(by.id('new-job-frequency')).sendKeys('Daily');
      element(by.id('new-job-due')).sendKeys('00:00');
      element(by.id('new-job-submit')).click();
      expect(element.all(by.className('job-item')).count()).toEqual(5);
    });

    it('removes a job when the remove job button is clicked', function() {
      expect(element.all(by.className('job-item')).count()).toEqual(5);
      element.all(by.className('remove')).first().click();
      expect(element.all(by.className('job-item')).count()).toEqual(3);
    });

    it('updates the values for a job when edited', function() {
      element.all(by.className('edit')).first().click();
      element.all(by.className('edit-job-task')).first().clear().sendKeys('rake db:drop');
      element.all(by.className('edit-job-dyno')).first().sendKeys('Hobby');
      element.all(by.className('edit-job-submit')).first().click();
      element.all(by.className('job-task')).get(1).getAttribute('value').then(
        function(value) {
          expect(value).toEqual('rake db:drop');
        });
      expect(element.all(by.className('dyno-size')).get(1).getText()).toEqual('Dyno Size:\nHobby');
    });
  });


});
