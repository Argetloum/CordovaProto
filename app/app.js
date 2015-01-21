/* global angular */
/* global window */
/* global cordova */
/* global StatusBar */
/* global APPLICATION_NAME */
'use strict'; // jshint ignore:line

// App configuration
var APPLICATION_NAME = 'ionic-proto'; // jshint ignore:line

// Remember to change the name of the application here, in your "index.html" and in "lang.js"
angular.module('common', [
    // Add here any other angular module you need
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.router',
    'Directives',
    'Constants',
    'Factories',
    'Filters',
    'Services',
    'translation',
    'ionic',
    'lumx'
]);

// Use theses modules to declare new filters, services, factories and directives
// so the injector is automatically available
angular.module('Constants', []);
angular.module('Filters', []);
angular.module('Directives', []);
angular.module('Factories', ['ngResource']);
angular.module('Services', []);


// Remember to change the name of the application here, in your "index.html" and in "lang.js"
angular.module(APPLICATION_NAME, [
    'common'
])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider)
        {
            $stateProvider
                .state('ionic-proto', {
                    url: '/',
                    views: {
                        'content': {
                            controller: 'HomeCtrl',
                            templateUrl: '/templates/home/views/home.html'
                        }
                    }
                });

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/');
        }])

    .run(['$ionicPlatform',
        function ($ionicPlatform)
        {
            $ionicPlatform.ready(function ()
            {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard)
                {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar)
                {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
        }])
    .controller('MainCtrl', ['$scope', 'Translation',
        function ($scope, Translation)
        {
            $scope.Translation = Translation;
        }]);