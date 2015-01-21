/* global Date */
/* global Math */
/* global $ */
/* global angular */
/* global jQuery */
'use strict'; // jshint ignore:line

angular.module('Services')
.service('Utils', function()
{
    //
    // PUBLIC METHODS
    //

    function generateUUID()
    {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
        {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x7|0x8)).toString(16);
        });
        return uuid;
    }

    /**
     * Validate an email address with regex.
     * Return true if the email address is correct, else return false.
     * @param email email to test
     * @returns {boolean}
     */
    function validateEmail(email)
    {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function copyObjectToExistingOne(from, to)
    {
        $.each(to, function(key, value)
        {
            to[key] = undefined;
        });

        $.each(from, function(key, value)
        {
            if(jQuery.type(from[key]) === 'object')
            {
                if(jQuery.type(to[key]) !== 'object')
                {
                    to[key] = {};
                }

                copyObjectToExistingOne(from[key], to[key]);
            }
            else if(jQuery.type(from[key]) === 'array')
            {
                to[key] = $.extend(true, [], from[key]);
            }
            else
            {
                to[key] = from[key];
            }
        });
    }

    /**
     * Returns a random integer between min (included) and max (excluded)
     */
    function getRandomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * Returns a random item from the list.
     * @para
     */
    /**
     * Returns a random item from an arry.
     * @param  {Array} arr      The array
     * @param  {int} start      To exclude items from the top of the array
     * @param  {int} end        To exclude items from the bottom of the array
     * @return {Object}         The item
     */
    function getRandomItemFromArray(arr, start, end)
    {
        if(start)
        {
            if(end && end <= arr.length)
            {
                start = Math.min(start, end - 1);
            }
            else
            {
                start = Math.min(start, arr.length - 1);
            }

            start = Math.max(0, start);
        }
        else
        {
            start = 0;
        }

        if(end)
        {
            end = Math.max(start + 1, end);
            end = Math.min(arr.length, end);
        }
        else
        {
            end = arr.length;
        }

        return arr[getRandomInt(start, end)];
    }

    /**
     * Return the date in parameters with the time set to 00:00:00.
     */
    function truncateTime(date)
    {
        if(date)
        {
            var trunc = new Date(date);
            trunc.setHours(0, 0, 0, 0);
            return trunc;
        }

        return date;
    }

    return {
        copyObjectToExistingOne: copyObjectToExistingOne,
        generateUUID: generateUUID,
        getRandomInt: getRandomInt,
        getRandomItemFromArray: getRandomItemFromArray,
        truncateTime: truncateTime,
        validateEmail: validateEmail
    };
});