var db = global.db;
var Schema = db.Schema;

var schoolSchema = new Schema({
    logo: {type:String,default: ''},
    shortName: {type:String,default: ''},
    longName: {type: String, default: ''},
    address: {type:String,default: ''},
    website: {type:String,default: ''},
    phone : {type:String,default: ''},
	email: {type:String, required: true, unique: true},
	status : {type : String,  default : 'active'},
    createdAt: {type: Date, default: Date.now}
});

schoolSchema.index({shortName : 1});

module.exports.SchoolModel = db.model("School",schoolSchema);
