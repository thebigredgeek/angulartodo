/**
 * This is the todoController, which controls the Todo List view
 * @function
 * @name angulartodo#todoController
 * @param  {Object} $scope  An instance of $scope
 */
angular.module("angulartodo").controller('todoController',[
            '$scope',
    function($scope){
        var publicMembers = $scope,
            privateMembers = {};

        /**
         * This function returns a new task prototype
         * @param  {String} text Task text
         * @return {Object}      Task prototype
         */
        privateMembers.taskFactory = function(text){
            return {
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
            publicMembers.$safeApply(function(){                            //Enforce digest

                publicMembers.tasks.push(privateMembers.taskFactory(text)); //Push in a new task
            
                publicMembers.task = "";                                    //Clear the task text
            
                console.log(publicMembers.list);                            //Debug!
            
            });
        };

}]);