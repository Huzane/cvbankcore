/**
 * @module Authentication
 */
 
/**
 * @class Authentication
 * */
 
/**
 * Authenticates call 
 * @method authenticate
 * @param {Request} req The express request object.
 * @param {Response} res The express response object.
 * @param {Function} next The express next object. 
**/
function authenticate(req, res, next)
{
    
    // determines whether call is properly autheniticated
    
    // if so, call next
    next();
    
}

module.exports.authenticate = authenticate;