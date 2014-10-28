'use strict';

/**
 * @ngdoc service
 * @name forecastApp.zipDataService
 * @description
 * # zipDataService
 * Service in the forecastApp.
 */
angular.module('forecastApp')
  .service('zipDataService', function zipDataService($http) {
      var zipData = {},
        stateData = {};

      function loadZipCodeData() {
        $http.get("data/ZipCodes.json")
          .success(function (data) {
            zipData =  data;
            console.log("Zip Code Data loaded!");
          } );

        $http.get("data/States.json")
          .success(function (data) {
            stateData =  data;
            console.log("State Data loaded!");
          } );
      }

    function getDataForZipCode (zip) {
      var zdata = zipData[zip ],
          sdata = stateData[zdata.stateId];

      zdata.state = sdata;

      return  zdata;
    }

    return {
      loadZipCodeData: loadZipCodeData,
      getDataForZipCode: getDataForZipCode
    }

  });
