/**
 * This controller is used by youtubeItem directives
 * @name angulartodo#youtubeItemController
 * @param  {Object} $scope       An instance of $scope
 * @param  {Object} $attrs       An object containing html attributes bound to this directive
 */
angular.module('angulartodo').controller('youtubeItemController',[
            '$scope','$attrs',
    function($scope,  $attrs){

        $scope.text = $attrs.text;  //bind the text
        
}]);