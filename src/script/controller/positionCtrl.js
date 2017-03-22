'use strict';

angular.module('app').controller('positionCtrl', ['$log', '$q', '$http', '$state', '$scope', 'cache', function($log, $q, $http, $state, $scope, cache) {
    $scope.isLogin = !!cache.get('name');
    $scope.message = $scope.isLogin ? '投个简历' : '去登录';

    function getPosition() {
        var def = $q.defer(); //创建延迟加载对象
        $http.get('/data/position.json', {
            params: {
                id: $state.params.id
            }
        }).then(function(res) {
            $scope.position = res.data;
            if (res.data.posted) {
                $scope.message = '已投递';
            }
            def.resolve(res);
        }, function(err) {
            def.reject(err);
        });
        return def.promise;
    }

    function getCompany(id) {
        $http.get('data/company.json?id=' + id).then(function(res) {
            $scope.company = res.data;
        })
    }
    getPosition().then(function(obj) {
        getCompany(obj.data.companyId);
    });
    /*
        func1()和func2()均为promise对象
        $q.all([func1(),func2()]).then(function(result){});

     */
    $scope.go = function() {
        if ($scope.message !== '已投递') {

            if ($scope.isLogin) {
                $http.post('data/handle.json', {
                    id: $scope.position.id
                }).success(function(res) {
                    $log.info(res.data);
                    $scope.message = '已投递';
                })
            } else {
                $state.go('login');
            }
        }
    }
}])
