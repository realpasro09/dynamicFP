'use strict';

angular.module('mean.fine-prints').controller('FinePrintsController', ['$scope', 'Global', 'FinePrints',
  function($scope, Global, FinePrints) {
    $scope.global = Global;
    $scope.package = {
      name: 'fine-prints'
    };
  }
]);
