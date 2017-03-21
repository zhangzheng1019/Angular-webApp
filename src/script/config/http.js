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
