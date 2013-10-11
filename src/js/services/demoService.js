/**
 * @ngdoc service
 * @name angulartodo.service:demoService
 * @description Just a demo service
 */
angular.module("angulartodo")
    .factory('demoService',[
        function(){
            var publicMembers = {},
                privateMembers = {};
            publicMembers.hello = function(){
                return "world";
            };

            return publicMembers;
    }]);