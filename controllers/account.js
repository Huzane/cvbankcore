
function route(app) {
    var authentication = require('../lib/authentication/authentication');

    // account login processing
    app.post('/account/login', authentication.authenticate, function (req, res, next) {
        res.send("Hello World");
    });
    
    var authentication = require('../lib/authentication/authentication');
        app.post('/account/login', authentication.authenticate, function(req, res, next) {
        var profile = require("../lib/authentication/accountProfile.js");
        var dataSent = false;
        profile.on('complete', function(data) {
            if (dataSent) {
                return;
            }
            dataSent = true;
            res.json(data);
        });
       profile.bootStrap(req.body.identity, req.body.password);
    });
 
}

module.exports.route = route;
