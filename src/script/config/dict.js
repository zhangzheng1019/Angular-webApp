'use strict';
// value()声明全局变量
angular.module('app', ['ui.router', 'ngCookies']).value('dict', {}).run(['dict', '$http', function(dict, $http) {
    $http.get('data/city.json').then(function(resp) {
        dict.city = resp.data;
    });
    $http.get('data/salary.json').then(function(resp) {
        dict.salary = resp.data;
    });
    $http.get('data/scale.json').then(function(resp) {
        dict.scale = resp.data;
    });
}]);
