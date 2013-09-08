global.db =  require("./lib/data/db.js")();
var express = require('express');
var app = express();
var router = require('./controllers/router.js');
var cor = require("./controllers/cor.js");

var router = require('./controllers/router.js');
var cor = require("./controllers/cor.js");

// APPLICATION CONFIGURATION
app.configure(function() {
  
  // trust the proxy to get true IP addresses
    app.enable('trust proxy');
    //Thought of putting this higher up. Don't know why I still get 302 on options requests
    app.use(cor.allowCrossDomain);

//  app.set('view options', { layout: false, debug: true });
//  app.set('views', __dirname + '/views');
    app.use(express.logger());
    app.use(express.compress());
    app.use(express.methodOverride());
//  app.use(express.cookieParser(''));
    app.use(express.bodyParser());
//  app.use(express.session({ secret: '' }));
//    app.use(cor.allowCrossDomain);
    app.use(app.router);
// app.use('/public', express.static(__dirname + '/public'));
  
});

var port = process.env.PORT || 8080;

// APPLICATION CONTROLLER
// route all future requests through our router
router.route(app);

// SAMPLE APPLICATION CONTROLLER
app.get('/', function(req, res) { res.send('Hello from CVBank Core'); });

// START APPLICATION
app.listen(port);

// DISPLAY MESSAGE ABOUT START
console.log('Dragnet Core started. Listening on port ' + port);

// CATASTROPHIC ERROR
app.use(function(err, req, res, next){
  
  console.error(err.stack);
  
  res.json(500, {status : 'error', message : 'Something broke in our cvBank Core! (' + err.message + ')'});
  
});