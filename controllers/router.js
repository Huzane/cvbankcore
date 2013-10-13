function route(app)
{
    
    // setup the variables for the other routers we are using
    // of course we could have combined them all here, but this is for legibility
    
    //var accountRouter = require('./account');
    var adminRouter = require('./admin');
    var accountRouter = require('./account');
    //var assessmentRouter = require('./assessment');
    //var assessorRouter = require('./assessor');
    //var campaignRouter = require('./campaign');
    //var candidateRouter = require('./candidate');
    //var companyRouter = require('./company');
    var school = require('./school');
    
    // some test routes come first to make sure that we are able to test routing without 
    // getting obscured by errors that might happen down the line
    
    app.get('/AuthenticationTest', function(req, res) { res.send('Authentication Test Passed!'); });
    app.get('/RouteTest', function(req, res) { res.send('We are Routing! :)'); });

    // include routes from all routers
    // note that any changes here would require a restart of the main.js node process

    //accountRouter.route(app);
    adminRouter.route(app);
    accountRouter.route(app);
    school.route(app);
    //assessorRouter.route(app);
    //campaignRouter.route(app);
    //candidateRouter.route(app);
    //companyRouter.route(app);
    //resellerRouter.route(app); // will be a version 2 feature, but want to include the routing setup so that we can redploy without restart possibly in the future
    
}


module.exports.route = route;