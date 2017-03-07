'use strict';

angular.module('app').controller('mainCtrl', ['$scope', function($scope) {
    $scope.list = [{
        id: '1',
        name: '销售',
        imgSrc: 'image/company-3.png',
        companyName: '千度',
        city: '上海',
        industry: '互联网',
        time: '2016-06-11 11:05'
    }, {
        id: '2',
        name: 'web前端',
        imgSrc: 'image/company-1.png',
        companyName: '慕课网',
        city: '北京',
        industry: '互联网',
        time: '2016-06-01 11:05'
    }];
}])
