'use strict';

/**
 * Validate files.
 *
 * ---------------------------------------------------------------
 *
 * Validate files with JSHint
 * [jshint](https://github.com/gruntjs/grunt-contrib-jshint)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-jshint
 */
module.exports = function (grunt) {
	grunt.config('jshint', {
		options: {
			ignores: [],
			jshintrc: true,
			reporter: require('jshint-stylish')
		},
		app: [
			'app/**/*.js',
			'config/**/*.js'
		],
		gruntfile: [
			'Gruntfile.js'
		],
		src: [
			'<%= globalConfig.path.source %>/**/*.js'
		],
		tasks: [
			'<%= globalConfig.path.tasks %>/**/*.js'
		],
		test: [
			'<%= globalConfig.path.test %>/**/*.js'
		]
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
};

/* EOF */
