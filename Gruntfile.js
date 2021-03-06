module.exports = function(grunt){
    var pkg = require('./package.json'), //package file
        i, //iterative member
        jslink = require(__dirname+'/linker/js.json').link,
        csslink = require(__dirname+"/linker/css.json").link;

    csslink.push("src/css/**/*.css");

    grunt.initConfig({
        "pkg": grunt.file.readJSON('package.json'),
        "bump":{
            "options":{
                "files":[
                    "package.json",
                    "bower.json"
                ],
                "updateConfigs": ["pkg"],
                "commit": true,
                "commitMessage": "Release v%VERSION%",
                "commitFiles": ["-a"],
                "createTag": true,
                "tagName": "v%VERSION%",
                "tagMessage": "Version %VERSION%",
                "push": true,
                "pushTo": "origin"
            }
        },
        "karma":{
            "unit-pre":{
                "configFile": "karma.unit.pre.js",
                "autowatch": false
            },
            "unit-post":{
                "configFile": "karma.unit.post.js",
                "autowatch": false
            }
        },
        "strip":{
            "dist":{
                "src":"process/app.js",
                "options":{
                    "inline":true,
                    "nodes":[
                        "console.log",
                        "console.warn",
                        "debugger"
                    ]
                }
            }
        },
        "cssmin":{
            "options":{
                "banner": "/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today('dd/mm/yyyy') %> */",
                "report":false
            },
            "dist":{
                "files":{
                    "dist/app.css":csslink
                }
            }
        },
        "jshint":{
            "options":{
                "smarttabs":true,
                "unused":false,
                "boss":true,
                "debug":true
            },
            "all":["src/js/**/*.js"]
        },
        "clean":{
            "dist":["dist"],
            "process":["process"]
        },
        "watch":{
            "files":[
                "README.md",
                "src/**/*.*",
                "test/**/*.spec.js"
            ],
            "tasks":["develop"],
            "options":{
                "livereload":true,
                "atBegin":true
            }
        },
        "concat":{
            "options":{
                "stripBanners":true,
                "banner": "/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today('dd/mm/yyyy') %> */",
                "process":true

            },
            "app":{
                "src":[
                    "src/js/angulartodo.js",
                    "src/js/**/!(angulartodo).js"
                ],
                "dest":"process/app.js"
            },
            "vendor":{
                "src": jslink,
                "dest":"dist/vendor.js"
            }
        },
        "ngtemplates":{
            "angulartodo":{
                "cwd": "src/html/",
                "src": ["**/*.html"],
                "dest": "process/templates.js",
                "options":{
                    "htmlmin":{
                        "collapseWhitespace":true
                    }
                }
            }
        },
        "uglify":{
            "options":{
                "mangle":false,
                "report":false,
                "wrap":true,
                "compress":{
                    "dead_code":true,
                    "drop_debugger":true,
                    "sequences":true,
                    "properties":true,
                    "comparisons":true,
                    "evaluate":true,
                    "booleans":true,
                    "loops":true,
                    "unused":true,
                    "if_return":true,
                    "join_vars":true,
                    "cascade":true,
                    "warnings":true
                }
            },
            "app":{
                "options":{
                    "sourceMap":"dist/app.map",
                    "sourceMappingURL":"app.map",
                    "report":false,
                    "banner": "/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %> */"
                },
                "files":{
                    "dist/app.js":[
                        "process/app.js",
                        "process/templates.js"
                    ]
                }
            }
        },
        "copy":{
            "maps":{
                "files":[
                    {
                        "expand":true,
                        "flatten": true,
                        "src":[
                            "src/html/index.html",
                            "vendor/managed/**/*.map"
                        ],
                        "dest":"dist/",
                        "filter":"isFile"
                    }
                ]
            },
            "images":{
                "files":[
                    {
                        "expand":true,
                        "flatten":true,
                        "src":[
                            "src/images/**/*.*"
                        ],
                        "dest":"dist/images/",
                        "filter":"isFile"
                    }
                ]
            }
        }
    });

    for(i in pkg.devDependencies){ //iterate through the development dependencies
        if(pkg.devDependencies.hasOwnProperty(i)){ //avoid iteration over inherited object members
            if(i.substr(0,6) == 'grunt-'){ //only load development dependencies that being with "grunt-""
                grunt.loadNpmTasks(i); //load all grunt tasks
            }
        }
    }
    grunt.registerTask('default',["watch"]);
    grunt.registerTask('develop',["clean:dist","jshint","concat",'ngtemplates',"uglify:app","cssmin","copy:maps","copy:images"]);
};
