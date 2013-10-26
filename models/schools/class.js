var db = global.db;
var Schema = db.Schema;

var classSchema = new Schema({
    description: {type:String,default: ''},
    subclass: {type:String,default: ''},    
    schoolID: {type: Schema.Types.ObjectId},
    createdAt: {type: Date, default: Date.now}
});

module.exports.ClassModel = db.model("Class", classSchema);
