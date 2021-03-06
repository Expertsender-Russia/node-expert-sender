var _ = require('lodash');
var config = require('../config/config');

function firstCharToUpperCase (str) {
	return str.substr(0, 1).toUpperCase() + str.substr(1);
}

function firstCharToLowerCase (str) {
	return str.substr(0, 1).toLowerCase() + str.substr(1);
}

function transformObject (obj, func) {
	if (_.isEmpty(_.keys(obj))) {
		return obj;
	}

	var transformedObj = _.isArray(obj) ? [] : {};
	_.forOwn(obj, function (value, key) {
		if (key != config.attributeKey) {
			var transformedKey = func(key);
			transformedObj[transformedKey] = transformObject(value, func);
		} else {
			transformedObj[key] = value;
		}
	});
	return transformedObj;
}

function adaptParams (params) {
	return transformObject(params, firstCharToUpperCase);
}

function adaptResult (res) {
	return transformObject(res, firstCharToLowerCase);
}

module.exports = {
	adaptParams: adaptParams,
	adaptResult: adaptResult
}
