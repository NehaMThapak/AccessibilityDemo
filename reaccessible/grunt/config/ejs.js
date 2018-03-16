'use strict';

/**
 * Grunt EJS
 *
 * ---------------------------------------------------------------
 *
 * A Grunt task for compiling ejs templates.
 * [ejs](https://github.com/shama/grunt-ejs)
 *
 * For usage docs see:
 * 		https://github.com/shama/grunt-ejs
 */
module.exports = function (grunt) {
	var uuid = require('node-uuid').v4;

	grunt.config('ejs', {
		all: {
			cwd: '<%= globalConfig.path.app %>/views/pages/',
			dest: '<%= globalConfig.path.build %>/html/',
			expand: true,
			ext: '.html',
			options: {
				config: {
					assetPath: '<%= nodemon.develop.options.env.ASSET_PATH %>',
					env: '<%= nodemon.develop.options.env.NODE_ENV %>',
					isIOS: false,
					isIPhone: false,
					rootPath: '<%= nodemon.develop.options.env.ROOT_PATH %>'
				},
				dnsPrefetchDomains: [],
				guid: '',
				isQuotePrimary: false,
				pageId: uuid(),
				pageScriptExists: false,
				pageStyleExists: false,
				extraStyles: false,
				extraJS: false,
				param: function (key) {
					return '';
				},
				path: '/',
				query: '',
				rowType: '',
				segment: '',
				uuid: uuid
			},
			src: '**/*.html.ejs'
		},
		mag: {
			cwd: '<%= globalConfig.path.app %>/views/mag/',
			dest: '<%= globalConfig.path.build %>/html/mag/',
			expand: true,
			ext: '.html',
			options: {
				config: {
					assetPath: '<%= nodemon.develop.options.env.ASSET_PATH %>',
					env: '<%= nodemon.develop.options.env.NODE_ENV %>',
					isIOS: false,
					isIPhone: false,
					rootPath: '<%= nodemon.develop.options.env.ROOT_PATH %>'
				},
				dnsPrefetchDomains: [],
				guid: '',
				isQuotePrimary: false,
				pageId: uuid(),
				pageScriptExists: false,
				pageStyleExists: false,
				extraStyles: false,
				param: function (key) {
					return '';
				},
				path: '/',
				query: '',
				rowType: '',
				segment: '',
				uuid: uuid
			},
			src: '**/*.html.ejs'
		}
  });

	grunt.loadNpmTasks('grunt-ejs');
};

/* EOF */
