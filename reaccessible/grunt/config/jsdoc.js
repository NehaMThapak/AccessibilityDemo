'use strict';

/**
 * A grunt plugin to generate javascript doc by running jsdoc3 on your grunt projects.
 *
 * ---------------------------------------------------------------
 *
 * Generate JSDocs
 * [jsdoc](https://github.com/krampstudio/grunt-jsdoc)
 *
 * For usage docs see:
 * 		https://github.com/krampstudio/grunt-jsdoc
 */
module.exports = function (grunt) {
	grunt.config('jsdoc', {
		dist: {
			options: {
				configure : 'jsdoc.conf.json',
				destination: '<%= globalConfig.path.docs %>',
				template: 'node_modules/ink-docstrap/template'
			},
			src: [
				'<%= globalConfig.path.source %>/**/*.js',
				'README.md'
			]
		}
	});

	grunt.loadNpmTasks('grunt-jsdoc');
};

/* EOF */
