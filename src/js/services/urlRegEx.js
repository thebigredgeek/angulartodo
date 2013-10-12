/**
 * This factory provides a simple regular expression base for use in determining link and link types
 * @name angulartodo#urlRegEx
 * @return {Object} Object of regular expressions
 */
angular.module("angulartodo").factory("urlRegEx",[
    function(){
        return {
            youtube : function(string){ //Regular expression for youtube links
                return (/^(http|https):\/\/+(www.youtube.com\/watch\?v=|www.youtu.be\/)+\w{11}/).test(string);
            },
            link    : function(string){ //Regular expression for links
                return (/^(http|https):\/\//).test(string);
            }
        };
}]);