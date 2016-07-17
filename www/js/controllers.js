angular.module('starter.controllers', ['angular-carousel','ionic-toast'])

.controller('homeCtrl', function($scope,$state,$cordovaDialogs) {
    $scope.slides = [
        {'img': './img/slide-1.jpg'},
        {'img': './img/slide-2.jpg'}
    ]
    // $scope.doRefresh = function(){
    //   $state.reload().then(function(){
    //     $scope.$broadcast('scroll.refreshComplete');
    //   })
    // }      
  
})

.controller('listCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('listDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {

})

.controller('searchCtrl', function($scope,$timeout,$ionicLoading,ionicToast){
    $scope.tab1 = true;
    $scope.tab2 = false;
    $scope.toggle = function(event,id){
        if (id === true) {
            return false;
        }
        //console.log(event,id)
        if ($scope.tab1) {
            $scope.tab1 = false;
            $scope.tab2 = true;
        }else{
            $scope.tab1 = true;
            $scope.tab2 = false;
        }
    }   


    //$scope.drv;
    $scope.car;
    //驾驶员信息查询表单
    $scope.driverForm = function(){
      console.log(this.drvNum,this.drvDaNum);
      if (this.drvNum == undefined && this.drvDaNum == undefined) {
        ionicToast.show('查询项不能为空', 'middle', false, 2500)
        return false;
      }else{
        $ionicLoading.show({template: '查询中...'});
        $timeout(function(){
          $ionicLoading.hide();
          $scope.drvName = '张震';
          $scope.drvSex = '男';
          $scope.drvNation = '中国';
          $scope.drvBirth = '1976-08-14';
          $scope.drvFirstdate = '1996-08';
          $scope.drvAllow = 'A2D';
          $scope.drvExp = '2020-08-14';
        },500)        
      }
      
    } 

    $scope.carForm = function(){
      console.log(this.carNum,this.carEgNum,this.carCjNum)
      if(this.carNum == undefined && this.carEgNum == undefined && this.carCjNum == undefined){
        ionicToast.show('查询项不能为空', 'middle', false, 2500)
        return false;
      }else{
        $ionicLoading.show({template: '查询中...'});
        $timeout(function(){
            $ionicLoading.hide().then(function(){
              $scope.carOwner = '张震';
              $scope.carModel = '普通小型客车';
              $scope.carFirstdate = '2013-08-11';
              $scope.carNum = '京A88888';
              $scope.carEgnum = '00000000';
              $scope.carKnownum = 'LFXXX000000000';
              $scope.carStatus = '有效';
            })
        },500)
      }
    } 
})

.controller('loginCtrl', ['$scope', function($scope){
    $scope.codetext = '获取验证码';
    $scope.getCode = function(){

    }

}])

//随手拍
.controller('paiHomeCtrl', function($scope){

})

//随手拍-交警巡查
.controller('paiXunchaCtrl', ['$scope','$cordovaCamera', function($scope,$cordovaCamera){
    $scope.img1 = 'img/PNG/file-image-o.png';
    $scope.img2 = 'img/PNG/file-image-o.png';
    $scope.img3 = 'img/PNG/file-image-o.png';

    $scope.uploadImg = function(id){
      var i = id;
        $cordovaCamera.getPicture({
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation:true
        }).then(function(imageData) {

          if (i == 1) {
            $scope.img1 = "data:image/jpeg;base64," + imageData;
          }
          if (i == 2) {
            $scope.img2 = "data:image/jpeg;base64," + imageData;
          }
          if (i == 3) {
            $scope.img3 = "data:image/jpeg;base64," + imageData;  
          }

        }, function(err) {
            alert(JSON.stringify(err));
        });     
    }
  
}])

//随手拍-违法举报
.controller('paiJubaoCtrl', ['$scope', function($scope){
  
}])

//随手拍-一键上传
.controller('paiShangchuanCtrl', ['$scope','$rootScope', function($scope,$rootScope){

  $scope.address = $rootScope.location;
  $scope.remoteTime = new Date();
  $scope.cars = [
    {name:'小型车辆'},
    {name:'中型车辆'}
  ]
  $scope.choiceCar = $scope.cars[0];
  $scope.weifa = ['违法停车','主干道蹭停','占用高速应急车道','变道加塞','闯红灯','开车用手机','占用公交道','违反标志标线','滥用远光灯'];

  //日期控件
  var weekDaysList = ["日", "一", "二", "三", "四", "五", "六"];
  var monthList = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  var datePickerCallback = function (val) {
      if (typeof(val) === 'undefined') {
          console.log('No date selected');
      } else {
          console.log('Selected date is : ', val);
          $scope.datepickerObject.inputDate = val;
      }
  };
  //日期空间配置
  $scope.datepickerObject = {
      titleLabel: '日期选择',  //Optional
      todayLabel: '今天',  //Optional
      closeLabel: '取消',  //Optional
      setLabel: '确定',  //Optional
      setButtonType: 'button-calm',  //Optional
      todayButtonType: 'button-calm',  //Optional
      closeButtonType: 'button-calm',  //Optional
      inputDate: new Date(),    //Optional
      mondayFirst: false,    //Optional
      //disabledDates: disabledDates, //Optional
      weekDaysList: weekDaysList,   //Optional
      monthList: monthList, //Optional
      templateType: 'modal', //Optional
      modalHeaderColor: 'bar-calm', //Optional
      modalFooterColor: 'bar-calm', //Optional
      from: new Date(),   //Optional
      to: new Date(2018, 12, 31), //Optional
      callback: function (val) {    //Mandatory
          datePickerCallback(val);
      }
  };    
}])

//随手拍-历史举报
.controller('paiLishiCtrl',function($scope){

})

//可视化
.controller('kshHomeCtrl',function($scope){

})

.controller('xunchaHomeCtrl', function($scope){
  
})

//事故处理
.controller('shiguchuliCtrl', function($scope,$state){

})

.controller('sgclsCtrl', function($scope,$state){
  
})

.controller('sgclmCtrl', function($scope,$state){
  
})

