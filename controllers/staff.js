function route(app) {
    var authentication = require('../lib/authentication/authentication');

    app.get('/school/login', function(req, res) {
	     res.send('we are okay');
	}); 

      app.post('/staff/create', authentication.authenticate, function(req, res, next) {
        var Staff = require("../lib/staff/newAccount.js");
        var dataSent = false;
        Staff.on('complete', function(data) {
            if (dataSent) {
                return;
            }
            dataSent = true;
            res.json(data);
        });
        var options = {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            middleName : req.body.middleName,
            address : req.body.address,
            phone : req.body.phone,
            email: req.body.email,
            schoolID : req.body.schoolID
        };
       Staff.bootStrap(options);
    });
}

module.exports.route = route;
