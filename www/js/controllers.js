angular.module('starter.controllers', ['angular-carousel','ionic-toast'])

.controller('homeCtrl', function($scope,$state,$cordovaDialogs) {
    $scope.slides = [
        {'img': './img/slide-1.jpg'},
        {'img': './img/slide-2.jpg'},
        {'img': './img/slide-3.jpg'}
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






//登录
.controller('loginCtrl', function($scope,$interval){
    $scope.codetext = '获取验证码';
    $scope.getCode = function(){
      var mobile = $scope.mobile;
    }

    $scope.changeTime = function(){
      $interval(function(){},1000)
    }

})






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
    $scope.img1 = 'img/PNG/file-image-o.png';
    $scope.img2 = 'img/PNG/file-image-o.png';
    $scope.img3 = 'img/PNG/file-image-o.png';  
}])







//随手拍-一键上传
.controller('paiShangchuanCtrl', function($scope,$state,$rootScope,$timeout,$cordovaToast,$cordovaGeolocation,$ionicPopup,$ionicLoading,$cordovaCamera,ionicToast){

  $scope.address = '北京';
  $scope.remoteTime = new Date();

  // 如果有网络才能引入地图api
  if (window.BMap) {
      $scope.map = new BMap.Map("bmap");   

      $scope.map.addControl(new BMap.NavigationControl());    
      //默认地址
      var long = 116.447486;
      var lat = 39.925425;
      $scope.map.centerAndZoom(new BMap.Point(long,lat),18);
      //$scope.map.enableScrollWheelZoom(true);  
      $scope.map.addOverlay(new BMap.Marker(new BMap.Point(long,lat)))
      
      //监听地图移动改变中心点
      $scope.map.addEventListener('dragend',function(){
          var center = $scope.map.getCenter();
          //console.log('地图中心：'+center.lng+ ','+center.lat)
          $scope.map.clearOverlays();
          $scope.map.addOverlay(new BMap.Marker(new BMap.Point(center.lng,center.lat)))          
      })
      
  }    

    //坐标转换
    var translateCallback = function (data){
      console.log(data)
      if(data.status === 0) {
        var marker = new BMap.Marker(data.points[0]);
        $scope.map.addOverlay(marker);
        $scope.map.setCenter(data.points[0]);
      }
    }
 
    $scope.getGps = function(){
      getGps()
    }

    getGps();

    function getGps(){
      $cordovaGeolocation.getCurrentPosition({
        timeout: 10000, 
        enableHighAccuracy: false
      }).then(function (position) {
          console.log(position)
          //gps原始坐标
          var lat  = position.coords.latitude
          var long = position.coords.longitude

          var point = new BMap.Point(long,lat);
          //坐标转换操作
          var convertor = new BMap.Convertor();
          var pointArr = [];
          pointArr.push(point);
          convertor.translate(pointArr, 1, 5, function(data){
            console.log(data)
            if(data.status === 0) {
              var marker = new BMap.Marker(data.points[0]);
              $scope.map.addOverlay(marker);
              $scope.map.setCenter(data.points[0]);
              var geoc = new BMap.Geocoder();
              geoc.getLocation(data.points[0],function(res){
                console.log(res)
                $scope.address = res.address;
              })              
            }            
          })



        }, function(err) {
          // error
          console.log(err)
          //$cordovaToast.show(JSON.stringify(err), 'short', 'bottom')
      }); 
    }
  
  
  $scope.cars = [
    {name:'小型车辆'},
    {name:'中型车辆'},
    {name:'大型车辆'}
  ]
  $scope.choiceCar = $scope.cars[0];
  $scope.weifa = [
      {checked:false,code:1,name:'违法停车'},
      {checked:false,code:2,name:'主干道蹭停'},
      {checked:false,code:3,name:'占用高速应急车道'},
      {checked:false,code:4,name:'变道加塞'},
      {checked:false,code:5,name:'闯红灯'},
      {checked:false,code:6,name:'开车用手机'},
      {checked:false,code:7,name:'占用公交道'},
      {checked:false,code:8,name:'违反标志标线'},
      {checked:false,code:9,name:'滥用远光灯'}
  ];

  $scope.img = {
    'i1':'img/PNG/cab.png',
    'i2':'img/PNG/cab.png',
    'i3':'img/PNG/cab.png'
  }

   $scope.getpic = function($event,img){
      console.log(img)
      document.addEventListener("deviceready", function () {
        var options = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 158,
          targetHeight: 120,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation:true
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
          switch(img){
            case 'i1':
              $scope.img.i1 = "data:image/jpeg;base64," + imageData;
              break;
            case 'i2':
              $scope.img.i2 = "data:image/jpeg;base64," + imageData;
              break;                            
            case 'i3':
              $scope.img.i3 = "data:image/jpeg;base64," + imageData;
              break;                         
          }
        }, function(err) {
          // error
        });
      }, false);
    
   }

   $scope.submit = function(){
       var confirmPopup = $ionicPopup.confirm({
         title: '确定提交吗？',
         template: '提交的信息将上传到系统中'
       });

       confirmPopup.then(function(res) {
         if(res) {
            $ionicLoading.show({template: '请稍后...'});
            $timeout(function(){
                $scope.img = {
                  "i1": "img/PNG/cab.png",
                  "i2": "img/PNG/cab.png",
                  "i3": "img/PNG/cab.png"
                }      
            },500).then(function(){
              ionicToast.show('信息已经保存到服务器', 'middle', false, 2500)
              $ionicLoading.hide();               
            })
         } else {
            // ionicToast.show('取消保存', 'middle', false, 2500)
         }
       });       
   }   


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
})






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




//区域互动
.controller('qyhdCtrl', function($scope,$state){
  
})

//单车事故处理
.controller('sgclsCtrl', function($scope,$state,$ionicPopup,$ionicLoading,$timeout,$cordovaCamera,ionicToast){
    $scope.img = {
        "cqf": "img/cqf.png",
        "chf": "img/chf.png",
        "pzbw": "img/pzbw.png",
        "qt": "img/qt.png"          
    }
    var info = [
      {text:'清晰反应出车牌号车辆之间位置关系及车辆与标线的位置关系'},
      {text:'从体现碰撞部位的角度来拍摄本车全景'},
      {text:'根据事故现场具体情况，拍摄能反应事故现场及事故本身的其他照片'}
    ]    
     $scope.showAlert = function(id) {
       var alertPopup = $ionicPopup.alert({
         title: '温馨提示',
         template: info[id].text
       });
     };

     $scope.submit = function(){
         var confirmPopup = $ionicPopup.confirm({
           title: '确定提交吗？',
           template: '提交的信息将上传到系统中'
         });

         confirmPopup.then(function(res) {
           if(res) {
              $ionicLoading.show({template: '请稍后...'});
              $timeout(function(){
                  $scope.img = {
                    "cqf": "img/cqf.png",
                    "chf": "img/chf.png",
                    "pzbw": "img/pzbw.png",
                    "qt": "img/qt.png"
                  }      
              },500).then(function(){
                ionicToast.show('信息已经保存到服务器', 'middle', false, 2500)
                $ionicLoading.hide();               
              })
           } else {
              // ionicToast.show('取消保存', 'middle', false, 2500)
           }
         });       
     }

     $scope.getpic = function($event,img){
        console.log(img)
        document.addEventListener("deviceready", function () {
          var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 158,
            targetHeight: 120,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation:true
          };

          $cordovaCamera.getPicture(options).then(function(imageData) {
            //var image = document.getElementById('myImage');            
            //image.src = "data:image/jpeg;base64," + imageData;
            switch(img){
              case 'cqf':
                $scope.img.cqf = "data:image/jpeg;base64," + imageData;
                break;
              case 'chf':
                $scope.img.chf = "data:image/jpeg;base64," + imageData;
                break;                            
              case 'pzbw':
                $scope.img.pzbw = "data:image/jpeg;base64," + imageData;
                break;              
              case 'qt':
                $scope.img.qt = "data:image/jpeg;base64," + imageData;
                break;              
            }
          }, function(err) {
            // error
          });
        }, false);
      
     }


})





// 多车事故处理
.controller('sgclmCtrl', function($scope,$state,$ionicPopup,$ionicLoading,$timeout,$cordovaCamera,ionicToast){

    $scope.reload = function(){
      $ionicLoading.show({template: '请稍后...'});
      $timeout(function(){
        $state.reload();        
      },500).then(function(){
        $ionicLoading.hide();
      })
    }    
    // $scope.img = [
    //   {cqf: "img/cqf.png"},
    //   {chf: "img/chf.png"},
    //   {bcf: "img/bcf.png"},
    //   {dfc: "img/dfc.png"},
    //   {pzbw: "img/pzbw.png"},
    //   {qt: "img/qt.png"}
    // ];
    $scope.img = {
      "cqf": "img/cqf.png",
      "chf": "img/chf.png",
      "bcf": "img/bcf.png",
      "dfc": "img/dfc.png",
      "pzbw": "img/pzbw.png",
      "qt": "img/qt.png"
    }

    var info = [
      {text:'清晰反应出车牌号车辆之间位置关系及车辆与标线的位置关系'},
      {text:'从体现碰撞部位的角度来拍摄本车全景'},
      {text:'根据事故现场具体情况，拍摄能反应事故现场及事故本身的其他照片'}
    ]

     $scope.showAlert = function(id) {
       var alertPopup = $ionicPopup.alert({
         title: '温馨提示',
         template: info[id].text
       });
     };

     $scope.submit = function(){
         var confirmPopup = $ionicPopup.confirm({
           title: '确定提交吗？',
           template: '提交的信息将上传到系统中'
         });

         confirmPopup.then(function(res) {
           if(res) {
              $ionicLoading.show({template: '请稍后...'});
              $timeout(function(){
                  $scope.img = {
                    "cqf": "img/cqf.png",
                    "chf": "img/chf.png",
                    "bcf": "img/bcf.png",
                    "dfc": "img/dfc.png",
                    "pzbw": "img/pzbw.png",
                    "qt": "img/qt.png"
                  }      
              },500).then(function(){
                ionicToast.show('信息已经保存到服务器', 'middle', false, 2500)
                $ionicLoading.hide();               
              })
           } else {
              // ionicToast.show('取消保存', 'middle', false, 2500)
           }
         });       
     }

     $scope.getpic = function($event,img){
        console.log(img)
        document.addEventListener("deviceready", function () {
          var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 158,
            targetHeight: 120,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation:true
          };

          $cordovaCamera.getPicture(options).then(function(imageData) {
            //var image = document.getElementById('myImage');            
            //image.src = "data:image/jpeg;base64," + imageData;
            switch(img){
              case 'cqf':
                $scope.img.cqf = "data:image/jpeg;base64," + imageData;
                break;
              case 'chf':
                $scope.img.chf = "data:image/jpeg;base64," + imageData;
                break;              
              case 'bcf':
                $scope.img.bcf = "data:image/jpeg;base64," + imageData;
                break;              
              case 'dfc':
                $scope.img.dfc = "data:image/jpeg;base64," + imageData;
                break;              
              case 'pzbw':
                $scope.img.pzbw = "data:image/jpeg;base64," + imageData;
                break;              
              case 'qt':
                $scope.img.qt = "data:image/jpeg;base64," + imageData;
                break;              
            }
          }, function(err) {
            // error
          });
        }, false);
      
     }

})

