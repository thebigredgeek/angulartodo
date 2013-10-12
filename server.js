var request     = require('request'),
    express     = require('express'),                                       //expressjs framework
    server      = express(),                                                //server instance
    cors        = require('cors'),                                          //cors middleware
    helmet      = require('helmet'),                                        //helmet middleware
    port        =  (/\d/).test(process.argv[2]) ? process.argv[2] : 8080;   //default to 8008, but use the first parameter if it is a number!


helmet.xframe('allow-from', 'http://youtube.com, http://youtu.be');         //X-Frame-Options
server.use(cors());                                                         //Preflight for cors
server.use(helmet.xframe());                                                //Use helmet
server.use(express.bodyParser());                                           //Body parser
server.use('/',express.static(__dirname+"/dist/"));                         //static route


/**
 * This request handles youtube information requests
 * @param  {Object} req Request pointer
 * @param  {Object} res Response pointer
 */
server.post('/youtubeInfo',function(req,res){
    var options,
        callback;
    
    console.log(req.body.id);
    if(!!req.body && !!req.body.id){ //Dirty check the id

        request("http://gdata.youtube.com/feeds/api/videos/"+req.body.id+"?v=2&alt=json",function(err,response,body){ //get data from youtube
            console.log(JSON.parse(body));
            res.send(body);
        });

    }
    else{
        res.send({error:true});
    }
});

server.listen(port);                                                        //Listen!
