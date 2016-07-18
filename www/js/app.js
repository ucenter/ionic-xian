// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova','ionic-datepicker'])

.run(function($ionicPlatform,$rootScope,$ionicHistory,$ionicLoading,$ionicActionSheet,
  $timeout,$cordovaAppVersion,$ionicPopup,$cordovaFileTransfer,$cordovaFile,$cordovaFileOpener2,
  pub) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
  });

    $rootScope.$on('$stateChangeStart',function(){
        $ionicLoading.show({
          template: '加载中...'
        })
    });
    $rootScope.$on('$stateChangeSuccess',function(){
      $ionicLoading.hide();
    }); 

    $rootScope.myGoBack = function() {
        $ionicHistory.goBack();
    };


    //全局变量，1.百度网络获取城市 2.根据城市获取天气，3.获取日期
    $rootScope.pub = {};
    pub.getLocation().then(function(location){
      //百度API获取城市
      console.log(location)
      $rootScope.pub.location = location.data.content.address;
      $rootScope.pub.city_code = location.data.content.address_detail.city_code;
      //根据城市获取天气信息
      return pub.getWeather($rootScope.pub.location)      
    },function(err){
      return false;
    }).then(function(weather){
      console.log(weather)
      $rootScope.pub.weather = weather.data.result.data;
      return pub.getDate();
    }).then(function(date){
      console.log(date)
      $rootScope.pub.date = date.data.result.data;
    })

    //全局位置信息
    $rootScope.location = '东大桥山水铂宫';


    checkUpdate();

    // 检查更新
    function checkUpdate() {
        var serverAppVersion = "1.0.0"; //从服务端获取最新版本
        //获取版本
        document.addEventListener('deviceready',function(){
          $cordovaAppVersion.getVersionCode().then(function (version) {
              //如果本地于服务端的APP版本不符合
              if (version != serverAppVersion) {
                  showUpdateConfirm();
              }
          });          
        })
    }

    // 显示是否更新对话框
    function showUpdateConfirm() {
        var confirmPopup = $ionicPopup.confirm({
            title: '版本升级',
            template: '1.xxxx;</br>2.xxxxxx;</br>3.xxxxxx;</br>4.xxxxxx', //从服务端获取更新的内容
            cancelText: '取消',
            okText: '升级'
        });
        confirmPopup.then(function (res) {
            if (res) {
                $ionicLoading.show({
                    template: "已经下载：0%"
                });
                var url = "http://demo.simovision.cn/"; //可以从服务端获取更新APP的路径
                var targetPath = "file:///storage/sdcard0/Download/1.apk"; //APP下载存放的路径，可以使用cordova file插件进行相关配置
                var trustHosts = true
                var options = {};
                
                $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
                    // 打开下载下来的APP
                    $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive'
                    ).then(function () {
                            // 成功
                        }, function (err) {
                            // 错误
                        });
                    $ionicLoading.hide();
                }, function (err) {
                    alert('下载失败');
                }, function (progress) {
                    //进度，这里使用文字显示下载百分比
                    $timeout(function () {
                        var downloadProgress = (progress.loaded / progress.total) * 100;
                        $ionicLoading.show({
                            template: "已经下载：" + Math.floor(downloadProgress) + "%"
                        });
                        if (downloadProgress > 99) {
                            $ionicLoading.hide();
                        }
                    })
                });
            } else {
                // 取消更新
            }
        });
    }

//end run
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

    $ionicConfigProvider.scrolling.jsScrolling(false);//原生滚动

    $ionicConfigProvider.platform.ios.tabs.style('standard'); 
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');        

    $ionicConfigProvider.platform.ios.views.transition('ios'); 
    $ionicConfigProvider.platform.android.views.transition('android');


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('paihome',{
    url:'/paihome',
    templateUrl:'templates/pai-home.html',
    controller:'paiHomeCtrl'
  })
  .state('paixuncha', {
    url: '/paixuncha',
    templateUrl: 'templates/pai-xuncha.html',
    controller: 'paiXunchaCtrl'
  })
  .state('paijubao', {
    url: '/paijubao',
    templateUrl: 'templates/pai-jubao.html',
    controller: 'paiJubaoCtrl'
  })
  .state('paishangchuan',{
    url:'/paishangchuan',
    templateUrl:'templates/pai-shangchuan.html',
    controller:'paiShangchuanCtrl'
  })  
  .state('pailishi',{
    url:'/pailishi',
    templateUrl:'templates/pai-lishi.html',
    controller:'paiLishiCtrl'
  })
  .state('shiguchuli',{
    url: '/shiguchuli',
    templateUrl: 'templates/shiguchuli.html',
    controller: 'shiguchuliCtrl'
  })
  .state('sgcls',{
    url: '/sgcls',
    templateUrl: 'templates/shiguchuli-single.html',
    controller: 'sgclsCtrl'
  })
  .state('sgclm',{
    url: '/sgclm',
    templateUrl: 'templates/shiguchuli-multi.html',
    controller: 'sgclmCtrl'
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('tab.list', {
      url: '/list',
      views: {
        'tab-list': {
          templateUrl: 'templates/tab-yewu.html',
          controller: 'listCtrl'
        }
      }
    })
    .state('tab.list-detail', {
      url: '/list/:listId',
      views: {
        'tab-list': {
          templateUrl: 'templates/list-detail.html',
          controller: 'listDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.search',{
    url:'/search',
    views:{
      'tab-search':{
        templateUrl: 'templates/tab-search.html',
        controller:'searchCtrl'
      }
    }
  })
  .state('login',{
    url:'/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })
  .state('ksh',{
    url:'/kshhome',
    templateUrl:'templates/ksh-home.html',
    controller:'kshHomeCtrl'
  })
  .state('xuncha',{
    url:'/xunchahome',
    templateUrl:'templates/xuncha-home.html',
    controller:'xunchaHomeCtrl'
  })  



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
