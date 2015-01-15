'use strict';

angular.module('mean.listener').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('listener example page', {
      url: '/listener/example',
      templateUrl: 'listener/views/index.html'
    });
  }
]);
