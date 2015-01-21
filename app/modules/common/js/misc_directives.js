/* global angular */
'use strict'; // jshint ignore:line

angular.module('Directives')


.directive('repeatDone', function() {
    return function(scope, element, attrs) {
        if (scope.$last) {
            scope.$eval(attrs.repeatDone);
        }
    };
});
