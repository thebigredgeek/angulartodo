/*! angulartodo - v0.0.0 - 12/10/2013 */angular.module("angulartodo",[
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
angular.module("angulartodo").controller('todoController',[
            '$scope','urlRegEx','$sce','$http',
    function($scope,  urlRegEx,  $sce,  $http){

        var publicMembers = $scope,
            privateMembers = {};

        /**
         * This function returns a new task prototype
         * @param  {String} text Task text
         * @return {Object}      Task prototype
         */
        privateMembers.taskFactory = function(text){
            var type;

            //http://www.youtube.com/embed/tgd6ENKK0mM

            if(urlRegEx.isYoutube(text)){               //Is the text a youtube link?
                type = "youtube";
            }
            else if(urlRegEx.isLink(text)){             //Is the text a regular link?
                type = "link";
            }
            else{                                       //Default to text
                type = "text";
            }

            return {
                title   : "",
                type    : type,
                text    : text,
                status  : "active"
            };
        };


        /**
         * This contains the text of the task currently being entered
         * @type {String}
         * @name angularToDo#todoController#task
         * @public
         */
        publicMembers.task = "";
        
        /**
         * This contains all of the tasks for our todo list
         * @type {Array}
         * @name angulartodo#todoController#tasks
         * @public
         */
        publicMembers.tasks = [];

        /**
         * This function adds a task to the list, and clears the current task text
         * @function
         * @name angulartodo#todoController#addTask
         * @param {String} text Task text
         * @public
         */
        publicMembers.addTask = function(text){
            publicMembers.$safeApply(function(){                                //Enforce digest

                var task;

                publicMembers.tasks.unshift(privateMembers.taskFactory(text));  //Push in a new task
                task = publicMembers.tasks[0];                                  //capture task reference

                if(task.type == 'youtube'){                                     //Handle youtube title
                    $http.post('/youtubeInfo',{id:'tgd6ENKK0mM'})
                        .then(function(response){
                            if(response.data.entry){
                                task.title = response.data.entry.title.$t;
                                console.log(task.title);
                            }
                        });
                }

                publicMembers.task = "";                                        //Clear the task text
            
            });
        };

        publicMembers.trustedSource = function(source){
            return $sce.trustAsResourceUrl(source);
        };

}]);
angular.module("angulartodo").factory("urlRegEx",[
    function(){
        return {
            isYoutube : function(string){ //Regular expression for youtube links
                return (/^(http|https):\/\/+(www.youtube.com\/watch\?v=|www.youtu.be\/|www.youtube.com\/embed\/)+\w{11}/).test(string);
            },
            isLink    : function(string){ //Regular expression for links
                return (/^(http|https):\/\//).test(string);
            }
        };
}]);