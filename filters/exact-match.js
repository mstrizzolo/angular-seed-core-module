'use strict';

angular.module('Core.filters')
    .filter('exactMatch', function(){
        return function(items, filter){
            if( !filter ){
                return items;
            }
            var matching = [], matches;

            angular.forEach(items, function(item){
                matches = true;
                angular.forEach(filter, function(value, key){
                    if(value){ // do not compare if value is empty
                        matches = matches && (item[key] === value);
                    }
                });
                if(matches){
                    matching.push(item);
                }
            });
            return matching;
        };
    });