/**
 * This factory provides a simple regular expression base for use in determining link and link types
 * @name angulartodo#urlRegEx
 * @return {Object} Object of regular expressions
 */
angular.module("angulartodo").factory("urlRegEx",[
    function(){
        return {
            getVideoId: function(string){ //parses out the video ID
                return string.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/)[1]; //return the video id
            },
            isYoutube : function(string){ //Regular expression for youtube links
                return (/^(http|https):\/\/+(www.youtube.com\/watch\?v=|www.youtu.be\/|www.youtube.com\/embed\/)+\w{11}/).test(string);
            },
            isLink    : function(string){ //Regular expression for links
                return (/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/).test(string);
            }
        };
}]);