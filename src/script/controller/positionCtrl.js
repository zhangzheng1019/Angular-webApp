'use strict';

angular.module('app').controller('positionCtrl', ['$q', '$http', '$state', '$scope',
    function($q, $http, $state, $scope) {
        $scope.isLogin = false;

        function getPosition() {
            var def = $q.defer(); //延迟加载对象
            $http.get('/data/position.json?id=' + $state.params.id).then(function(res) {
                $scope.position = res.data;
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
            getCompany(obj.data.companyId)
        });
    }
])
