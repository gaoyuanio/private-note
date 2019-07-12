var str = location.href;
var arr = str.split("?");
var str1 = arr[1];
if (str1 == undefined) {
  var token = api();
}
else {
  if (str1) { var tokid = str1.split("=")[1]; }
  var tokids = tokid.split("&");

  var tokens = tokids[0];
  localStorage.setItem("lastname", tokens);
}

$(document).ready(function () {
  var main = $(".main");
  checkMainHeight();
  $(window).on("resize.window", function () {
    checkMainHeight();
  });
  function checkMainHeight() {
    var hei = $(window).height() - $(".top-bar").outerHeight() - $(".search_box").outerHeight() - $(".foot").outerHeight();
    main.css("height", hei + "px");
  }
});


var app = angular.module('demoApp', ['JDApiService']);
app.controller('DemoCtrl', ["$scope", "$rootScope", "$sce", "$http", "categories",
  function ($scope, $rootScope, $sce, $http, categoriesService) {

    var token = api();

    $scope.activeTab = 0;
    $scope.loading = true; // 数据是否仍在获取

    $scope.topCategories = {}; // 一级分类
    $scope.subCategories = {}; // 一级分类下的二三级分类

    $scope.switchCategory = switchCategory; // 切换二三级分类

    init();

    function init () {
      getData(token)
      setReferer()
    }

    function switchCategory(id, $index) {
      $scope.activeTab = $index;
      categoriesService.getSubCategories(id).then(function (subCategories) {
        $scope.subCategories = subCategories;
      })
    }

    function getData (token) {

      categoriesService.getTopCategories().then(function (categories) {
        $scope.topCategories = categories;
        return categories[0].id;
      })
      .then( categoriesService.getSubCategories )
      .then(function (subCategories) {
        $scope.subCategories = subCategories;
        $scope.loading = false;
      })
      .catch( layerOpen('用户信息错误') );
    }

  }]);

app.directive('srcErr', function () {
  return {
    link: function (scope, element, attrs) {
      element.bind('error', function () {
        element.parents('li').addClass('item-no-img')
      })

    }
  }
});

function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

function setReferer () {
  var referer = GetQueryString('referer');
  referer && window.localStorage.setItem('referer', referer);
}

function layerOpen (msg) {
  return function () {
    return layer.open({
      content: msg,
      skin: 'msg',
      time: 3
    })
  };
}