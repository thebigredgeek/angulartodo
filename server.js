var request     = require('request'),                                       //Request
    jsdom       = require('jsdom'),                                         //JSDom
    openGraph   = require('ogp'),                                           //Open Graph Protocol parser
    express     = require('express'),                                       //Expressjs framework
    server      = express(),                                                //Server instance
    cors        = require('cors'),                                          //CORS middleware
    helmet      = require('helmet'),                                        //Helmet middleware
    port        =  (/\d/).test(process.argv[2]) ? process.argv[2] : 8080;   //default to 8008, but use the first parameter if it is a number!


helmet.xframe('allow-from', 'http://youtube.com, http://youtu.be');         //X-Frame-Options


server.use(cors());                                                         //Preflight for cors
server.use(helmet.xframe());                                                //Use helmet
server.use(express.bodyParser());                                           //Body parser


server.use('/',express.static(__dirname+"/dist/"));                         //Static route


/**
 * This request handles youtube information requests
 * @param  {Object} req Request pointer
 * @param  {Object} res Response pointer
 */
server.post('/youtubeInfo',function(req,res){
    var options,
        callback;

    if(!!req.body && !!req.body.id){ //Dirty check the id

        request("http://gdata.youtube.com/feeds/api/videos/"+req.body.id+"?v=2&alt=json",function(err,response,body){ //get data from youtube
            res.send(body);
        });

    }
    else{
        res.send({error:true});
    }
});

/**
 * This request handles link information requests
 * @param  {Object} req Request pointer
 * @param  {Object} res Response pointer
 */
server.post('/linkInfo',function(req,res){

    var openGraphData = [],
        url;

    if(!!req.body && !!req.body.url){ //dirty check the URL
        //http://
        if(req.body.url.substr(0,7) != 'http://' && req.body.url.substr(0,8) != 'https://'){ //make sure the URL has a valid protocol
            url = 'http://'+req.body.url
        }
        else{ //use the default if the protocol is valid
            url = req.body.url;
        }

        jsdom.env(url,{
            done:function(error,window){
                jsdom.jQueryify(window,'http://code.jquery.com/jquery-2.0.3.min.js',function(){
                    window.$('meta[property^=og]').each(function(index,item){
                        openGraphData.push([item.getAttribute('property'),item.getAttribute('content')]);
                    });

                    if(openGraphData.length<1){ //fail to regular meta data
                        openGraphData.push(['title',window.$('title').text()]); //push the title
                    }

                    res.send(openGraphData);
                });
            }
        });
    }
    else{
        res.send({error:true});
    }
});




server.listen(port); //Listen!
