'use strict';

module.exports = function () {
	var express = require('express');

	this.use(express.logger())
		.use(express.errorHandler());
};

/* EOF */
