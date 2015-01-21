/* global angular */
/* global window */
/* global cordova */
/* global StatusBar */

var APPLICATION_NAME = 'ionic-proto';

// Use theses modules to declare new filters, services, factories and directives
// so the injector is automatically available
angular.module('Constants', []);
angular.module('Filters', []);
angular.module('Directives', []);
angular.module('Factories', ['ngResource']);
angular.module('Services', []);

angular.module(APPLICATION_NAME,
    [
        'ionic',
        'translation',
        'lumx',
        'ngResource',
        'ngRoute',
        'Directives',
        'Constants',
        'Factories',
        'Filters',
        'Services'
    ])

    .run(function ($ionicPlatform)
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
    })

    .config(function ($stateProvider, $urlRouterProvider)
    {

        $stateProvider

            // setup an abstract state for the tabs directive
            .state('ionic-proto', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/common/views/default.html"
            })

            // Each tab has its own nav history stack:
            .state('ionic-proto.home', {
                url: '/home',
                views: {
                    'content': {
                        templateUrl: 'templates/home/views/home.html',
                        controller: 'HomeCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');

    })
    .controller('MainCtrl', ['$scope', 'Translation',
        function ($scope, Translation)
        {
            $scope.Translation = Translation;
        }]);
