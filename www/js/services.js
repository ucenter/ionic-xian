angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('pub', ['$http', function($http){
  var apistoreAK = '502ba87e0b35e4b4d86fc449e837de07';
  var juheweather = '01aa68e8fb57cc7fe3a053098ae93dc3';
  var juhewnl = '86cdad675224aee6017fa600da2bf62c';
  var date = new Date();
  var myDate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
  return {
    getWeather:function(cityname){
      // return $http({
      //   method:'get',
      //   url:'http://apis.baidu.com/apistore/weatherservice/weather?citypinyin='+cityname,
      //   headers:{
      //     apikey: apistoreAK
      //   }
      // })
      return $http.get('http://op.juhe.cn/onebox/weather/query?cityname='+cityname+'&key='+juheweather)
    },
    getLocation: function(){
      return $http.get('http://api.map.baidu.com/location/ip?ak=485a9e87c98054c55b50404385e10ed1')      
    },
    getDate: function(){
      return $http.get('http://japi.juhe.cn/calendar/day?date='+myDate+'&key='+juhewnl);
    }

  }
}])  