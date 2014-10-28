'use strict';

/**
 * @ngdoc service
 * @name forecastApp.forecastService
 * @description
 * # forecastService
 * Service in the forecastApp.
 */
angular.module( 'forecastApp' )
  .service( 'forecastService', function forecastService ( $http ) {
    var _apiKey = "fdad3018b75e8794ba88780f7d8c75d2",
        baseRequestUrl = "https://api.forecast.io/forecast/" + _apiKey;

    function getForecast ( lat, lon ) {
      var url = baseRequestUrl + "/" + lat + "," + lon + "?callback=JSON_CALLBACK";
      console.log( "Requesting " + url );
      return $http.jsonp( url );
    }

    return {
      getForecast: getForecast
    }
  } );
