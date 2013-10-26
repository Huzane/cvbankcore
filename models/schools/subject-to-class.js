var db = global.db;
var Schema = db.Schema;

var subjecttoclassSchema = new Schema({
    description: {type:String,default: ''}, //supposed to be an embedded document type
    subclass: {type:String,default: ''},    
    schoolID: {type: Schema.Types.ObjectId},
    createdAt: {type: Date, default: Date.now}
});

module.exports.SubjectToClassModel = db.model("SubjectToClass", subjecttoclassSchema);
