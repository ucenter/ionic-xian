angular.module('starter.controllers', ['angular-carousel'])

.controller('homeCtrl', function($scope) {
    $scope.slides = [
        {'img': './img/slide-1.jpg'},
        {'img': './img/slide-2.jpg'}
    ]
    $scope.doRefresh = function(){
      $state.reload().then(function(){
        $scope.$broadcast('scroll.refreshComplete');
      })
    }      

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

.controller('searchCtrl', function($scope,$ionicModal){
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
    
    $ionicModal.fromTemplateUrl('modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });


    $scope.driver;
    $scope.car;
    //驾驶员信息查询表单
    $scope.driverForm = function(){
      console.log(this.drvNum,this.drvDaNum);
      $scope.driver = this.drvNum;
      $scope.openModal();
    } 

    $scope.carForm = function(){
      console.log(this.carNum,this.carEgNum,this.carCjNum)
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
.controller('paiShangchuanCtrl', ['$scope', function($scope){
  
}])

//随手拍-历史举报
.controller('paiLishiCtrl',function($scope){

})

//可视化
.controller('kshHomeCtrl',function($scope){

})

.controller('xunchaHomeCtrl', function($scope){
  
})

.controller('shiguchuliCtrl', function($scope){
  
})


