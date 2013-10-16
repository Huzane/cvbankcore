var crypto = require('crypto');
var uuid = require('node-uuid');


function hashFunc(passwd, salt){
    return crypto.createHmac('sha256', salt).update(passwd).digest('hex');
}

module.exports.genSalt = function() {
     return uuid.v1();
};

module.exports.hash = function(passwd, salt){
    return crypto.createHmac('sha256', salt).update(passwd).digest('hex');
};

module.exports.isValidPassword = function(securityData, plaintext){
  return securityData.password === hashFunc(plaintext, securityData.salt);
};

//module.exports = Security;