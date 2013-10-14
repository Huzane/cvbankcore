function route(app) {

    app.get('/school/login', function(req, res) {
	     res.send('we are okay');
	}); 
    // authentication
    var authentication = require('../lib/authentication/authentication');
    //app.post('/school/login', authentication.authenticate, function(req, res, next) {
    app.post('/school/login', function(req, res, next) {
        //res.send("yeso");
        var auth = require("../lib/authentication/accountProfile.js");
//        var dataSent = false;
//        auth.once('complete', function(data) {
//            if (dataSent) {
//                return;
//            }
//            dataSent = true;
//            res.json(data);
//        });
        auth.bootStrap(req.body.identity, req.body.password);
      //  res.send("yeso");
    });

}

module.exports.route = route;
