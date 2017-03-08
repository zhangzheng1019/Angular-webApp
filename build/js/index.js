'use strict';

angular.module('app', ['ui-router']);

'use strict';


angular.module('app', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main', {
        url: '/main',
        templateUrl: 'view/main.html',
        controller: 'mainCtrl'
    }).state('position', {
        url: '/position/:id',
        templateUrl: 'view/position.html',
        controller: 'positionCtrl'
    }).state('company', {
        url: '/company/:id',
        templateUrl: 'view/company.html',
        controller: 'companyCtrl'
    });

    $urlRouterProvider.otherwise('main');
}]);

'use strict';

angular.module('app').controller('companyCtrl', ['$http', '$state', '$scope', function($http, $state, $scope) {
    $http.get('/data/company.json?id=' + $state.params.id).then(function(res) {
        $scope.company = res.data;
    })
}])

'use strict';

angular.module('app').controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/data/positionList.json').then(function(res) {
        $scope.list = res.data;
    })
}])

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

'use strict';

angular.module('app').directive('appCompany', [function() {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            com: '='
        },
        templateUrl: 'view/template/company.html'
    };
}]);

'use strict';

angular.module('app').directive('appFoot', [function() {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/foot.html'
    };
}]);

'use strict';

angular.module('app').directive('appHead', [function() {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/head.html'
    };
}]);

'use strict';

angular.module('app').directive('appHeadBar', [function() {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/headBar.html',
        scope: {
            text: '@'
        },
        link: function(scope) {
            scope.back = function() {
                window.history.back();
            };
        }
    };
}]);

'use strict';
angular.module('app').directive('appPositionClass', [function() {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            com: '='
        },
        templateUrl: 'view/template/positionClass.html',
        link: function($scope) {
            $scope.showPositionList = function(idx) {
                $scope.positionList = $scope.com.positionClass[idx].positionList;
                $scope.isActive = idx;
            }
            $scope.showPositionList(0);
            // console.log($scope.company.positionClass[0][0].positionList)
        }
    };
}]);

'use strict';

angular.module('app').directive('appPositionInfo', [function() {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/positionInfo.html',
        scope: {
            isActive: '=',
            isLogin: '=',
            pos: '='
        },
        link: function(scope) {
            scope.imagePath = scope.isActive ? 'image/star-active.png' : 'image/star.png';
        }
    };
}]);

'use strict';

angular.module('app').directive('appPositionList', [function() {
    return {
        restrict: "A",
        replace: true,
        templateUrl: "view/template/positionList.html",
        scope: {
            data: '='
        }
    };
}]);
