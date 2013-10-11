/*! angulartodo - v0.0.0 - 11/10/2013 */angular.module("angulartodo",[]);
angular.module("angulartodo")
    .config([
                '$routeProvider',
        function($routeProvider){
            $routeProvider
                .when("/",{
                    templateUrl:"partials/demoPartial.html",
                    controller:"demoController"
                })
                .otherwise({
                    redirectTo:"/"
                });
    }]);
angular.module("angulartodo")
    .controller('demoController',[
                '$scope',
        function($scope){
            var publicMembers = $scope,
                privateMembers = {};


            publicMembers.hello = function(){
                return 'world';
            };

            return publicMembers;
    }]);
angular.module("angulartodo")
    .controller('demoControllerRoot',[
        '$scope',
        function($scope){
            var publicMembers = $scope,
                privateMembers = {};


            publicMembers.rows = 10;

            return publicMembers;
        }]);
angular.module("angulartodo")
    .directive('demoDirective',[
        function(){
            var definition = {};

            definition.restrict = "E";
            definition.transclude = true;
            definition.templateUrl = "directives/demoDirective.html";
            definition.link = function(scope,element,attr){};

            return definition;
    }]);
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