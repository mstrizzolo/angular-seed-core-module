'use strict';

angular.module('Core.services')
    .factory('ContentSrv', function(){
        var content = {};

        var get = function(key){
            var originalKeyString, keys, partialContent;

            if( !_.isString(key) || _.isEmpty(content)){
                return;
            }

            if( key.indexOf('.') === -1 ){
                return content[key] || undefined;
            }else{
                partialContent = content;
                originalKeyString = key;
                keys = key.split('.');

                keys.forEach(function(key){
                    if( !partialContent ){
                        console.error('ContentSrv couldn\'t find "'+ key +'" property in "'+ originalKeyString +'" so undefined will be returned.');
                        return undefined;
                    }

                    partialContent = partialContent[key] || undefined;
                });

                return partialContent;
            }
        };

        var init = function(_content){
            if( _.isObject(_content) ){
                content = _content;
            }
        };

        return {
            init: init,
            get: get
        };
    });