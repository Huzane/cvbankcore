var db = global.db;
var Schema = db.Schema;

var SALT_WORK_FACTOR = 10;
var bcrypt = require('bcrypt');
  
var activationSchema = new Schema({
  email: { type: String, required: true, unique: true},
  hashedEmail: { type: String, required: true, unique: true },
  verifyStatus: Boolean, // Used to check status
  createdAt: { type: Date, default: Date.now, expires: '1.5h' }
});

activationSchema.pre('save', function(next) {
    var _status = this;

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err) return next(err);

    bcrypt.hash(_status.email, salt, function(err, hash) {
      if(err) return next(err);
      _status.hashedEmail = hash;
      next();
    });
  });
});

var ActivationModel = db.model('Activation', activationSchema);
module.exports.ActivationModel = ActivationModel;