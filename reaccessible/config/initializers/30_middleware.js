(function() {
	'use strict';

	module.exports = function() {
		var bodyParser = require('body-parser');
		var env = this.get('env');
		var express = require('express');
		var methodOverride = require('method-override');
		var path = require('path');
		var publicPath = this.get('publicPath');

		console.log('Intializing middleware...');

		// Use middleware.  Standard [Connect](http://www.senchalabs.org/connect/)
		// middleware is built-in, with additional [third-party](https://github.com/senchalabs/connect/wiki)
		// middleware available as separate modules.

		// Method Override
		// https://github.com/expressjs/method-override
		this.use(methodOverride());

		this.use(function (error, req, res, next) {
			if (!error) {
				return next();
			}
			res.redirect('/error/500');
		});

		// Compress response data with gzip/deflate
		this.use(express.compress());

		// Serve static assets from /public directory
		this.use(express.static(publicPath));

		// Set favicon
		this.use(express.favicon(path.join(publicPath, this.get('env'), 'favicon_1.ico')));

		// Body Parser
		this.use(bodyParser.urlencoded({
			extended: true
		}));

		this.use(bodyParser.json());
	};
})();

/* EOF */
