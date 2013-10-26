var db = global.db;
var Schema = db.Schema;

/**
 * This is a register for parents
 */

var StudentUserSchema = new Schema({
    accountId : {type: Schema.ObjectId}, //added by Daser
    phone:{type:String}, //added by Daser
    address:{type:String}, //added by Daser
    identity : {type:String, required : true, unique : true},
    firstName: String, //added by Daser
    lastName:String, //added by Daser
	picture : String,
	gender : String,
    userType : {type: String, default: 'student'}, 
    regOn: {type: Date, default: Date.now},
	status : {type : String, default : ''}
    });

StudentUserSchema.index({identity : 1}); 

var Model = db.model("ParentUser",StudentUserSchema);
module.exports.StudentUserModel = Model;
