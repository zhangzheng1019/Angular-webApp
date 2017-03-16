'use strict';

angular.module('app', ['ui-router', 'ngCookies', 'validation']);

'use strict';
// value()声明全局变量
angular.module('app', ['ui-router', 'ngCookies', 'validation']).value('dict', {}).run(['dict', '$http', function(dict, $http) {
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

'use strict';


angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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
    }).state('search', {
        url: '/search',
        templateUrl: 'view/search.html',
        controller: 'searchCtrl'
    }).state('login', {
        url: '/login',
        templateUrl: 'view/login.html',
        controller: 'loginCtrl'
    }).state('register', {
        url: '/register',
        templateUrl: 'view/register.html',
        controller: 'registerCtrl'
    }).state('me', {
        url: '/me',
        templateUrl: 'view/me.html',
        controller: 'meCtrl'
    }).state('post', {
        url: '/post',
        templateUrl: 'view/post.html',
        controller: 'postCtrl'
    }).state('favorite', {
        url: '/favorite',
        templateUrl: 'view/favorite.html',
        controller: 'favoriteCtrl'
    });

    $urlRouterProvider.otherwise('main');
}]);

"use strict";
angular.module('app', ['ui-router', 'ngCookies', 'validation']).config(['$validationProvider', function($validationProvider) {
    var expression = {
        phone: /^1[\d]{10}/,
        password: function(value) {
            return value > 5;
        }
    };
    var defaultMsg = {
        phone: {
            success: '',
            error: '必须是11为手机号'
        },
        password: {
            success: '',
            error: '长度至少6位'
        }
    };
    $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}])

'use strict';

angular.module('app').controller('companyCtrl', ['$http', '$state', '$scope', function($http, $state, $scope) {
    $http.get('/data/company.json?id=' + $state.params.id).then(function(res) {
        $scope.company = res.data;
    })
}])

'use strict';

angular.module('app').controller('favoriteCtrl', ['$scope', '$http', function($scope, $http) {

}])

'use strict';

angular.module('app').controller('loginCtrl', ['$scope', '$http', function($scope, $http) {

}])

'use strict';

angular.module('app').controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/data/positionList.json').then(function(res) {
        $scope.list = res.data;
    })
}])

'use strict';

angular.module('app').controller('meCtrl', ['$scope', '$http', function($scope, $http) {

}])

'use strict';

angular.module('app')
    .controller('positionCtrl', ['$q', '$http', '$state', '$scope', 'cache',
        function($q, $http, $state, $scope, cache) {
            cache.remove('to')
            $scope.isLogin = false;

            function getPosition() {
                var def = $q.defer(); //创建延迟加载对象
                $http.get('/data/position.json', {
                    params: {
                        id: $state.params.id
                    }
                }).then(function(res) {
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
                getCompany(obj.data.companyId);
            });
            /*
                func1()和func2()均为promise对象
                $q.all([func1(),func2()]).then(function(result){});

             */
        }
    ])

'use strict';

angular.module('app').controller('postCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.tabList = [{
        id: 'all',
        name: "全部"
    }, {
        id: 'pass',
        name: "面试邀请"
    }, {
        id: 'fail',
        name: "不合适"
    }]
}])

'use strict';

angular.module('app').controller('registerCtrl', ['$scope', '$http', function($scope, $http) {

}])

'use strict';
angular.module('app').controller('searchCtrl', ['dict', '$http', '$scope', function(dict, $http, $scope) {
    $scope.name = '';
    $scope.search = function() {
        $http.get('data/positionList.json?name=' + $scope.name).then(function(resp) {
            $scope.positionList = resp.data;
        });
    };
    $scope.search();
    $scope.sheet = {};
    $scope.tabList = [{
        id: 'city',
        name: '城市'
    }, {
        id: 'salary',
        name: '薪水'
    }, {
        id: 'scale',
        name: '公司规模'
    }];
    $scope.filterObj = {};
    var tabId = '';
    $scope.tClick = function(id, name) {
        tabId = id;
        $scope.sheet.list = dict[id];
        $scope.sheet.visible = true;
    };
    $scope.sClick = function(id, name) {
        if (id) {
            angular.forEach($scope.tabList, function(item) {
                if (item.id === tabId) {
                    item.name = name;
                }
            });
            $scope.filterObj[tabId + 'Id'] = id;
        } else {
            delete $scope.filterObj[tabId + 'Id'];
            angular.forEach($scope.tabList, function(item) {
                if (item.id === tabId) {
                    switch (item.id) {
                        case 'city':
                            item.name = '城市';
                            break;
                        case 'salary':
                            item.name = '薪水';
                            break;
                        case 'scale':
                            item.name = '公司规模';
                            break;
                        default:
                    }
                }
            });
        }
    }
}]);

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
            };
            $scope.$watch('com', function(newVale) {
                if (newVale) {
                    $scope.showPositionList(0);
                }
            });
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
            data: '=',
            filterObj: "="
        }
    };
}]);

'use strict';
angular.module('app').directive('appSheet', [function() {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            list: '=',
            visible: '=',
            select: "&"
        },
        templateUrl: 'view/template/sheet.html'
    }
}])

'use strict';
angular.module('app').directive('appTab', [function() {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/tab.html',
        scope: {
            list: '=',
            tabClick: '&'
        },
        link: function($scope) {
            $scope.click = function(tab) {
                $scope.selectId = tab.id;
                $scope.tabClick(tab);
            };
        }
    }
}])

'use strict';
angular.module('app').filter('filterByObj', [function() {
    return function(list, obj) {
        var result = [];
        angular.forEach(list, function(item) {
            var isEqual = true;
            for (var e in obj) {
                if (item[e] !== obj[e]) {
                    isEqual = false;
                }
            }
            if (isEqual) {
                result.push(item);
            }
        });
        return result;
    };
}]);

'use strict';
angular.module('app')
    .service('cache', ['$cookies', function($cookies) {
        this.put = function(key, value) {
            return $cookies.put(key, value);
        };
        this.get = function(key) {
            return $cookies.get(key);
        };
        this.remove = function(key) {
            $cookies.remove(key);
        };
    }]);

// .factory('cache', ['$cookies', function($cookies) {
//     return {
//         get: function(key) {
//             return $cookies.get(key);
//         },
//         put: function(key, value) {
//             return $cookies.put(key, value);
//         },
//         remove: function(key) {
//             $cookies.remove(key);
//         }
//     }
// }]);
