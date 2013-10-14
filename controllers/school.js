function route(app) {

    app.get('/school/login', function(req, res) {
	     res.send('we are okay');
	}); 
    // authentication
    var authentication = require('../lib/authentication/authentication');
    app.post('/school/login', authentication.authenticate, function(req, res, next) {
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
