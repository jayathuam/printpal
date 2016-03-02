/**
 * Created by JayathuA on 7/9/2014.
 */
var settingsControllers = angular.module('settingsControllers', []);

settingsControllers.controller('settingsCtrl', function ($scope, $rootScope, $window, $routeParams, getAndSetArray,settingsService, $cookieStore, utilService, $filter, $location) {

        utilService.checkLogin($filter, $window, $cookieStore);
        $scope.loaderStatus = true;
        $scope.userErorInfo = "Loading...";

        $('#PasswordComfirmationModel').modal({keyboard: false, show: false});

        $scope.lodingImage = "image/loader.GIF";
        $scope.logo = utilService.getLogo();
        settingsService.getUserInfo($scope, $window);
        $scope.usesrIfo;

        $scope.changePassword = {};

        $scope.changePasswordFunc = function (changePassword) {
            settingsService.changePassword($scope, $window, changePassword);
        };

        $scope.ClearAll = function () {
            $scope.changePassword.OldPassword = "";
            $scope.changePassword.NewPassword = "";
            $scope.changePassword.ConfirmPassword = "";

        };

        $scope.brdCrumb = JSON.parse($window.sessionStorage.breadCrumb);
        $scope.nowLocation = "#" + $location.absUrl().split("#")[1];
        utilService.checkFowardandBackward($scope);

        $scope.username = $window.sessionStorage.username;

        $scope.parentBCClick = function () {
            var x = [];
            $window.sessionStorage.breadCrumb = JSON.stringify(x);
            $location.url('/items/0?level=0&desc=null');

        };

        $scope.breadcrumb = function (id, name, url) {
            var temp = {"id": id, "name": name, "url": url};
            console.log(temp);

            var array = JSON.parse($window.sessionStorage.breadCrumb);

            if (array === undefined) {
                array = [];
                array.push(temp);

            }

            else {
                array.push(temp);
            }
            $window.sessionStorage.breadCrumb = JSON.stringify(array);
            $location.url(url.split("#")[1]);

        };

        $scope.breadcrumbClick = function (id, url) {

            var temp = [];
            if (id === '0') {
                console.log("0 fired");
            }
            for (var n = 0; n < $scope.brdCrumb.length; n++) {

                if ($scope.brdCrumb[n].id === id) {
                    temp.push($scope.brdCrumb[n]);
                    break;
                }

                temp.push($scope.brdCrumb[n]);

            }

            $window.sessionStorage.breadCrumb = JSON.stringify(temp);
            $scope.brdCrumb = temp;
            $location.url(url.split("#")[1]);

        };

        $scope.logOut = function () {

            getAndSetArray.set(null);
            utilService.logOut($window, $cookieStore);
        };

    }
);
