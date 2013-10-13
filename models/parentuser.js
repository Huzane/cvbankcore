var parentuserDb = require('./parents/parent-db.js');
var ParentUserModel = parentuserDb.ParentUserModel;
var Account = require("./account.js");
var _ = require("underscore");
var mUtils = require("../lib/utilities.js");
var util = require("util");

function ParentUser(){
    
    ParentUser.prototype.first = function(accountID, callback){
        var query = ParentUserModel.findOne(accountID);
        query.lean().exec(function(err, doc){
           if(err) {
               callback(err);
           }else{
               callback(doc);
           }
        });
    };
    
}

module.exports.ParentUser = ParentUser;