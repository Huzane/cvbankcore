var staffDb = require('./staffs/staff-db.js');
var StaffModel = staffDb.StaffModel;
var _ = require("underscore");

function Staff(){
    
    
    Staff.prototype.first = function(accountID, callback){
      var query = StaffModel.findOne(accountID);
      query.lean().exec(function(err, doc){
          if(err){
              callback(err);
          }else{
              callback(doc);
          }
          
      });
    };
    
    Staff.prototype.create = function(options, callback){
        var staffData = StaffModel(options);
        staffData.save(function(err, data){
            if(err) {
                callback(err);
            }else{
                callback(data !== null ? data.toJSON() : null);
            }
        });
    };
}

module.exports.Staff = Staff;