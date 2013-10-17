var util = require('util');
var events = require("events");
var _ = require('underscore');


var ACCOUNT_NOT_FOUND = -404, //Account was not found or has been deleted
ACCOUNT_INCORRENT_PASSWORD = -10,//The password is not correct
ACCOUNT_LOCKED = -15,//Account is locked
ACCOUNT_DELETED = -25,//Account is locked
ACCOUNT_PROFILE_NOT_FOUND = -400, //The account was found, password is correct but the profile was not found
ACCOUNT_GENERAL_ERROR = -100, //A general error occured
ACCOUNT_OK = 100; //The account was found, the password is correct and the profile was found


var accountProfile = function(){
	events.EventEmitter.call(this);
	var Account = require('../../models/account.js').Account;
	this.accountHandler = new Account();
	
	this.bootStrap = function(identity, password){
		var self = this;
		self.emit("bootstrap",{identity:identity, password:password});
		return this;
	};

	this.profileMaps = {
		'parent' : function(account, callback){
			var  parent = require('../../models/parentuser.js').ParentUser;
			var c = new parent();
			c.first({accountID : account._id}, callback);
		},
		'school': function(account, callback){
			var school = require('../../models/schooluser.js').SchoolUser;
			var c = new school();
			c.first({accountId: account._id}, callback);
		},
		'student': function(account, callback){
			var student = require('../../models/schooluser.js').SchoolUser;
			var c = new student();
			c.first({accountID: account._id}, callback);
		},
		
		'teacher': function(account, callback){
            var teacher = require('../../models/schooluser.js').SchoolUser;
            var c = new teacher();
            c.first({accountID: account._id}, callback);
		},
		'admin': function(account, callback){
		    callback({
		        displayName : account.identity,
		        _id : account._id,
		        createdOn : account.createdOn 
		    });
		}
	};

	this._checkIdentity = function(properties){
		var self = this;
		var accountHandler = this.accountHandler;
		accountHandler.find(properties.identity, function(data){
		if(data===null)
		{
			self.emit('complete',{status:ACCOUNT_NOT_FOUND, data:'Identity or password do not exist'});		
		}else if(util.isError(data)){
			self.emit('complete',{status: ACCOUNT_GENERAL_ERROR, data:data.message});
		}else if(data.status==='locked' || data.activated !==true){
			self.emit('complete', {status: ACCOUNT_LOCKED, data:'Account has not been activated or it is locked'});
		}else if(data.status==='deleted'){
			self.emit('complete', {status: ACCOUNT_NOT_FOUND, data:'Account not found'});
		}else{
			self.emit('verifyPassword', data, properties.password);
		}
		});
	};

	this._verifyPassword = function(data, password){
		var self = this;
		this.accountHandler.comparePassword(data, password, function(ptv){
			if(ptv === true)
			{
				self.emit('fetchProfile', data);
			}else{
				self.emit('complete',{status: ACCOUNT_INCORRENT_PASSWORD , data:'Incorrect Password'});
			}
		});
		

	};


	this._fetchProfile = function(account){
		var self = this;
		var profileType = account.accountType;
		var profileHandler = this.profileMaps[profileType];
		profileHandler(account, function(profile){
			if(profile){
				self.emit('complete', {status: ACCOUNT_OK, data: profile});
			}else{
				self.emit('complete', {status : ACCOUNT_PROFILE_NOT_FOUND, data : 'Profile not found'});
			}
		});
	};

	this.on('bootstrap', this._checkIdentity);
	this.on('verifyPassword', this._verifyPassword);
	this.on('fetchProfile', this._fetchProfile);
};

util.inherits(accountProfile, events.EventEmitter);

module.exports = new accountProfile();