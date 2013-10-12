/**
 * This is the todoController, which controls the Todo List view
 * @function
 * @name angulartodo#todoController
 * @param  {Object} $scope      An instance of $scope
 * @param  {Object} urlRegEx    A URL regular expression service to identify our types
 * @param  {Object} $sce        Strict Contextual Escaping service, to allow for setting the source on our iframe
 * @param  {Object} $http       $http service
 */
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