var util = require("util");

var mongoose = require("mongoose");

function toObjectId(id) {
	return mongoose.Types.ObjectId(id);
}

function route(app) {
    var authentication = require('../lib/authentication/authentication');

    app.get('/school/login', function(req, res) {
	     res.send('we are okay');
	}); 



    app.get('/staff', authentication.authenticate, function (req, res, next) {
        var Staff = require("../../models/staff.js").Staff;
        var c = new Staff();
		c.find(req.query, function(data) {
			if (util.isError(data)) {
				res.json(500, data.message);
			} else {
				res.json(data);
			}
		});
	});


	app.get('/staff/:id', authentication.authenticate, function (req, res, next) {
	    var Staff = require("../models/staff.js").Staff;
		var id = req.params.id;
		id = toObjectId(id);
		var c = new Staff();
		c.get(id,function(data) {
			if (util.isError(data)) {
				res.send(500, data.message);
			} else {
				res.json(data);
			}
		});
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
