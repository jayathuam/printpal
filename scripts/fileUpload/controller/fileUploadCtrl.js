/**
 * Created by JayathuA on 7/9/2014.
 */
var fileUploaderControllers = angular.module('fileUploaderControllers', []);

fileUploaderControllers.controller('fileUploadCtrl', function ($scope, $rootScope, $window, $routeParams, $cookieStore, imageUploadService, $filter, $location,FileUploader,imageUploadUtil,uuid2) {
    //var csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    var uploader = $scope.uploader = new FileUploader({
        url: 'http://10.101.9.23:9800/api/files',
        headers : {
            'Content-Type': 'multipart/form-data; boundary=K' // X-CSRF-TOKEN is used for Ruby on Rails Tokens
        }

    });

    // FILTERS

    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|pdf|docx|doc|'.indexOf(type) !== -1;
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        fileItem.sizeInfo = imageUploadUtil.sizeDetails();
        fileItem.sizeDefault = fileItem.sizeInfo[0];
        fileItem.noCount = 1;
        fileItem.onSelectChnage = $scope.photoSelectChanger;
        fileItem.ID = uuid2.newuuid();
        $scope.photoSelectChanger(fileItem.file.name,fileItem.sizeInfo[0]);
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);

    $scope.sizes = imageUploadUtil.sizeDetails();
    $scope.size = $scope.sizes[0];
    $scope.priceList = imageUploadUtil.priceDetails();
    $scope.totalBill = [];

    $scope.photoNumberValidator=function (item){
        console.log(item);
        if(item.noCount <= 0 || item.noCount === null || item.noCount === undefined){
            //console.log("find");
            item.noCount = 1;
        }
        $scope.calculatePrice();

    };

    $scope.changeTheSelectors = function (){
        for(var i=0; i<uploader.queue.length;i++){
            uploader.queue[i].sizeDefault=$scope.size;
            $scope.photoSelectChanger(uploader.queue[i].file.name,$scope.size);
        }
        $scope.priceCreator();
    };

    $scope.photoSizeDetails = {};
    $scope.photoSelectChanger = function(name,value){
        //$scope.photoSizeDetails[name] = value;
        //$scope.priceCreator();
        $scope.calculatePrice();
        //console.log($scope.photoSizeDetails);
    };
    $scope.totalBill = [];
    $scope.totalBillDetails = {};
    $scope.calculatePrice = function(){
        for(var i=0; i<uploader.queue.length;i++){
            var priceObj = {};
            priceObj.ID = uploader.queue[i].ID;
            priceObj.name = uploader.queue[i].file.name;
            priceObj.size = uploader.queue[i].sizeDefault;
            priceObj.count = uploader.queue[i].noCount;
            priceObj.total = priceObj.count*Number($scope.priceList[priceObj.size]);
            $scope.totalBillDetails[priceObj.ID] = priceObj;
            console.log($scope.totalBillDetails);
        }
        $scope.totalBill = [];
        for (var key in $scope.totalBillDetails) {
            $scope.totalBill.push($scope.totalBillDetails[key]);
        }
    };


    /*$scope.priceCreator = function (){
        var tempArray = [];
        var counts = {};
        for(var i=0; i<uploader.queue.length;i++){
            tempArray.push($scope.photoSizeDetails[uploader.queue[i].file.name]);
        }
        for (var i = 0; i < tempArray.length; i++) {
            counts[tempArray[i]] = 1 + (counts[tempArray[i]] || 0);
        }

        for (var key in counts) {
            var priceObj = {};
            priceObj.size = key;
            priceObj.count = counts[key];
            priceObj.total = counts[key]*Number($scope.priceList[key]);
            $scope.totalBill.push(priceObj);
        }
        console.log($scope.totalBill);

    };*/

   $scope.returnTotalBill = function(){
        var count = 0;
        for(var i = 0; i < $scope.totalBill.length; i++){
            count = count+$scope.totalBill[i].total;
        }
        return count;
    };
    //imageUploadService.getStatus($scope);

    $scope.formData = {
        name : "",
        email: "",
        address: [{"id":uuid2.newuuid(),"address":""}],
        conno: ""
    };
    $scope.addAddressTextBox = function (){
        $scope.formData.address.push({"id":uuid2.newuuid(),"address":""});
    };
    $scope.removeAddressTextBox = function(item){
        var index = $scope.formData.address.indexOf(item);
        if(index !== -1 && $scope.formData.address.length > 1){
            $scope.formData.address.splice(index,1);
        }
    };

});
