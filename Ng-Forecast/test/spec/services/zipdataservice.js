'use strict';

describe('Service: zipDataService', function () {

  // load the service's module
  beforeEach(module('forecastApp'));

  // instantiate service
  var zipDataService;
  beforeEach(inject(function (_zipDataService_) {
    zipDataService = _zipDataService_;
  }));

  it('should do something', function () {
    expect(!!zipDataService).toBe(true);
  });

});
