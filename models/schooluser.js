var schooluserDb = require('./schools/school-users.js');
var SchoolUserModel = schooluserDb.SchoolUserModel;
//var Account = require("./account.js");
var _ = require("underscore");
//var mUtils = require("../lib/utilities.js");
//var util = require("util");

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
    
    SchoolUser.prototype.create = function(options, callback){
        var userData = SchoolUserModel(options);
        userData.save(function(err, data){
            if(err) {
                callback(err);
            }else{
                callback(data !== null ? data.toJSON() : null);
            }
        });
    };
}

module.exports.SchoolUser = SchoolUser;