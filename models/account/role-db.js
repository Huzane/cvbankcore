var db = global.db;
var Schema = db.Schema;


var roleSchema = new Schema({
	name : {type : String, required : true},
	accountID : {type : Schema.Types.ObjectId, required : true}
});

roleSchema.index({accountID : 1});

var RoleModel = db.model('Role', roleSchema);
module.exports.RoleModel = RoleModel;