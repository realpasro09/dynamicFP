'use strict';

angular.module('mean.fine-prints').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('finePrints example page', {
      url: '/finePrints/example',
      templateUrl: 'fine-prints/views/index.html'
    });
  }
]);
