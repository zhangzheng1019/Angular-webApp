'use strict';

angular.module('app').directive('appPositionList', [function() {
    return {
        restrict: "A",
        replace: true,
        templateUrl: "view/template/positionList.html",
        scope: {
            data: '=',
            filterObj: "="
        },
        link: function($scope) {
            $scope.name = cache.get('name') || '';
            $scope.select = function(item) {
                item.select = !item.select;
            }
        }
    };
}]);
