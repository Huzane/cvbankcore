var db = global.db;
var Schema = db.Schema;


var accountSchema = new Schema({
	identity: {
	type: String,
	required: true,
	unique: true
		},
	password: {
	type: String,
	required: true
		},
	activated: {
	type: Boolean,
		default: true
	},
	
	status : String,
	
	prefLength : Number, //The length of the salt created. I want to append it to the password
	//I do not want to have a property that says 'salt'
	
accountType: {type: String}
});

accountSchema.index({identity : 1});

