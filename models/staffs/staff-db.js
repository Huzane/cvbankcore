var db = global.db;
var Schema = db.Schema;

var staffSchema = new Schema({
    firstName: {type:String,default: ''},
    lastName: {type:String,default: ''},
    middleName: {type: String, default: ''},
    address: {type:String,default: ''},
    phone : {type:String,default: ''},
	email: {type:String, required: true, unique: true},
	schoolID: {type: Schema.Types.ObjectId},
	status : {type : String,  default : 'active'},
    userType : {type: String, default: 'schooluser'}, 
    createdAt: {type: Date, default: Date.now}
});

staffSchema.index({firstName : 1});

module.exports.StaffModel = db.model("Staff",staffSchema);
