'use strict';

module.exports = function () {
	var	_ = require('lodash');
	var	assetPath = this.get('assetPath');
	var	dnsPrefetchDomains = [];
	var	env = this.get('env');
	var uuid = require('node-uuid').v4;
	var	appConfig;

	console.log('Intializing locals...');

	if (/^\/\//.test(assetPath)) {
		dnsPrefetchDomains.push('//' + assetPath.replace(/^\/\//, '').split('\/')[0]);
	}

	appConfig = {
		assetPath: assetPath,
		env: env,
		rootPath: this.get('rootPath'),
		version: this.get('version')
	};

	// Extend locals so that views have access to config variables, etc...
	this.use(function (req, res, next) {
		var config = _.extend({
			isIOS: /(iphone|ipad|ipod)/gi.test(req.headers['user-agent']),
			isIPhone: /iphone|ipod/gi.test(req.headers['user-agent'])
		}, appConfig);

		var locals = {
			// Add data that will be rendered out to the JavaScript and used by the JavaScript app
			config: config,
			dnsPrefetchDomains: dnsPrefetchDomains,
			guid: '',
			isQuotePrimary: false,
			param: function (key) {
				return req.param(key);
			},
			path: req.path,
			query: req.param('q'),
			rowType: '',
			uuid: uuid
		};

		// Add data that is used by EJS to render the HTML
		res.locals = _.extend(locals, res.locals);

		next();
	});

	// Router
	this.use(this.router);
};

/* EOF */
