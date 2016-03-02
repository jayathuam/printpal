/**
 * Created by JayathuA on 9/25/2014.
 */


'use strict';

var util = angular.module('util', ['ngResource']);

util.factory('utilService', function ($http,$filter, $window) {
    var domain = host();
    return {
        getLogo: function () {
            var logo = "image/matrixLogo.png";
            return logo;

        },
        logOut: function () {
            $window.sessionStorage.user = null;
            $window.localStorage.token = null;
            $window.sessionStorage.username = null;
            $window.location = "#/";

        },
        checkLogin: function () {
            if ($window.sessionStorage.token == 'null' || $window.sessionStorage.token == undefined) {
                $window.location = "#/";

            }
        },
        getCookie:function(cname)
        {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' '){
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0){
                    return c.substring(name.length,c.length);
                }
            }
            return "";

        }
}
});



