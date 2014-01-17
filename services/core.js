'use strict';

angular.module('Core.services')
    .factory('CoreSrv', function($filter){
        var filterBy = $filter('filter');

        var round = function(value, decimals){
            if( _.isUndefined(value) || _.isNaN(value) || _.isNull(value) || !_.isNumber(value) ){
                return;
            }
            if( _.isUndefined(decimals) || _.isNaN(decimals) || _.isNull(decimals) || !_.isNumber(decimals) ){
                decimals = 0;
            }

            var factor = Math.pow( 10, decimals );
            return Math.round( value * factor ) / factor;
        };

        var deepClone = function(obj) {
            var func, isArr;
            if( !obj ){
                return;
            }
            if (!_.isObject(obj) || _.isFunction(obj)) {
                return obj;
            }
            if (_.isDate(obj)) {
                return new Date(obj.getTime());
            }
            if (_.isRegExp(obj)) {
                return new RegExp(obj.source, obj.toString().replace(/.*\//, ''));
            }
            isArr = _.isArray(obj || _.isArguments(obj));
            func = function(memo, value, key) {
                if (isArr) {
                    memo.push(deepClone(value));
                } else {
                    memo[key] = deepClone(value);
                }
                return memo;
            };
            return _.reduce(obj, func, isArr ? [] : {});
        };

        return {
            filterBy: filterBy,
            round: round,
            deepClone: deepClone
        };
    });