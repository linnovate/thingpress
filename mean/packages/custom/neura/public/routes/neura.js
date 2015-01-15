'use strict';

angular.module('mean.neura').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('neura example page', {
      url: '/neura/example',
      templateUrl: 'neura/views/index.html'
    });
  }
]);
