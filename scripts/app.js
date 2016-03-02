/**
 * Created by Zone24x7 on 6/24/2014.
 */


/* App Module */

var matrixApp = angular.module('matrixApp', [
    'ngRoute',
    'mainControllers',
    'mainServices',
    'imageUploaderControllers',
    'imageUploadServices',
    'ngCookies',
    'util',
    'ui.bootstrap',
    'userFeaturesControllers',
    'userFeaturesServices'
]);
matrixApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'scripts/main/view/main.html',
                controller: 'mainCtrl'
            }).
            when('/uploadimages/', {
                templateUrl: 'scripts/imageUpload/view/imageUpload.html',
                controller: 'imageUploadCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });

    }]);
