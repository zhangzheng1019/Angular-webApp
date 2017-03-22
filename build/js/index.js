'use strict';

angular.module('app', ['ui.router', 'ngCookies', 'validation']);

'use strict';
// value()声明全局变量
angular.module('app').value('dict', {}).run(['dict', '$http', function(dict, $http) {
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
angular.module('app').config(['$provide', function($provide) {
    $provide.decorator('$http', ['$delegate', '$q', function($delegate, $q) {
        $delegate.post = function(url, data, config) {
            var def = $q.defer();
            $delegate.get(url).then(function(resp) {
                def.resolve(resp);
            }).then(function(err) {
                def.reject(err);
            });
            return {
                success: function(cb) {
                    def.promise.then(cb);
                },
                error: function(cb) {
                    def.promise.then(null, cb);
                }
            }
        }
        return $delegate;
    }]);
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
angular.module('app').config(['$validationProvider', function($validationProvider) {
    //规则
    var expression = {
        phone: /^1[\d]{10}/,
        password: function(value) {
            var str = value + '';
            return str.length > 5;
        },
        required: function(value) {
            return !!value;
        }
    };
    // 错误提示语
    var defaultMsg = {
        phone: {
            success: '',
            error: '必须是11为手机号'
        },
        password: {
            success: '',
            error: '长度至少6位'
        },
        required: {
            success: '',
            error: '不能为空'
        }
    };
    // setExpression:配置规则
    // setDefaultMsg:配置错误提示
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
    $http.get('data/myFavorite.json').then(function(resp) {
        $scope.list = resp.data;
    });
}])

'use strict';
angular.module('app')
    .controller('loginCtrl', ['cache', '$state', '$http', '$scope', function(cache, $state, $http, $scope) {
        $scope.submit = function() {
            $http.post('data/login.json', $scope.user).success(function(resp) {
                cache.put('id', resp.data.id);
                cache.put('name', resp.data.name);
                cache.put('image', resp.data.image);
                $state.go('main');
            });
        }
    }]);

'use strict';

angular.module('app').controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/data/positionList.json').then(function(res) {
        $scope.list = res.data;
    })
}])

'use strict';
angular.module('app').controller('meCtrl', ['$state', 'cache', '$http', '$scope', function($state, cache, $http, $scope) {
    if (cache.get('name')) {
        $scope.name = cache.get('name');
        $scope.image = cache.get('image');
    }
    $scope.logout = function() {
        cache.remove('id');
        cache.remove('name');
        cache.remove('image');
        $state.go('main');
    };
}]);

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

'use strict';
angular.module('app').controller('postCtrl', ['$http', '$scope', function($http, $scope) {
    $scope.tabList = [{
        id: 'all',
        name: '全部'
    }, {
        id: 'pass',
        name: '面试邀请'
    }, {
        id: 'fail',
        name: '不合适'
    }];
    $http.get('data/myPost.json').then(function(res) {
        $scope.positionList = res.data;
    });
    $scope.filterObj = {};
    $scope.tClick = function(id, name) {
        switch (id) {
            case 'all':
                delete $scope.filterObj.state;
                break;
            case 'pass':
                $scope.filterObj.state = '1';
                break;
            case 'fail':
                $scope.filterObj.state = '-1';
                break;
            default:

        }
    }
}]);

'use strict';
angular.module('app').controller('registerCtrl', ['$interval', '$http', '$scope', '$state', function($interval, $http, $scope, $state) {
    $scope.submit = function() {
        $http.post('data/regist.json', $scope.user).success(function(resp) {
            $state.go('login');
        });
    };
    var count = 60;
    $scope.send = function() {
        $http.get('data/code.json').then(function(resp) {
            if (1 === resp.state) {
                count = 60;
                $scope.time = '60s';
                var interval = $interval(function() {
                    if (count <= 0) {
                        $interval.cancel(interval);
                        $scope.time = '';
                    } else {
                        count--;
                        $scope.time = count + 's';
                    }
                }, 1000);
            }
        });
    }
}]);

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

angular.module('app').directive('appHead', ['cache', function(cache) {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/head.html',
        link: function($scope) {
            $scope.name = cache.get('name');
        }
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

angular.module('app').directive('appPositionInfo', ['$http', function($http) {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/positionInfo.html',
        scope: {
            isLogin: '=',
            pos: '='
        },
        link: function(scope) {
            scope.$watch('pos', function(newVale) {
                if (newVale) {
                    scope.pos.select = scope.pos.select || false;
                    scope.imagePath = scope.pos.select ? 'image/star-active.png' : 'image/star.png';
                }
            })
            scope.favorite = function() {
                $http.post('data/favorite.json', {
                    id: scope.pos.id,
                    select: scope.pos.select
                }).success(function(res) {
                    scope.pos.select = !scope.pos.select;
                    scope.imagePath = scope.pos.select ? 'image/star-active.png' : 'image/star.png';
                })
            }
        }
    };
}]);

'use strict';

angular.module('app').directive('appPositionList', ['$http', function($http) {
    return {
        restrict: "A",
        replace: true,
        templateUrl: "view/template/positionList.html",
        scope: {
            data: '=',
            filterObj: "=",
            isFavorite: '='
        },
        link: function($scope) {
            $scope.select = function(item) {
                $http.post('data/favorite.json', {
                    id: item.id,
                    select: !item.select
                }).success(function(res) {
                    item.select = !item.select;
                })
            }
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
angular.module('app').service('cache', ['$cookies', function($cookies) {
    this.put = function(key, value) {
        $cookies.put(key, value);
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
