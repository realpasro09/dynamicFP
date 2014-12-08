'use strict';

angular.module('mean.fine-prints', ['zeroclipboard']).
		config(['uiZeroclipConfigProvider', function(uiZeroclipConfigProvider) {
			uiZeroclipConfigProvider.setZcConf({
				swfPath: '../bower_components/zeroclipboard/dist/ZeroClipboard.swf'
			});
		}]).controller('FinePrintsController', ['$scope', 'Global', 'FinePrints','$stateParams','$location',
  function($scope, Global, FinePrints,$stateParams,$location) {
    $scope.global = Global;
    $scope.package = {
      name: 'fine-prints'
    };

      var resetFinePrint= function(){
          $scope.finePrint = {
              layoutData :'',
              field1 :'',
              field2 :'',
              field3 :'',
              field4 :'',
              field1MarkAsShowMeHow : false,
              field2MarkAsShowMeHow :false,
              field3MarkAsShowMeHow :false,
              field4MarkAsShowMeHow :false,
              field1Help: '',
              field2Help: '',
              field3Help: '',
              field4Help: '',
			  companyWebsite: ''
          };
      };

      $scope.startAgain = function(){
        $scope.step = 1;
        this.title = '';
		  this.companyWebsite = '';
        resetFinePrint();
      };

      $scope.step = 1;
      $scope.link = '/DFP/';
      $scope.sharedLink = '';
      resetFinePrint();

	  $scope.share=false;

	  $scope.showShare = function(){
		  $scope.share = !$scope.share;
	  };

	  $scope.iframeHtml = '';

	  $scope.preview=false;

	  $scope.showPreview = function(){
		  $scope.preview = !$scope.preview;
	  };

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

      var replaceLineBreaks = function(text){
        return text;
        //return text.replace(/\n\r?/g, '<br />');
      };

      $scope.create = function(isValid) {
          if (isValid) {

              var finePrint = new FinePrints({
                  title: this.title,
                  selectedLayout: $scope.finePrint.layoutData,
                  field1: $scope.finePrint.field1,
                  field2: replaceLineBreaks($scope.finePrint.field2),
                  field3: replaceLineBreaks($scope.finePrint.field3),
                  field4: replaceLineBreaks($scope.finePrint.field4),
                  field1MarkAsShowMeHow: $scope.finePrint.field1MarkAsShowMeHow,
                  field2MarkAsShowMeHow: $scope.finePrint.field2MarkAsShowMeHow,
                  field3MarkAsShowMeHow: $scope.finePrint.field3MarkAsShowMeHow,
                  field4MarkAsShowMeHow: $scope.finePrint.field4MarkAsShowMeHow,
                  link: $scope.link,
				  field1Help: $scope.finePrint.field1Help,
				  field2Help: $scope.finePrint.field2Help,
				  field3Help: $scope.finePrint.field3Help,
				  field4Help: $scope.finePrint.field4Help,
				  companyWebsite: $scope.finePrint.companyWebsite

              });
              finePrint.$save(function(response) {
				  finePrint.link = finePrint.link + finePrint.selectedLayout + '/'+ response._id;
				  finePrint.$update(function(){
					  $location.path('finePrint/' + response._id);
					  alertify.success('Fine print with Id: '+response._id+' was created.');
				  });

              },function(data, status, headers, config) {
                  alertify.error('Error trying to create the fine print.');
              });

              this.title = '';
			  this.companyWebsite = '';
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
              },function(data, status, headers, config) {
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
              },function(data, status, headers, config) {
                  alertify.error('Error trying to update the fine print with Id: '+finePrint._id+'.');
              });



          } else {
              $scope.submitted = true;
          }
      };

      $scope.find = function() {
          FinePrints.query(function(finePrints) {
              $scope.finePrints = finePrints;
              if($scope.finePrints.length === 0){
                  alertify.success('No fine prints. Create one.');
              }else{
                  alertify.success('Fine prints were loaded correctly.');
              }

          }, function(data, status, headers, config) {
              alertify.error('Error loading the fine prints.');
          });
      };

      $scope.findOne = function() {
          FinePrints.get({
              finePrintId: $stateParams.finePrintId
          }, function(finePrint) {
              $scope.finePrint = finePrint;
			  $scope.sharedLink = window.location.origin + $scope.finePrint.link;
			  $scope.iframeHtml = '<iframe frameborder=\'0\' style=\'overflow:hidden;height:100%;width:100%\' height=\'100%\' width=\'100%\' src=\''+ $scope.sharedLink+'\'> </iframe>';
              alertify.success('Fine print was loaded correctly.');
          }, function(data, status, headers, config) {
              alertify.error('Error loading the fine print with Id: '+$stateParams.finePrintId+'.');
          });
      };

  }
]);
