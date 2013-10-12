/**
 * This factory provides a simple regular expression base for use in determining link and link types
 * @name angulartodo#urlRegEx
 * @return {Object} Object of regular expressions
 */
angular.module("angulartodo").factory("urlRegEx",[
    function(){
        return {
            isYoutube : function(string){ //Regular expression for youtube links
                return (/^(http|https):\/\/+(www.youtube.com\/watch\?v=|www.youtu.be\/|www.youtube.com\/embed\/)+\w{11}/).test(string);
            },
            isLink    : function(string){ //Regular expression for links
                return (/^(http|https):\/\//).test(string);
            }
        };
}]);