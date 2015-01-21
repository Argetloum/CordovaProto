/* global angular */
/* global APPLICATION_NAME */
'use strict'; // jshint ignore:line

angular.module(APPLICATION_NAME)
.controller('HomeCtrl',
            ['$scope',
            function($scope)
{
    //
    // PRIVATE ATTRIBUTES
    //

    //
    // PUBLIC ATTRIBUTES
    //

    //
    // PRIVATE METHODS
    //
    function init()
    {
        $scope.helloWorld = 'hello world!';
    }


    //
    // INITIALIZATION
    //
    init();
}]);
