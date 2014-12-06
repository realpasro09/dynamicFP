'use strict';

angular.module('mean.fine-prints').factory('FinePrints', ['$resource',
  function($resource) {
      return $resource('finePrints/:finePrintId', {
          finePrintId: '@_id'
      }, {
          update: {
              method: 'PUT'
          }
      });
  }
]);
