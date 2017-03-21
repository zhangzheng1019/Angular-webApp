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
