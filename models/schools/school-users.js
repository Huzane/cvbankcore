var db = global.db;
var Schema = db.Schema;
var SchoolModel = require('./school-db.js').SchoolModel;

/**
 * This is a register for users / staff that belong to a school
 */

var SchoolUserSchema = new Schema({
    accountId : {type: Schema.ObjectId}, 
    phone:{type:String}, 
    address:{type:String}, 
    firstName: String, 
    lastName:String,
	picture : String,
	gender : String,
    schoolId : {type:Schema.Types.ObjectId, ref : SchoolModel.modelName},
    userType : {type: String, default: 'schooluser'}, 
    regOn: {type: Date, default: Date.now},
    });

SchoolUserSchema.index({accountId : 1, schoolId : 1}); 

var Model = db.model("SchoolUser",SchoolUserSchema);
module.exports.SchoolUserModel = Model;
