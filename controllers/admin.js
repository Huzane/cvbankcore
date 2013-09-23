/**
@module Router
**/

/**
 * represents all functions on the admin dashboard and routes - more than just this, but conceptually a start
 * @class Admin
 * */
 


/**
Takes expressjs app and uses it to determine which controller to call to handle

@method route
@param {App} app The express application object.
**/
function route(app) {

    // authentication
    var authentication = require('../lib/authentication/authentication');
 
    // get financial data
    app.get('/admin/test', authentication.authenticate, function (req, res, next) {
        return "Hello World";
    });
 
    // get financial data - top delinquents
    app.get('/admin/financials/delinquents', authentication.authenticate, function (req, res, next) {});

    // get financial data - best historical purchasers
    app.get('/admin/financials/top-firms', authentication.authenticate, function (req, res, next) {});

    // get financial data - credit swings (firms who use up credit then don't then resume - yo yo patterns)
    app.get('/admin/financials/credit-swings', authentication.authenticate, function (req, res, next) {});

    // get financial data - who has not been using credit - hoarders
    app.get('/admin/financials/hoarders', authentication.authenticate, function (req, res, next) {});

}

module.exports.route = route;
