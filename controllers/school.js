function route(app) {

    app.get('/school/login', function(req, res) {
	    console.log('hi');
	}); 
    // authentication
    var authentication = require('../lib/authentication/authentication');
    app.post('/school/login', authentication.authenticate, function(req, res, next) {
        var auth = require("../lib/authentication/accountProfile.js");
        var dataSent = false;
        auth.once('complete', function(data) {
            if (dataSent) {
                return;
            }
            dataSent = true;
            res.json(data);
        });
        auth.bootStrap(req.body.identity, req.body.password);
    });

}

module.exports.route = route;
