/**
 * Created by Zone24x7 on 6/24/2014.
 */


/* App Module */

var matrixApp = angular.module('matrixApp', [
    'ngRoute',
    'ui.router',
    'mainControllers',
    'mainServices',
    'imageUploaderControllers',
    'imageUploadServices',
    'imageUploadUtils',
    'fileUploaderControllers',
    'fileUploadServices',
    'fileUploadUtils',
    'ngCookies',
    'util',
    'ui.bootstrap',
    'userFeaturesControllers',
    'userFeaturesServices',
    'angularFileUpload',
    'ngAnimate',
    'angularUUID2'
]);
matrixApp.directive('ngThumb', ['$window', function($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function(scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({ width: width, height: height });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
}]);
/*matrixApp.config(['$routeProvider',
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

    }]);*/
matrixApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('landing', {
            url: "/",
            templateUrl: "scripts/main/view/main.html",
            controller: 'mainCtrl'
        })
        .state('uploadImage', {
            url: "/uploadimages",
            templateUrl: "scripts/imageUpload/view/uploader.html",
            controller: 'imageUploadCtrl'
        })
        .state('uploadImage.upload', {
            url: '/upload',
            templateUrl: 'scripts/imageUpload/view/imageUpload.html'
        })
        .state('uploadImage.details', {
            url: '/details',
            templateUrl: 'scripts/imageUpload/view/clientInfo.html'
        })
        .state('uploadImage.verification', {
            url: '/verification',
            templateUrl: 'scripts/imageUpload/view/clientVerification.html'
        })
        .state('uploadFile', {
            url: "/uploadfiles",
            templateUrl: "scripts/fileUpload/view/uploader.html",
            controller: 'fileUploadCtrl'
        })
        .state('uploadFile.upload', {
            url: '/upload',
            templateUrl: 'scripts/fileUpload/view/fileUpload.html'
        })
        .state('uploadFile.details', {
            url: '/details',
            templateUrl: 'scripts/fileUpload/view/clientInfo.html'
        })
        .state('uploadFile.verification', {
            url: '/verification',
            templateUrl: 'scripts/fileUpload/view/clientVerification.html'
        });


    $urlRouterProvider.otherwise("/");
});
