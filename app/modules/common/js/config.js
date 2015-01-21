/* global LOCALE */
/* global navigator */

'use strict'; // jshint ignore:line

angular.module('Services')
.service('Config', ['$interval', '$rootScope', function($interval)
{
    //
    // Definitions
    //
    var status = {
        LIVE: 'LIVE',
        DELETED: 'DELETED'
    };

    var role = {
        ADMIN: 'ADMIN'
    };

    //
    // Broadcast timer management
    //
    var latency = 1000;

    /**
     * Called at a fix interval of 'latency', this function broadcast the refresh
     * event globally for the application.
     */
    function broadcastRefresh()
    {
    }

    $interval(broadcastRefresh, latency);

    //
    // Locale management
    //
    var locale = navigator.language !== null ? navigator.language : navigator.browserLanguage;

    /**
     * Get the client locale.
     *
     * @return  {String}  The locale.
     */
    function getLocale()
    {
        return LOCALE ? LOCALE : locale;
    }

    return {
        getLocale: getLocale,
        role: role,
        status: status
    };
}]);
