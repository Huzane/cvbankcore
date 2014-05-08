var staffDb = require('./staffs/staff-db.js');
var StaffModel = staffDb.StaffModel;
var _ = require("underscore");


function validatePublic(options) {
	if (typeof options.isPublic === 'undefined') {
		options.isPublic = true;
	}
	return options;
}


function findImpl(options, callback) {
    //var realOptions = _.omit(options, 'skip', 'q', 'limit', 'sort');
    
	options.status = {$ne : 'deleted'};
	
	var helper = require('./modelhelper.js');
	
	options = helper.insertSearchParameters(options, 'longName shortName', 'q');
	
	//console.log('Search for company with options: %s', JSON.stringify(options));
	//Ensure that isPublic is explicitly stated
	options = validatePublic(options);
	
	var query = helper.createQuery(StaffModel, options);
	
	//console.log('Looking up companies with query: %s', JSON.stringify(realOptions));
    
    //var query = CompanyModel.find(realOptions, null, _.pick(options, 'skip', 'limit', 'sort')).lean();
    
    query.exec(function(err, docs) {
        if (err) {
            callback(err);
        } else {
            callback(docs);
        }
    });
}
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
        var staffData = new StaffModel(options);
        staffData.save(function(err, data){
            if(err) {
                callback(err);
            }else{
                callback(data !== null ? data.toJSON() : null);
            }
        });
    };
    
    
    /**
 * Gets a staff by its ID
 * @method get
 * @param id {ObjectId}
 * @param callback {Function}
 */
    Staff.prototype.get = function(id, callback) {
        StaffModel.findOne({_id : id}).lean().exec(function(err, staff) {
        if (err) {
            callback(err);
            }
        else {
                callback(staff);
            }
        });
    };


    /**
     * Finds a staff by its ID
     * @method find
     * @param options {Object}
     * @param callback
     */
    Staff.prototype.find = function(options, callback) {
        findImpl(options, callback);
    };

}

module.exports.Staff = Staff;