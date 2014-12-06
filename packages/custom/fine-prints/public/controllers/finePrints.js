'use strict';

angular.module('mean.fine-prints').controller('FinePrintsController', ['$scope', 'Global', 'FinePrints','$stateParams','$location',
  function($scope, Global, FinePrints,$stateParams,$location) {
    $scope.global = Global;
    $scope.package = {
      name: 'fine-prints'
    };
      $scope.step = 1;
      $scope.setStep = function(step){
       $scope.step = step;
      };

      $scope.hasAuthorization = function(finePrint) {
          if (!finePrint || !finePrint.user)
              return false;
          var result = $scope.global.isAdmin || finePrint.user._id === $scope.global.user._id;
          return result;
      };

      $scope.create = function(isValid) {
          if (isValid) {
              var finePrint = new FinePrints({
                  title: this.title
              });
              finePrint.$save(function(response) {
                  $location.path('finePrint/' + response._id);
              });

              this.title = '';
          } else {
              $scope.submitted = true;
          }
      };

      $scope.remove = function(finePrint) {
          if (finePrint) {
              finePrint.$remove(function(response) {
                  for (var i in $scope.finePrints) {
                      if ($scope.finePrints[i] === finePrint) {
                          $scope.finePrints.splice(i, 1);
                      }
                  }
                  $location.path('finePrints');
              });
          } else {
              $scope.finePrint.$remove(function(response) {
                  $location.path('finePrints');
              });
          }
      };

      $scope.update = function(isValid) {
          if (isValid) {
              var finePrint = $scope.finePrint;
              if (!finePrint.updated) {
                  finePrint.updated = [];
              }
              finePrint.updated.push(new Date().getTime());

              finePrint.$update(function() {
                  $location.path('finePrint/' + finePrint._id);
              });
          } else {
              $scope.submitted = true;
          }
      };

      $scope.find = function() {
          FinePrints.query(function(finePrints) {
              $scope.finePrints = finePrints;
          });
      };

      $scope.findOne = function() {
          FinePrints.get({
              finePrintId: $stateParams.finePrintId
          }, function(finePrint) {
              $scope.finePrint = finePrint;
          });
      };

  }
]);
