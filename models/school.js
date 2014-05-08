var _ = require("underscore");

var schoolDb = require('./schools/school-db.js');
var SchoolModel = schoolDb.SchoolModel;
var schooluserDb = require('./schools/school-users.js');

var SchoolUser = require('./schooluser').SchoolUser;

var mUtils = require('../lib/utilities.js');

var util = require('util');

var SchoolUserModel = schooluserDb.SchoolUserModel;

function School(){
    
    School.prototype.create = function(properties, callback){
     try {
		mUtils.requireProperties(properties, ['shortName', 'longName', 'email', 'phone', 'address']);
	}catch (ex) {
		callback(ex);
		return;
	}  
	
SchoolModel.findOne({shortName: new RegExp('^' + properties.shortName + '$', 'i')}, '_id', function(err, d){
	if(d){
	callback(util.format('A school named \'%s\' already exists', properties.shortName));
	} else {
	var school = new SchoolModel(properties);
	school.save(function(err, school){
	if(err) {
	callback(err);
	}else{
	callback(school !== null ? school.toJSON() : null);  
	}
	});
	}
	});
	
	
    };
}


module.exports.School = School;