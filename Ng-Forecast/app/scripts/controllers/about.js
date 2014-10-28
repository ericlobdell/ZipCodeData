'use strict';

/**
 * @ngdoc function
 * @name forecastApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the forecastApp
 */
angular.module('forecastApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
