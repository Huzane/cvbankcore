var db = global.db;
var Schema = db.Schema;

var subjectSchema = new Schema({
    description: {type:String,default: ''},
    schoolID: {type: Schema.Types.ObjectId},
    createdAt: {type: Date, default: Date.now}
});

module.exports.SubjectModel = db.model("Subject",subjectSchema);
