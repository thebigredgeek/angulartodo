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
         * Task index
         * @type {Number}
         */
        privateMembers.index = 0;


        /**
         * This function returns a new task prototype
         * @param  {String} text Task text
         * @return {Object}      Task prototype
         */
        privateMembers.taskFactory = function(text){
            var type;

            //http://www.youtube.com/embed/tgd6ENKK0mM

            if(urlRegEx.isYoutube(text)){               //Is the text a youtube link?
                text = urlRegEx.getVideoId(text);       //Extract the ID
                type = "youtube";                       //Set the type
            }
            else if(urlRegEx.isLink(text)){             //Is the text a regular link?
                type = "link";
            }
            else{                                       //Default to text
                type = "text";
            }

            return {                                    //Return a prototype
                id      : privateMembers.index++,
                title   : "",
                type    : type,
                text    : text,
                link    : null,
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

                var task,temp;                                                  //Scope'd references

                publicMembers.tasks.unshift(privateMembers.taskFactory(text));  //Push in a new task
                task = publicMembers.tasks[0];                                  //capture task reference






                if(task.type == 'youtube'){                                     //Handle youtube title
                    $http.post('/youtubeInfo',{id:task.text})                   //Call for more info
                        .then(function(response){                               //Handle reply
                            if(response.data.entry){                            //Check for valid data
                                task.title = response.data.entry.title.$t;      //Apply data to title
                            }
                        });
                }







                if(task.type == 'link'){                                        //Handle link open graph
                    temp = task.text;
                    task.text = null;                                           //Null out the text to begin with
                    $http.post('/linkInfo',{url:text})                          //Grab Open Graph data about this link (if it exists)
                        .then(function(response){                               //Handle return
                            var title, image, i;
                            if(response.data){                                  //Validate data
                                for(i=0; i<response.data.length;i++){
                                    if(response.data[i][0] == 'og:title'){      //parse the og title
                                        task.title = response.data[i][1];
                                    }
                                    if(response.data[i][0] == 'og:image'){      //parse the og image
                                        task.text = response.data[i][1];
                                    }
                                    if(response.data[i][0] == 'title'){         //parse the meta title
                                        task.title = response.data[i][1];
                                    }
                                    if(response.data[i][0] == 'image'){         //parse the meta image
                                        task.text = response.data[i][1];   
                                    }
                                }
                                if(!task.text){         //if there weren't valid open graph tags, just default to the link!
                                    task.link = temp;
                                }
                            }
                            else{   //Default to the link if there was some sort of error
                                task.link = temp;
                            }
                        });
                }





                publicMembers.task = "";                                        //Clear the task text
            
            });
        };

        /**
         * This function creates a trusted source wrapper for the iframe used by youtube
         * @param  {String} source The source string
         * @return {Object}        An escaped source
         */
        publicMembers.trustedSource = function(source){
            return $sce.trustAsResourceUrl(source);
        };

        /**
         * This function deletes an item from the task list
         * @param  {Integer} id The task ID
         */
        publicMembers.deleteTask = function(id){
            var i;
            for(i=0;i<publicMembers.tasks.length;i++){ //O(n)
                if(publicMembers.tasks[i].id == id){
                    publicMembers.tasks.splice(i,1); //remove the task
                }
            }
        };

}]);
angular.module("angulartodo").factory("urlRegEx",[
    function(){
        return {
            getVideoId: function(string){ //parses out the video ID
                return string.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/)[1]; //return the video id
            },
            isYoutube : function(string){ //Regular expression for youtube links
                return (/^(http|https):\/\/+(www.youtube.com\/watch\?v=|www.youtu.be\/|www.youtube.com\/embed\/)+\w{11}/).test(string);
            },
            isLink    : function(string){ //Regular expression for links
                return (/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/).test(string);
            }
        };
}]);