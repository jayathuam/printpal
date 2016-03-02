/**
 * Created by Zone24x7 on 7/9/2014.
 */



/* Services */

var userFeaturesServices = angular.module('userFeaturesServices', ['ngResource']);

userFeaturesServices.factory('userFeaturesService', function ($http,$q,utilService) {
        var domain = host();


        return {

            getUserInfo: function (scope, $window) {
                console.log('here');


                console.log($window.sessionStorage.token);
                $http({
                        method: 'GET',
                        url: domain + 'Account/Info',
                        headers: {Content_Type: 'application/x-www-form-urlencoded',
                            Authorization: 'bearer ' + $window.localStorage.token}
                    }
                ).
                    success(function (data) {
                        console.log(data);
                        scope.userName=data.UserName;
                        scope.loaderStatus=false;
                        $('#loader').hide();

                    }).error(function (data) {
                        console.log(data);
                        scope.loaderStatus = true;
                        scope.userErorInfo = "Error Loading Account Information...";
                        scope.lodingImage = "image/reachDisplayServerError.png";
                        //call logout function


                    });

            },
            logoutUser: function (scope, $window, userSID) {
                console.log('here');
                console.log($window.sessionStorage.token);
                scope.loaderStatus=true;
                scope.userErorInfo = "Logout User....";
                scope.lodingImage = "image/loader.GIF";
                $('#loader').show();
                $http({
                        method: 'GET',
                        url: domain + 'Account/Logout',
                        params: {sid: userSID},
                        headers: {Content_Type: 'application/x-www-form-urlencoded',
                            Authorization: 'bearer ' + $window.localStorage.token}
                    }
                ).
                    success(function (data) {
                        console.log(data);
                        scope.loaderStatus=false;
                        $('#loader').hide();
                        if(data === '"SUCCESS"'){
                            document.cookie = "MATRIX24x7mo_user=" + ";expires=Thu, 18 May 1970 12:00:00 UTC;path=/;";
                            document.cookie = "MATRIX24x7f_user=" + ";expires=Thu, 18 May 1970 12:00:00 UTC;path=/;";
                            document.cookie = "MATRIX24x7fe=" + ";expires=Thu, 18 May 1970 12:00:00 UTC;path=/;";
                            utilService.logOut();
                        }
                        else
                        {
                            document.cookie = "MATRIX24x7mo_user=" + ";expires=Thu, 18 May 1970 12:00:00 UTC;path=/;";
                            document.cookie = "MATRIX24x7f_user=" + ";expires=Thu, 18 May 1970 12:00:00 UTC;path=/;";
                            document.cookie = "MATRIX24x7fe=" + ";expires=Thu, 18 May 1970 12:00:00 UTC;path=/;";
                            utilService.logOut();
                        }


                    }).error(function (data) {
                        scope.loaderStatus = true;
                        scope.userErorInfo = "Error in login out...";
                        scope.lodingImage = "image/reachDisplayServerError.png";
                        document.cookie = "MATRIX24x7mo_user=" + ";expires=Thu, 18 May 1970 12:00:00 UTC;path=/;";
                        document.cookie = "MATRIX24x7f_user=" + ";expires=Thu, 18 May 1970 12:00:00 UTC;path=/;";
                        document.cookie = "MATRIX24x7fe=" + ";expires=Thu, 18 May 1970 12:00:00 UTC;path=/;";
                        utilService.logOut();
                        console.log(data);
                        scope.logoutResult= data;

                    });

            }


        };
    }
);
