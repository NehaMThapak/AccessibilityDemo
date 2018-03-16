'use strict';

/**
 * Clean files and folders.
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the buid directory.
 * [clean](https://github.com/gruntjs/grunt-contrib-clean)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-clean
 */
module.exports = function (grunt) {
	grunt.config('clean', {
		build: [
			'<%= globalConfig.path.build %>'
		],
		compile: [
			'<%= globalConfig.path.build %>/js/app/**/*',
			'!<%= globalConfig.path.build %>/js/app/main.js',
			'!<%= globalConfig.path.build %>/js/app/mainmag.js'
		],
		develop: [
			'<%= globalConfig.path.develop %>'
		],
		docs: [
			'<%= globalConfig.path.docs %>'
		],
		html: [
			'<%= globalConfig.path.build %>/html'
		],
		local: [
			'<%= globalConfig.path.local %>'
		],
		production: [
			'<%= globalConfig.path.production %>'
		]
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
};

/* EOF */
