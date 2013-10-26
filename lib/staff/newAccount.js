var util = require('util');
var events = require("events");
var _ = require('underscore');

var newAccount = function(){
    events.EventEmitter.call(this);
	this.bootStrap = function(properties){
		var self = this;
		self.emit("bootstrap",properties);
		return this;
	};
    this._createStaff = function(properties){
        var self = this;
        var Staff = require("../../models/staff.js").Staff;
        var staff = new Staff();
         staff.create(properties, function(data){
             if(data){
                 self.staffID = data._id;
                 var email = data.email;
                 var staffMeta = {
                   identity: email,
                   status: 'locked',
                   accountType: 'teacher'
                 };
                 self.emit('createAccount', staffMeta);
             }else{
                 self.emit('complete', {error : 'Staff profile not created'});
             }
        });
    };
    
    this._createAccount = function(schoolMeta){
      var self = this;
      var AS = require("../../models/account.js").Account;
      var acct = new AS();
      acct.create(schoolMeta, function(data){
          if(data){
              self.emit('complete', data);
          }else{
               self.emit('complete', {error : 'Staff Account not created'});
          }
      });
    };
    
 
    this.on('bootstrap', this._createStaff);
    this.on('createAccount', this._createAccount);
 

};
util.inherits(newAccount, events.EventEmitter);
module.exports = new newAccount();