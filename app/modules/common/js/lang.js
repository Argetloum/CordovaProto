angular.module(APPLICATION_NAME).config(['$translateProvider', function($translateProvider)
{
    $translateProvider.translations('fr',
        {
            "USER": "Utilisateur"
        });

    $translateProvider.translations('en',
        {
            "USER": "User"
        });

    $translateProvider.preferredLanguage((navigator.language !== null ? navigator.language : navigator.browserLanguage).split("_")[0].split("-")[0]);
    $translateProvider.fallbackLanguage('en');
}]);