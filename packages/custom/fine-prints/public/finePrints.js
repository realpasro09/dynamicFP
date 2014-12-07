'use strict';

angular.module('mean.fine-prints', [])
    .config(['ngClipProvider', function (ngClipProvider) {
        ngClipProvider.setPath('assets/ZeroClipboard/ZeroClipboard.swf');
    }]);
