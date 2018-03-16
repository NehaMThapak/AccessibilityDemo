'use strict';

module.exports = function () {
	var express = require('express');

	this.use(express.logger())
		.use(express.errorHandler({
			dumpExceptions: true,
			showStack: true
		}));

	// Application level variables (global)
	// this.set('view options', {
	// 	debug: true
	// });
};

/* EOF */
