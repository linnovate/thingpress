'use strict';

//Articles service used for articles REST endpoint
angular.module('starter').factory('getNeura', ['$resource',
function($resource) {
  return $resource('api/neuraStat', {
    articleId: '@_id'
  }
  });
]);
