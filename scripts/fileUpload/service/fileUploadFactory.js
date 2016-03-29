/**
 * Created by JayathuA on 7/9/2014.
 */



/* Factories */

var fileUploadServices = angular.module('fileUploadServices', ['ngResource']);

fileUploadServices.factory('fileUploadService', function ($http) {
       return {
           getStatus: function (scope) {
               $http({
                       method: 'GET',
                       url:'http://10.101.9.23:9800/api/files' ,
                       headers: {Content_Type: 'application/json'}
                   }
               ).
               success(function (data) {
                   console.log("success");
               }).error(function (data) {
                   if(data.Message === "An error has occurred."){
                   }
                   console.log(data);
               });
           }
       };
    }
);
