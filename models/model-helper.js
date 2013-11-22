/**
* @module models
* */
var events = require('events');
var util = require('util');
var _ = require('underscore');

/**
* Performs assistive functions like deleting relations.
* @class ModelHelper
* */

function ModelHelper() {
	
}

/**
 * Event emitter based deleted handler to handle several delete steps
 * @class DeleteHandler
 * */
var DeleteHandler = function() {

	events.EventEmitter.call(this);
	
	this.count = 0;
	this.index = 0;
	
	this.process = function(keys, associations) {
		//console.log('Processing ...');
		this.count = 0;
		this.keys = keys;
		this.index = 0;
		this.associations = associations;
		this.emit('next', associations[this.index]);
	};
	
	this.callNext = function() {
		this.index++;
		if (this.index < this.associations.length) {
			this.emit('next', this.associations[this.index]);
		}else {
			this.emit('complete', this.count);
		}
	};
	
	
	
	this._handleNext = function(association) {
		//console.log('Handling next association: ' + association.name);
		var ids = this.keys;
		var options = {};
		var self = this;
		if (ids instanceof Array) {
			options[association.key] = {$in : ids};
		}else {
			options[association.key] = ids;
		}
		
		if (association.execute) {
			association.execute(options, function(c) {
				self.count += c;
				self.callNext();
			});
		}else if (association.model) {
			association.model.remove(options, function(e, c) {
				self.count += c;
				self.callNext();
			});
		}else {
			self.callNext();
		}
	};
	
	_.bindAll(this, '_handleNext');
	
	this.on('next', this._handleNext);
	
};

util.inherits(DeleteHandler, events.EventEmitter);



/**
* Deletes associated models
* @method deleteImpl
* @param ids {Array, ObjectId} An array or single id of the parent document
* @param associations {Array} an array or the form []
* @param callback {Function}
* Each element of the array can be an object of the form  {model : Mongoose#Model, key : foreignKey}
* Or {execute : function, key : foreignKey}
* If execute function is present then it is called with appropriate options and a callback
* */

module.exports.deleteAssociations = function(ids, associations, callback) {
	//console.log('Delete relationships called with IDs ' + JSON.stringify(ids));
	var handler = new DeleteHandler();
	handler.on('complete', callback);
	handler.process(ids, associations);
};

module.exports.deleteModelAndAssociations = function(options, Model, primaryKey, associations, callback) {
	console.log('Deleting %s model and associations...', Model.modelName);
	console.log('Options %s', JSON.stringify(options));
	if (_.isObject(options)) {
		if (associations === undefined || associations.length === 0) {
			Model.remove(options, function(e, c) {
				callback(c);
			});
			return;
		}
		Model.find(options, primaryKey, function(er, docs) {
			if (docs.length === 0) {
				callback(0);
			}else {
				var ids = _.pluck(docs,primaryKey);
				Model.remove({_id : {$in : ids}}, function(err, c1) {
					var handler = new DeleteHandler();
					handler.on('complete', function(c2) {
						callback(c1 + c2);
					});
					handler.process(ids, associations);
				});
					
			}
		});
	}else {
		var op = {};
		op[primaryKey] = options;
		Model.remove(op, function(e, c1) {
			var handler = new DeleteHandler();
			handler.on('complete', function(c2) {
				callback(c1 + c2);
			});
			handler.process(options, associations);
		});
	}
};

/**
 * Insert query properties when a 'search' parameter is included in options object.
 * E.g if options.q is defined then search properties can be $or : {[firstName : new RegExp(options.q, 'i')], ...} and the original 'q' deleted
 * @method insertSearchParameters
 * @param options {Object}
 * @param fields {String, Array} the names of the properties to use
 * @param queryName {String}[optional] the name of the search property to look for in options. Default is 'q'
 * */
module.exports.insertSearchParameters = function(options, fields, queryName) {
	if ('undefined' === typeof queryName) {
		queryName = 'q';
	}
	if (options[queryName] !== undefined) {
		if (!(fields instanceof Array)) {
			fields = fields.split(/\s+/g);
		}
		var reg = new RegExp(options[queryName], 'i');
		options.$or = _.reduce(fields, function(p, f) {
			var sp = {};
			sp[f] = reg;
			p.push(sp);
			return p;
		}, []);
		
		delete options[queryName];
	}
	return options;
};



/**
 * Look for skip, limit and sort in options and call appropriate methods of query object
 * */
var applyPaging = function(query, options) {
	if (options.sort) {
		query.sort(options.sort);
	}
	
	if (options.skip) {
		if (_.isNumber(options.skip)) {
			query.skip(options.skip);
		}else {
			query.skip(parseInt(options.skip, 10));
		}
	}
	if (options.limit) {
		if (_.isNumber(options.limit)) {
			query.limit(options.limit);
		}else {
			query.limit(parseInt(options.limit, 10));
		}
	}
	return query;
};

module.exports.applyPaging = applyPaging;

/**
 * Gets a Query object obtained from a Model meanwhile ensuring the methods are called properly
 * */
module.exports.createQuery = function() {
	var Model, fields, options;
	if (arguments.length === 3) {
		Model = arguments[0];
		fields = arguments[1];
		options = arguments[2];
	}else if (arguments.length === 2) {
		Model = arguments[0];
		options = arguments[1];
	}
	var realOptions = _.omit(options, 'skip', 'limit', 'sort');
	
	if (options.select) {
		fields = options.select;
		delete options.select;
	}
	
	var query = Model.find(realOptions);
	
	query = applyPaging(query, options);
	
	if (fields) {
		if (fields instanceof Array) {
			fields = fields.join(' ');
		}
		query.select(fields);
	}
	return query;
};

