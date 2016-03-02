/**
 * Created by JayathuA on 7/9/2014.
 */



/* Services */

var settingsServices = angular.module('settingsServices', ['ngResource']);

settingsServices.factory('settingsService', function ($http) {
        var domain = host();


        return {

            /* ======================GET USER INFORMATION=============================*/

            /**
             * get user information to change the user information
             * @param scope
             * @param $window
             */
            getUserInfo: function (scope, $window) {
                console.log('here');


                console.log($window.sessionStorage.token);
                $http({
                        method: 'GET',
                        url: domain + 'Account/Info',
                        headers: {Content_Type: 'application/x-www-form-urlencoded',
                            Authorization: 'bearer ' + $window.sessionStorage.token}
                    }
                ).
                    success(function (data) {
                        scope.usesrIfo = data;
                        scope.changePassword.UserName = data.UserName;
                        scope.loaderStatus = false;


                    }).error(function (data) {
                        console.log(data);
                        scope.loaderStatus = true;
                        scope.userErorInfo = "Error Loading";
                        scope.lodingImage = "image/reachDisplayServerError.png";


                    });

            },

            /* ======================CHANGE THE PASSWORD=============================*/

            /**
             *
             * @param scope
             * @param $window
             * @param passwordInfo
             */
            changePassword: function (scope, $window, passwordInfo) {
                var value = {};
                scope.loaderStatus = true;
                scope.userErorInfo = "Changing the password...";

                value.UserName = passwordInfo.UserName.toString();
                value.OldPassword = sha256_digest(passwordInfo.OldPassword.toString());
                value.NewPassword = sha256_digest(passwordInfo.NewPassword.toString());
                value.ConfirmPassword = sha256_digest(passwordInfo.ConfirmPassword.toString());
                console.log(value);
                $http({
                        method: 'POST',
                        url: domain + 'Account/ChangePassword',
                        data: value,
                        headers: {Content_Type: 'application/json',
                            Authorization: 'bearer ' + $window.sessionStorage.token}
                    }
                ).
                    success(function (data) {
                        console.log(data);
                        scope.loaderStatus = false;
                        scope.userErorInfo = "User Password changed successfully";
                        scope.buttonCaption = "Ok";
                        scope.modalAlertImage = "image/correct.png";
                        scope.lodingImage = "image/info.png";
                        $('#PasswordComfirmationModel').modal('show');
                        scope.alertcolor = "#217346";


                    }
                ).error(function (data) {
                        if (passwordInfo.NewPassword !== passwordInfo.ConfirmPassword) {
                            scope.userErorInfo = "The new password and confirmation password do not match";
                            scope.buttonCaption = "Cancel";
                            scope.modalAlertImage = "image/incorrect.png";
                        }
                        else {
                            scope.userErorInfo = data.Message;
                            scope.buttonCaption = "Cancel";
                            scope.modalAlertImage = "image/incorrect.png";
                        }

                        scope.lodingImage = "image/reachDisplayServerError.png";
                        $('#PasswordComfirmationModel').modal('show');
                        scope.loaderStatus = false;
                        scope.alertcolor = "#AF0100";

                    });

            }
        };
    }
);
