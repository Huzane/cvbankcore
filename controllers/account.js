
function route(app) {
    var authentication = require('../lib/authentication/authentication');

    // account login processing
    app.post('/account/login', authentication.authenticate, function (req, res, next) {
        res.send("Hello World");
    });
 
}

module.exports.route = route;
