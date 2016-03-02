/**
 * Created by Zone24x7 on 7/9/2014.
 */
var userFeaturesControllers = angular.module('userFeaturesControllers', []);


userFeaturesControllers.controller('userFeaturesCtrl', function ($scope, $timeout, $rootScope, $window, $routeParams, userFeaturesService, $cookieStore,  utilService, $filter, $location) {


    $scope.loaderStatus = true;
    $scope.lodingImage = "image/loader.GIF";
    $scope.userErorInfo = "Loading account information...";

    $('#PasswordComfirmationModel').modal({keyboard: false, show: false});

    $scope.mUser=utilService.getCookie("MATRIX24x7mo_user");
    $scope.fUser=utilService.getCookie("MATRIX24x7f_user");
    $scope.dashboard=utilService.getCookie("MATRIX24x7fe");

    if($scope.mUser === "" || $scope.mUser === "null" || $scope.fUser === "" || $scope.fUser === "null" || $scope.dashboard === "" || $scope.dashboard === "null"){

        $window.location = "#/";
    }
    else{
        userFeaturesService.getUserInfo($scope,$window);
    }

    $scope.lodingImage = "image/loader.GIF";
    $scope.logo = utilService.getLogo();
    $scope.changePassword = {};
    $scope.baseURL=domain();
    var w = angular.element($window);
    $scope.rowHeight=(w.height()/100)*10;
    $scope.manageEnable=$scope.dashboard.split("#")[0];
    $scope.analyticsEnable=$scope.dashboard.split("#")[1];

    $scope.changeClassForDiv= function () {

        if($scope.manageEnable === "true" && $scope.analyticsEnable === "true"){
            return "col-lg-3 col-md-3 col-sm-3";
        }

        else if($scope.manageEnable === "true" || $scope.analyticsEnable === "true"){
            return "col-lg-4 col-md-4 col-sm-4";
        }

        else if($scope.manageEnable === "false" && $scope.analyticsEnable === "false"){
            $window.location.href=domain()+"monitor/";
            return "col-lg-5 col-md-5 col-sm-5";
        }
    };



    $scope.nowLocation = "#" + $location.absUrl().split("#")[1];

    $scope.username = $window.sessionStorage.username;

    $scope.logOut = function () {
        $scope.mUser=utilService.getCookie("MATRIX24x7mo_user");
        $scope.fUser=utilService.getCookie("MATRIX24x7f_user");
        $scope.dashboard=utilService.getCookie("MATRIX24x7fe");
        if($scope.mUser === "" || $scope.mUser === "null" || $scope.fUser === "" || $scope.fUser === "null" || $scope.dashboard === "" || $scope.dashboard === "null"){

            $window.location = "#/";
        }
        else{
            userFeaturesService.logoutUser($scope,$window,utilService.getCookie("MATRIX24x7f_user").split(":")[0]);
        }

    };

}


);


/*--------------------------------------------------------------------------------------------*/

/**
 * Created by Zone24X7 on 8/26/2014.
 */
