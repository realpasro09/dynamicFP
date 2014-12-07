'use strict';

angular.module('mean.fine-prints').config(['$stateProvider',
  function($stateProvider) {

      // Check if the user is connected
      var checkLoggedin = function($q, $timeout, $http, $location) {
          // Initialize a new promise
          var deferred = $q.defer();

          // Make an AJAX call to check if the user is logged in
          $http.get('/loggedin').success(function(user) {
              // Authenticated
              if (user !== '0') $timeout(deferred.resolve);

              // Not Authenticated
              else {
                  $timeout(deferred.reject);
                  $location.url('/login');
              }
          });

          return deferred.promise;
      };

      // states for my app
      $stateProvider
          .state('all finePrints', {
              url: '/finePrints',
              templateUrl: 'fine-prints/views/list.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })
          .state('create finePrint', {
              url: '/finePrint/create',
              templateUrl: 'fine-prints/views/create.html',
              reload: true, inherit: false,notify: true,
              resolve: {
                  loggedin: checkLoggedin
              }
          })
          .state('edit finePrint', {
              url: '/finePrint/:finePrintId/edit',
              templateUrl: 'fine-prints/views/edit.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })
          .state('finePrint by id', {
              url: '/finePrint/:finePrintId',
              templateUrl: 'fine-prints/views/view.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          });

    $stateProvider.state('finePrints example page', {
      url: '/finePrints/example',
      templateUrl: 'fine-prints/views/index.html'
    });
  }
]);
