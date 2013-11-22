var accountDB = require('./account/account-db.js');
var AccountModel = accountDB.AccountModel;
var mUtils = require('../lib/utilities.js');
var util = require('util');
var _ = require('underscore');
var crypto = require('crypto');
var uuid = require('node-uuid');



function Account() {
 
Account.prototype.hash = function(passwd, salt) {
    return crypto.createHmac('sha256', salt).update(passwd).digest('hex');
};

Account.prototype.login = function(email, password, portal, callback){
    AccountModel.findOne({email: email, password: password, accountType: portal}, function(err,doc){
			callback(doc);
		});
};

//Account.prototype.enroll = function(email, password)
Account.prototype.find = function(identity, callback) {
    AccountModel.findOne({
        identity: new RegExp("^" + identity + "$", 'i')
    }).lean().exec(function(e, a) {
        if (e) {
            callback(e);
        }
        else {
            callback(a);
        }
    });
};

Account.prototype.comparePassword = function(account, password, callback) {
    //console.log('Comparing password for account: ' + JSON.stringify(account));
    var securityData = {
      salt: account.salt,
      password: account.password
    };
    
    var hasher = require("../lib/encryption");
    callback(hasher.isValidPassword(securityData, password, callback));
};


Account.prototype.create = function(properties, callback){
    var genpassword =  mUtils.genPassword();
    var cypher = require("../lib/encryption");
    var salt = cypher.genSalt();
    var hash = cypher.hash(genpassword, salt);
//    var pass = this.setPassword(genpassword);
    console.log(genpassword);
    var options = _.extend(properties, {password: hash, salt: salt});
    var account = AccountModel(options);
	       account.save(function(err, account){
	          if(err) {
	              callback(err);
	          }else{
	              callback(account !== null ? account.toJSON() : null);  
	          }
	    });
};


Account.prototype.setPassword = function(passwordString) {
    this.passwdHash = this.hash(passwordString, this.salt);
};

}
module.exports.Account = Account;
