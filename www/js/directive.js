angular.module('starter')

.directive("appMap", function () {
  return {
    restrict: "E",
    replace: true,
    template: "<div id='allMap'></div>",
    scope: {
      center: "=",		// Center point on the map (e.g. <code>{ latitude: 10, longitude: 10 }</code>).
      markers: "=",	   // Array of map markers (e.g. <code>[{ lat: 10, lon: 10, name: "hello" }]</code>).
      width: "@",		 // Map width in pixels.
      height: "@",		// Map height in pixels.
      zoom: "@",		  // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
      zoomControl: "@",   // Whether to show a zoom control on the map.
      scaleControl: "@",   // Whether to show scale control on the map.
      address:"@"
    },
    link: function (scope, element, attrs) {
      var map;
      // 百度地图API功能
      map = new BMap.Map("allMap");
      //map.addControl(new BMap.ZoomControl());

      //var point = new BMap.Point(116.331398,39.897445);

      //导航控件
      var navigationControl = new BMap.NavigationControl({
        // 靠左上角位置
        anchor: BMAP_ANCHOR_TOP_LEFT,
        // LARGE类型
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        // 启用显示定位
        enableGeolocation: true
      });
      map.addControl(navigationControl);

      // 创建地址解析器实例
       var myGeo = new BMap.Geocoder();
      // 将地址解析结果显示在地图上,并调整地图视野
      myGeo.getPoint(scope.address, function(point){
        if (point) {
          map.centerAndZoom(point, 16);
          map.addOverlay(new BMap.Marker(point));
          function showInfo(e){
            alert(e.point.lng + ", " + e.point.lat);
          }
          map.addEventListener("click", showInfo);
        }
      }, "");
    }
  };
});