var util = require('util');
var events = require("events");
var _ = require('underscore');

var newAccount = function(){
    events.EventEmitter.call(this);
	this.bootStrap = function(properties){
		var self = this;
		this.firstName = properties.firstName;
		this.lastName = properties.lastName;
		self.emit("bootstrap",properties);
		return this;
	};
    this._createSchool = function(properties){
        var self = this;
        var School = require("../../models/school.js").School;
        var school = new School();
        console.log("before dataprp " + JSON.stringify(properties));
        var dataprop = _.omit(properties, ['firstName', 'lastName']);
        console.log("dataprop " + JSON.stringify(dataprop));
        school.create(dataprop, function(data){
             if(data){
                 self.schoolID = data._id;
                 var email = data.email;
                 var schoolMeta = {
                   identity: email,
                   status: 'locked',
                   accountType: 'school'
                 };
                 self.emit('createAccount', schoolMeta);
             }else{
                 self.emit('complete', {error : 'School profile not created'});
             }
        });
    };
    
    this._createAccount = function(schoolMeta){
      var self = this;
      var AS = require("../../models/account.js").Account;
      var acct = new AS();
      acct.create(schoolMeta, function(data){
          if(data){
              self.accountID = data._id;
              var metaProp = {
                  firstName: self.firstName,
                  lastName: self.lastName,
                  accountId: data._id,
                  schoolId: self.schoolID
              };
              self.emit('createUserMeta', metaProp);
          }else{
               self.emit('complete', {error : 'Account not created'});
          }
      });
    };
    
    this._createUserMeta = function(properties){
      var self = this;
      var Su = require("../../models/schooluser.js").SchoolUser;
      var suser = new Su();        
      suser.create(properties, function(data){
         if(data) {
             self.emit('complete', data);
         }else{
             self.emit('complete', {error : 'user account not created'});
         }
      });
    };
    this.on('bootstrap', this._createSchool);
    this.on('createAccount', this._createAccount);
    this.on('createUserMeta', this._createUserMeta);

};
util.inherits(newAccount, events.EventEmitter);
module.exports = new newAccount();