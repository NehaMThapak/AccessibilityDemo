'use strict';

var fs = require('fs');
var locomotive = require('locomotive');
var path = require('path');
var controller;
var controllerMethods;

controller = new locomotive.Controller();


// Controller Methods
// -------------------------

// NOTE: camelCase methods map to underscore
// view: 'camel_case.html.ejs'
controllerMethods = [
	'index',
	'article',
	'recipe',
	'category',
	'tags',
	'search'
];

controllerMethods.forEach(function (methodName) {
	controller[methodName] = function () {
		var locals = this.res.locals;
		var pathPart = this.req.path.replace(/^\//, '').split('/')[0];

		locals.pageId = methodName;
		locals.extraStyles = undefined;
		locals.extraJS = undefined;

		locals.pageStyleExists = _pageStyleExists(locals)
		locals.pageScriptExists = _pageScriptExists(locals);

		this.render();
	};
});

// controller.after('*', _after);
// function _after (error, req, res, next) {
// 	if (error) {
// 		this.invoke('pages', 'error/500');
// 	}

// 	return next();
// }


// Export
// -------------------------

module.exports = controller;


// Function Definitions
// -------------------------

function _pageScriptExists (locals) {
	var filePath = path.join(__dirname, '..', '..', 'public', locals.config.env, 'js', 'mag', locals.pageId + '.js');

	try {
		return fs.lstatSync(filePath).isFile();
	}
	catch (ex) {
		return false;
	}
}

function _pageStyleExists (locals) {
	var filePath = path.join(__dirname, '..', '..', 'public', locals.config.env, 'css', 'mag', locals.pageId + '.css');

	try {
		return fs.lstatSync(filePath).isFile();
	}
	catch (ex) {
		return false;
	}
}

/* EOF */
