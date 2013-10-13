var schooluserDb = require('./schools/school-users.js');
var SchoolUserModel = schooluserDb.SchoolUserModel;
var Account = require("./account.js");
var _ = require("underscore");
var mUtils = require("../lib/utilities.js");
var util = require("util");

function SchoolUser(){
    
    
    SchoolUser.prototype.first = function(accountID, callback){
      var query = SchoolUserModel.findOne(accountID);
      query.lean().exec(function(err, doc){
          if(err){
              callback(err);
          }else{
              callback(doc);
          }
          
      });
    };
}

module.exports.SchoolUser = SchoolUser;