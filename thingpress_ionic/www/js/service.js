'use strict';

//Articles service used for articles REST endpoint
angular.module('starter').factory('Neura', ['$resource',
function($resource) {
  return $resource('api/neuraStat');
]);
