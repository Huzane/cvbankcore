var db = global.db;
var Schema = db.Schema;

var SALT_WORK_FACTOR = 10;
var bcrypt = require('bcrypt');

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
		default: false
	},
	
	status : String,
	activationKey : String,
	activationDate : Date,
	prefLength : Number, //The length of the salt created. I want to append it to the password
	//I do not want to have a property that says 'salt'
	createdAt: { type: Date, default: Date.now},
    accountType: {type: String}
});

accountSchema.index({identity : 1});

accountSchema.pre('save', function(next) {
  var _status = this;

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err) return next(err);
    bcrypt.hash(_status.identity, salt, function(err, hash) {
      if(err) return next(err);
      _status.activationKey = hash;
      next();
    });
  });
});

module.exports.AccountModel = db.model("Account", accountSchema);