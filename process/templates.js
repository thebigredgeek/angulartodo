angular.module('angulartodo').run(['$templateCache', function($templateCache) {

  $templateCache.put('index.html',
    "<!doctype html><html lang=\"en\" ng-app=\"angulartodo\"><head><meta charset=\"utf-8\"><title>TodoMVC</title><script src=\"vendor.js\"></script><script src=\"app.js\"></script><link rel=\"stylesheet\" href=\"app.css\"></head><body><nav class=\"navbar navbar-inverse navbar-static-top\"><a href=\"\" class=\"navbar-brand\">Angular TodoMVC</a></nav><div class=\"root-content-margin-box\" ng-controller=\"todoController\"><div class=\"root-content-border-box\"><div class=\"root-content-padding-box\"><div class=\"root-content-content-box\"><form role=\"form\" ng-submit=\"addTask(task);\"><div class=\"form-group\"><input type=\"text\" class=\"form-control\" placeholder=\"Enter a task\" ng-model=\"task\"></div></form><div class=\"container-fluid\"><div class=\"row well\" ng-repeat=\"task in tasks\"><div class=\"col-md-1\"><button class=\"btn btn-primary\" ng-click=\"task.status = 'done'\">Done!</button></div><div class=\"col-md-10\" ng-class=\"{done: (task.status == 'done')}\"><ng-include ng-if=\"task.type == 'youtube'\" src=\"'partials/youtube.html'\"></ng-include><ng-include ng-if=\"task.type == 'link'\" src=\"'partials/link.html'\"></ng-include><ng-include ng-if=\"task.type == 'text'\" src=\"'partials/text.html'\"></ng-include></div><div class=\"col-md-1\"><button class=\"btn btn-warning\" ng-click=\"deleteTask(task.id)\">Delete</button></div></div></div></div></div></div></div></body></html>"
  );


  $templateCache.put('partials/link.html',
    "<img ng-show=\"!task.text && !task.link\" src=\"images/loader.gif\" alt=\"Loading...\"><div><strong ng-show=\"task.title\">{{task.title}}</strong></div><a href=\"{{task.link}}\" ng-show=\"task.link\">{{task.link}}</a><img ng-show=\"task.text\" ng-src=\"{{task.text}}\" alt=\"Image could not be loaded\">"
  );


  $templateCache.put('partials/text.html',
    "{{task.text}}"
  );


  $templateCache.put('partials/youtube.html',
    "<div><strong>{{task.title || \"\"}}</strong></div><iframe class=\"youtube-player\" type=\"text/html\" width=\"640\" height=\"385\" ng-src=\"{{trustedSource('//www.youtube.com/embed/'+task.text)}}\" allowfullscreen=\"\" frameborder=\"0\"></iframe>"
  );

}]);
