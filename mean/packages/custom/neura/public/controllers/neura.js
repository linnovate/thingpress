'use strict';

/* jshint -W098 */
angular.module('mean.neura').controller('NeuraController', ['$scope', 'Global', 'Neura',
  function($scope, Global, Neura) {
    $scope.global = Global;
    $scope.package = {
      name: 'neura'
    };
  }
]);
