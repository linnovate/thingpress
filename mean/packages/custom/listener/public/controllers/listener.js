'use strict';

/* jshint -W098 */
angular.module('mean.listener').controller('ListenerController', ['$scope', 'Global', 'Listener',
  function($scope, Global, Listener) {
    $scope.global = Global;
    $scope.package = {
      name: 'listener'
    };
  }
]);
