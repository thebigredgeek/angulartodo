/**
 * This controller is used by textItem directives
 * @name angulartodo#textItemController
 * @param  {Object} $scope       An instance of $scope
 * @param  {Object} $attrs       An object containing html attributes bound to this directive
 */
angular.module('angulartodo').controller('textItemController',[
            '$scope','$attrs',
    function($scope,  $attrs){

        $scope.text = $attrs.text;  //bind the text

}]);