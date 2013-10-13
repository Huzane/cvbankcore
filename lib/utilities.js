/**
* @module lib
* */

/**
* @class utilities
* */

var util = require('util');

/**
* Checks where required properties are set
* @method requireProperties
* @param names {Array} the array of properties to check for
* @param errorMessageFormat {String} [optional] a string to format the error message with
* */
module.exports.requireProperties = function(object, names, errorMessageFormat) {
	if (errorMessageFormat === undefined) {
		errorMessageFormat = '%s is undefined';
	}
	var errors = '';
	var hasError = false;
	for (var j = names.length - 1; j >= 0; j--) {
		var n = names[j];

		if (object[n] === undefined) {
			if (hasError) {
				errors += ', ';
			}
			hasError = true;
			errors += (util.format(errorMessageFormat, n));
		}
	}
	if (hasError) {
		throw new Error(errors);
	}
};
/**
* */
function clonePropertyImpl(obj, newName, existingProperty, deleteExisting) {
	//If newName property already exists don't touch it
	var _ = require("underscore");
	//obj = _.extend({}, obj);

	if (obj[newName]) {
		if (deleteExisting === true) {
			delete obj[existingProperty];
		}
		return obj;
	}
	//If the existing property is undefined then do nothing
	if (obj[existingProperty] === undefined) {

		return obj;
	}

	obj[newName] = obj[existingProperty];

	if (deleteExisting === true) {
		delete obj[existingProperty];
	}
	return obj;
}

/**
* Looks thru the named properties of an object and convert them to ObjectId
* @method convertToObjectId
* @param obj {Object} the object having properties to convert
* @param parameter {String, List} properties to convert
* @return the object whose properties have been converted
* 
* E.g convertToObjectId(req.body/req.query, 'campaignID', 'companyID')
* */
module.exports.convertToObjectId = function() {
	var mongoose = require("mongoose");
	var obj = arguments[0];
	for (var j = 1; j < arguments.length; j++) {
		var a = arguments[j];
		if (obj[a]) {
			obj[a] = mongoose.Types.ObjectId(obj[a]);
		}
	}
	return obj;
};

/**
* Creates an array from the property of an object/objects
*
* @deprecated This method is supposed to take care of what underscore _.pluck already does (and perharps more optimized)
* @method getPropertyArray
* @param source {Object/Array} the object having properties to get
* @param property {String, Function} name of the property or a function to get the property
* @return an array in which the elements are made up of [object.property]
* 
* E.g convertToObjectId(req.body, 'campaignID', 'companyID')
* */
module.exports.getPropertyArray = function(source, property) {
	var _ = require("underscore");
	var fn = function(obj) {
		if (property instanceof Function) {
			return property(obj);
		}
		return obj[property];
	};

	var ret = [];
	if (source instanceof Array) {
		_.each(source, function(s) {
			var v = fn(s);
			if (v) {
				ret.push(v);
			}
		});
	}
	else {
		var v = fn(source);
		if (v) {
			ret.push(v);
		}
	}
	return ret;
};

/**
* For the cases where a property of a given name is already used on views but it otherwise exists as a different property
* This method will add the property desired to the object and uses the existing property as its value
* 
* Instance
* A lot has already been written as Model#campaignID but campaignID can be populated and on views what is being used is object#campaign
* This function can be used to add a 'campaign' property using 'campaignID'.
* 
* @method cloneProperty
* @param obj {Object, Array} the object or array of objects whose property should be cloned
* @param newName {String} the new property that should be a close on existing property
* @param existingProperty {String} the existing property that should be cloned
* @param deleteExisting {Boolean} [optional] if true then the existing property is deleted (as if the old property is renamed)
* @return {Object, Array} object / objects having 'newName' property whose value is same as 'existingProperty'
* */
module.exports.cloneProperty = function(obj, newName, existingProperty, deleteExisting) {
	var _ = require("underscore");

	if (util.isArray(obj)) {
		//var results = [];
		_.each(obj, function(o) {
			clonePropertyImpl(o, newName, existingProperty, deleteExisting);
			//results.push(clonePropertyImpl(o, newName, existingProperty, deleteExisting));
		});
		//obj = results;
	}
	else {
		obj = clonePropertyImpl(obj, newName, existingProperty, deleteExisting);
	}
	return obj;
};

/**
* @deprecated
* Looks for standard query function names in the options and automatically call them with the value of the property
* @method callQueryFunctions
* @param query {Query} mongoose query object
* @param options {Object} the object having the properties to apply
* @param propertyNames {Array} an array of properties to restrict to
* @param santizeCallback {Function} a callback function that allows the property value be sanitized before being used by the query object
* */
module.exports.callQueryFunctions = function(query, options, propertyNames, santizeCallback) {
	//var _ = require("underscore");
	// for (var p in options) {
	// if (propertyNames && _.indexOf(propertyNames, p) !== -1) {
	// continue;
	// }
	// if (query[p] && query[p] instanceof Function) {
	// var v = options[p];
	// if (santizeCallback) {
	// v = santizeCallback(p, v);
	// }
	// query[p](v);
	// }
	// }
	
	throw new Error('This method is deprecated');
	
	// console.log(query);
	
	// if (options.limit) {
	// query.limit(limit);
	// }
	// if (options.skip) {
	// query.skip(skip);
	// }
	// if (options.sort) {
	// query.sort(sort);
	// }
	// return query;
};

module.exports.genPassword = function() {
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = '';
	var charCount = 0;
	var numCount = 0;
	var rnum;

	for (var i = 0; i < string_length; i++) {
		// If random bit is 0, there are less than 3 digits already saved, and there are not already 5 characters saved, generate a numeric value. 
		if ((Math.floor(Math.random() * 2) === 0) && numCount < 3 || charCount >= 5) {
			rnum = Math.floor(Math.random() * 10);
			randomstring += rnum;
			numCount += 1;
		}
		else {
			// If any of the above criteria fail, go ahead and generate an alpha character from the chars string
			rnum = Math.floor(Math.random() * chars.length);
			randomstring += chars.substring(rnum, rnum + 1);
			charCount += 1;
		}
	}
	return randomstring;
};


var BASE_ALPHA = 'abcdefghijklmnopqrstuvwxyz_';
var BASE_ALPHA_NUM = 'abcdefghijklmnopqrstuvwxyz_0123456789';
var BASE_NUM = '0123456789';
/**
* Generates a random string
* @method randomString
* @param baseType {String} 'alpha', 'num', 'alpha_num'. Default is 'alpha'
* @param length {Number} the length of the string. Default is 6
* */
module.exports.randomString = function() {
	var base = 'alpha', length = 6;
	if (arguments.length === 2) {
		base = arguments[0].toLowerCase();
		length = arguments[1];
	}else if (arguments.length === 1) {
		var a = arguments[0];
		if ('number' === typeof a) {
			length = a;
		}else {
			base = a.toLowerCase();
		}
	}
	
	var baseString = BASE_ALPHA;
	switch (base) {
	case 'alpha':
	case 'alphabet':
	case 'letters':
	case 'letter':
		baseString = BASE_ALPHA;
		break;
	case 'digit':
	case 'digits':
	case 'num':
	case 'number':
		baseString = BASE_NUM;
		break;
	case 'alpha_num':
	case 'alpha_number':
		baseString = BASE_ALPHA_NUM;        
		break;
	}
	
	var str = '';
	var len = baseString.length;
	for (var j = 0; j < length; j++) {
		var idx = Math.floor(Math.random() * len);
		
		if (idx === len) {
			idx = 0;
		}
		str += baseString.substr(idx, 1);
	}
	return str;
};