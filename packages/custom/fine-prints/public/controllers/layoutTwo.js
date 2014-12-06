'use strict';

angular.module('mean.fine-prints').controller('LayoutTwoController', ['$scope', 'Global', 'FinePrints','$stateParams','$location',
    function($scope, Global, FinePrints,$stateParams,$location) {

        $scope.global = Global;

        $scope.package = {
            name: 'fine-prints'
        };

        var init = function(){
            console.log('ddd');
        };

        init();
    }
]);
