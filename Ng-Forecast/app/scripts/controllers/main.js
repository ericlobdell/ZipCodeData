'use strict';

/**
 * @ngdoc function
 * @name forecastApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the forecastApp
 */
angular.module('forecastApp')
  .controller('MainCtrl', function ($scope, zipDataService, forecastService) {
    var vm = $scope;
    vm.selectedZipCode = "";
    vm.zipCodeData = null;
    vm.briefForecast = null;

    zipDataService.loadZipCodeData();

    vm.getDataForZipCode = function (zip) {
      var zdata = zipDataService.getDataForZipCode(zip);
      console.log("Zip code data: ", zdata);
      vm.zipCodeData = zdata;
      vm.getForecast();
    }

    vm.getForecast = function () {
      forecastService.getForecast(vm.zipCodeData.latitude, vm.zipCodeData.longitude)
        .success(function (data) {
          console.log("Success forecast data: ", data);
          vm.briefForecast = data.daily.summary;
        })
        .error(function(data, status, headers, config) {
          console.log("Error forecast data: ", status);
        });
    }
  });
