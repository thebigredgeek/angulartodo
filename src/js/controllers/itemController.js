/**
 * This controller is used by item directives, which filter down to specific derivatives
 * @name angulartodo#itemController
 * @param  {Object} $scope       An instance of $scope
 * @param  {Object} $attrs       An object containing the parameters bound to the directive
 */
angular.module('angulartodo').controller('itemController',[
            '$scope','$attrs','urlRegEx',
    function($scope,  $attrs,  urlRegEx){

        var publicMembers   = $scope,
            privateMembers  = {};
            

        privateMembers.itemFactory = function(type,text){
            return {
                type: type,
                text: text,
                status: 'active'
            };
        };


        if(urlRegEx.youtube($attrs.text)){                                      //filter youtube (filter before link, as youtube would validate as a link)
            console.log('youtube item');
            $scope.item = privateMembers.itemFactory('youtube',$attrs.text);    //build a youtube item
        }
        else if(urlRegEx.link($attrs.text)){                                    //filter links
            console.log('link item');                                   
            $scope.item = privateMembers.itemFactory('link',$attrs.text);       //build a link item
        }
        else{                                                                   //default to regular rext
            console.log('text item');
            $scope.item = privateMembers.itemFactory('text',$attrs.text);       //build a text item
        }         


        
}]);