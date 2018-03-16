'use strict';

module.exports = function() {
	var fs = require('fs');
	var locomotive = require('locomotive');
	var path = require('path');
	var util = require('util');
	var appVersion;
	var basePath;
	var packageData;
	var publicPath;

	basePath = path.join(__dirname, '..', '..');
	packageData = JSON.parse(fs.readFileSync('package.json', 'utf8'));
	publicPath = path.join(basePath, 'public');
	appVersion = packageData.version;

	// Warn of version mismatch between global "lcm" binary and local installation
	// of Locomotive.
	// if (this.version !== locomotive.version) {
	// 	console.warn(util.format('version mismatch between local (%s) and global (%s) Locomotive module', locomotive.version, this.version));
	// }

	// Configure application settings.  Consult the Express API Reference for a
	// list of the available [settings](http://expressjs.com/api.html#app-settings).

	// Store public path for use in other initializers
	this.set('publicPath', publicPath);

	// Set ENV vars
	this.set('assetPath', process.env.ASSET_PATH);
	this.set('rootPath', process.env.ROOT_PATH);
	this.set('version', appVersion);
};

/* EOF */
