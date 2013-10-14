function route(app) {

    app.get('/school/login', function(req, res) {
	     res.send('we are okay');
	}); 
    // authentication
    var authentication = require('../lib/authentication/authentication');
    //app.post('/school/login', authentication.authenticate, function(req, res, next) {
    app.post('/school/login',function(req, res, next) {
        //res.send("yeso");
        var profile = require("../lib/authentication/accountProfile.js");
      //  var dataSent = false;
        profile.on('complete', function(data) {
          //  if (dataSent) {
            //    return;
        //    }
         //   dataSent = true;
         //console.log(data);
         //console.log("dd");
            res.json(data);
        });
       profile.bootStrap(req.body.identity, req.body.password);
      //  res.send("yeso");
    });

}

module.exports.route = route;
