'use strict';

angular.module('app', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    'use strict';
    $stateProvider.state('main', {
        url: '/main',
        templateUrl: 'view/main.html',
        controller: 'mainCtrl'
    });
    // $stateProvider.state('search', {
    //     url: '/search',
    //     templateUrl: 'view/search.html',
    //     controller: 'searchCtrl'
    // });

    $urlRouterProvider.otherwise('main');
}]);
