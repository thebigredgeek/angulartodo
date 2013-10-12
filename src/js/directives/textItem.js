/**
 * This directive renders a regular text item for the todo list
 * @name   angulartodo#textItem
 * @return {Object}   Directive definition
 */
angular.module('angulartodo').directive('textItem',[

    function(){

        var definition          =   {};                         // Definition prototype

        definition.restrict     =   "E";                        // This restricts the directive to an element form
        definition.controller   =   "textItemController";       // Use the textItemController as the controller
        definition.templateUrl  =   "directives/textItem.html"; // Use the textItem.html partial for the template

        definition.link         =   angular.noop;               // We aren't actually doing anything during the link, but we need to provide the member
          
        
        return definition;                                      // Return the definition
        

}]);