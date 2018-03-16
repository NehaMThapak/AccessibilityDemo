'use strict';

/**
 * Lint html.
 *
 * ---------------------------------------------------------------
 *
 * Lint html
 * An HTML linter.
 * [bootlint](https://github.com/jzaefferer/grunt-html)
 *
 * For usage docs see:
 * 		https://github.com/jzaefferer/grunt-html
 */
module.exports = function (grunt) {
	grunt.config('htmllint', {
		options: {
			//force: true,
			ignore: [
				'/attribute “ng-[a-z-]+” not allowed/',
				'The element “label” must not appear as a descendant of the “label” element.',//this and below result of wffm :(
				'Element “option” without attribute “label” must not be empty.'
			]
		},
		all: '<%= globalConfig.path.build %>/html/**/*.html'
  });

	grunt.loadNpmTasks('grunt-html');
};

/* EOF */
