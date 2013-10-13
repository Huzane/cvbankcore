var db = global.db;
var Schema = db.Schema;
var SchoolModel = require('./school-db.js').SchoolModel;

/**
 * This is a register for users / staff that belong to a school
 */

var SchoolUserSchema = new Schema({
    accountId : {type: Schema.ObjectId}, //added by Daser
    phone:{type:String}, //added by Daser
    address:{type:String}, //added by Daser
    identity : {type:String, required : true, unique : true},
    firstName: String, //added by Daser
    lastName:String, //added by Daser
	picture : String,
	gender : String,
    schoolId : {type:Schema.Types.ObjectId, ref : SchoolModel.modelName},
    userType : {type: String, default: 'schooluser'}, 
    regOn: {type: Date, default: Date.now},
	status : {type : String, default : ''}
    });

SchoolUserSchema.index({identity : 1, schoolId : 1}); 

var Model = db.model("SchoolUser",SchoolUserSchema);
module.exports.SchoolUserModel = Model;
