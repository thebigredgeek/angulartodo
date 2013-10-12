/**
 * This directive renders a youtube item for the todo list
 * @name   angulartodo#yotubeItem
 * @return {Object}   Directive definition
 */
angular.module('angulartodo').directive('youtubeItem',[

    function(){

        var definition          =   {};                             // Definition prototype

        definition.restrict     =   "E";                            // This restricts the directive to an element form
        definition.controller   =   "youtubeItemController";        // Use the youtubeItemController as the controller
        definition.templateUrl  =   "directives/youtubeItem.html";  // Use the youtubeItem.html partial for the template

        definition.link         =   angular.noop;                   // We aren't actually doing anything during the link, but we need to provide the member
          
        
        return definition;                                          // Return the definition
        

}]);