/**
 * The angulartodo module
 * @class
 * @module angulartodo
 * @name angulartodo
 */
angular.module("angulartodo",[
    'ui.bootstrap',  //ui bootstrap module
    'ngSanitize'     //sanitation module
]).run([
    

    /**
     * The $rootScope prototype
     * @public
     * @name angulartodo#$rootScope
     */
            '$rootScope',
    function($rootScope){
        /**
         * This function allows us to safely attempt to execute $scope.$apply
         * @public
         * @function
         * @name angulartodo#$rootScope#$safeApply
         * @param  {Function} fn Function to $apply
         */
        $rootScope.$safeApply = function(fn){
            var phase = this.$root.$$phase;                 //Get the phase
            if(phase == '$apply' || phase == '$digest'){    //Check if we are in $digest or $apply phase
                if(fn && (typeof(fn) === 'function')){      //Make sure this is actually a function
                    fn();                                   //Execute the function without an apply, because we are already in $digest or $apply state 
                }
            }
            else{                                           //If we aren't already in $digest or $apply state
                this.$apply(fn);                            //Begin an $apply state and pass the function context
            }
        };
}]);