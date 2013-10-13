var accountDB = require('./account/account-db.js');
var AccountModel = accountDB.AccountModel;
var mUtils = require('../lib/utilities.js');
var util = require('util');
var _ = require('underscore');

function Account() {
 

Account.prototype.login = function(email, password, portal, callback){
    AccountModel.findOne({email: email, password: password, accountType: portal}, function(err,doc){
			callback(doc);
		});
};

//Account.prototype.enroll = function(email, password)

Account.prototype.create = function(properties, callback){
    var genpassword =  mUtils.genPassword();
    var options = _.extend(properties, {password: genpassword});
    var account = AccountModel(options);
	       account.save(function(err, account){
	          if(err) {
	              callback(err);
	          }else{
	              callback(account !== null ? account.toJSON() : null);  
	          }
	    });
};

}
module.exports.Account = Account;
