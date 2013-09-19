var db = global.db;
var Schema = db.Schema;

var CompanyUserSchema = new Schema({
    accountId : {type: Schema.ObjectId}, //added by Daser
    phone:{type:String}, //added by Daser
    address:{type:String}, //added by Daser
    identity : {type:String, required : true, unique : true},
    firstName: String, //added by Daser
    lastName:String, //added by Daser
	picture : String,
	gender : String,
    companyId : {type:Schema.Types.ObjectId},
    userType : {type: String, default: 'assessor'}, 
    regOn: {type: Date, default: Date.now},
    });

CompanyUserSchema.index({identity : 1, companyId : 1}); 

var Model = db.model("CompanyUser",CompanyUserSchema);
//Ife: This should be camel cased!!!!!!!!!
//module.exports.companyusersModel = Model;
module.exports.CompanyUserModel = Model;
