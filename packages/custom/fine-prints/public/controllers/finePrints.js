'use strict';

angular.module('mean.fine-prints').controller('FinePrintsController', ['$scope', 'Global', 'FinePrints','$stateParams','$location',
  function($scope, Global, FinePrints,$stateParams,$location) {
    $scope.global = Global;
    $scope.package = {
      name: 'fine-prints'
    };
      $scope.step = 1;
      $scope.layoutData ='';
      $scope.field1 ='';
      $scope.field2 ='';
      $scope.field1MarkAsShowMeHow = false;
      $scope.field2MarkAsShowMeHow =false;
      $scope.setStep = function(step){
          $scope.step = step;
      };

      $scope.hasAuthorization = function(finePrint) {
          if (!finePrint || !finePrint.user){
              return false;
          }
          var result = $scope.global.isAdmin || finePrint.user._id === $scope.global.user._id;
          return result;
      };

      $scope.create = function(isValid) {
          if (isValid) {
              var finePrint = new FinePrints({
                  title: this.title,
                  selectedLayout: $scope.layoutData,
                  field1: $scope.field1,
                  field2: $scope.field2,
                  field1MarkAsShowMeHow: $scope.field1MarkAsShowMeHow,
                  field2MarkAsShowMeHow: $scope.field1MarkAsShowMeHow
              });
              finePrint.$save(function(response) {
                  $location.path('finePrint/' + response._id);
                  alertify.success('Fine print with Id: '+response._id+' was created.');
              }).error(function(data, status, headers, config) {
                  alertify.error('Error trying to create the fine print.');
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
                          alertify.success('Fine print with Id: '+finePrint._id+' was removed.');
                      }
                  }
                  alertify.success('Fine print with Id: '+finePrint._id+' was removed.');
                  $location.path('finePrints');
              }).error(function(data, status, headers, config) {
                  alertify.error('Error trying to remove the fine print with Id: '+finePrint._id+'.');
              });
          } else {
              $scope.finePrint.$remove(function(response) {
                  alertify.success('Fine print with Id: '+finePrint._id+' was removed.');
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
                  alertify.success('Fine print with Id: '+finePrint._id+' was updated.');
              }).error(function(data, status, headers, config) {
                  alertify.error('Error trying to update the fine print with Id: '+finePrint._id+'.');
              });



          } else {
              $scope.submitted = true;
          }
      };

      $scope.find = function() {
          FinePrints.query(function(finePrints) {
              $scope.finePrints = finePrints;
              if($scope.finePrints.length == 0){
                  alertify.success('No fine prints. Create one.');
              }else{
                  alertify.success('Fine prints were loaded correctly.');
              }

          }).error(function(data, status, headers, config) {
              alertify.error('Error loading the fine prints.');
          });
      };

      $scope.findOne = function() {
          FinePrints.get({
              finePrintId: $stateParams.finePrintId
          }, function(finePrint) {
              $scope.finePrint = finePrint;
              alertify.success('Fine print was loaded correctly.');
          }).error(function(data, status, headers, config) {
              alertify.error('Error loading the fine print with Id: '+$stateParams.finePrintId+'.');
          });
      };

  }
]);
