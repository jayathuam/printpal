/**
 * Created by JayathuA on 3/13/2016.
 */
var imageUploadUtils = angular.module('imageUploadUtils', ['ngResource']);

imageUploadUtils.service('imageUploadUtil', function () {
        this.sizeDetails = function () {
            return ['S1', 'S2', 'S3', 'S4'];
        };
        this.priceDetails = function () {
            return {
                'S1': '1',
                'S2': '2',
                'S3': '3',
                'S4': '4'
            };
        };
    }
);
