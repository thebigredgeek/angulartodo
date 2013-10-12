/**
 * This directive renders a link item for the todo list
 * @name   angulartodo#linkItem
 * @return {Object}   Directive definition
 */
angular.module('angulartodo').directive('linkItem',[

    function(){

        var definition          =   {};                         // Definition prototype

        definition.restrict     =   "E";                        // This restricts the directive to an element form
        definition.controller   =   "linkItemController";       // Use the linkItemController as the controller
        definition.templateUrl  =   "directives/linkItem.html"; // Use the linkItem.html partial for the template

        definition.link         =   angular.noop;               // We aren't actually doing anything during the link, but we need to provide the member
          
        
        return definition;                                      // Return the definition
        

}]);