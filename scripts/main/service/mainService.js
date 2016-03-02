
/* Services */

/**
 * All the http rest calls related to the loginController
 * @type {module}
 */

var loginServices = angular.module('mainServices', ['ngResource']);

//Authenticate the user
loginServices.factory('mainService',
    /**
     *
     * @param $http
     * @returns {{login: login}}
     */
    function ($http) {
        var domain = host();
        return {
            /**
             * login function to validate the user
             * @param user
             * @param scope {$scope}
             * @param location {$location}
             * @param $window {$window}
             */
            login: function (user, scope, location, $window) {
                //convert password to sha256 hash code
                //var pass = sha256_digest(user.password.toString());
                var pass = user.password.toString();
               // console.log(user.username.toString())
                $('#loader').show();
                scope.lodingImage = "image/loader.GIF";
                $http({
                        method: 'POST',
                        url: domain + 'Auth',
                        data: 'grant_type=password&username=' + encodeURIComponent(user.username.toString()) + '&password=' + pass,
                        headers: {Content_Type: 'application/json'}
                    }
                ).
                success(function (data) {

                }).error(function (data) {

                    });
            }

        };
    }
);
/**
 * Created by Zone24x7 on 7/9/2014.
 */
