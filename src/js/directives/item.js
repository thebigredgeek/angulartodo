/**
 * This directive renders an item for the todo list.
 * More specifically, it renders the CORRECT item for various todo types,
 * such as Text, Link, and Youtube.
 * @name   angulartodo#item
 * @return {Object}   Directive definition
 */
angular.module('angulartodo').directive('item',[

    function(){

        var definition          =   {};                         // Definition prototype

        definition.restrict     =   "E";                        // This restricts the directive to an element form
        definition.controller   =   "itemController";           // Use the itemController as the controller
        definition.templateUrl  =   "directives/item.html";     // Use the item.html partial for the template
        definition.require      =   [                           // Directives used within template
            'linkItem',
            'textItem',
            'youtubeItem'
        ];

        definition.link         =   angular.noop;               // We aren't actually doing anything during the link, but we need to provide the member
          
        
        return definition;                                      // Return the definition
        

}]);