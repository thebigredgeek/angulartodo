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