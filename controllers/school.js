function route(app) {

    app.get('/school/login', function(req, res) {
	     res.send('we are okay');
	}); 
    // authentication

}

module.exports.route = route;
