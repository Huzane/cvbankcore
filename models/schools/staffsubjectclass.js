var db = global.db;
var Schema = db.Schema;

var staffsubjectclassSchema = new Schema({
    staffID: {type: Schema.Types.ObjectId},
    subjectID: {type: Schema.Types.ObjectId},
    classID: {type: Schema.Types.ObjectId},
    schoolID: {type: Schema.Types.ObjectId},
    createdAt: {type: Date, default: Date.now}
});

module.exports.StaffSubjectClassModel = db.model("StaffSubjectClass", staffsubjectclassSchema);
