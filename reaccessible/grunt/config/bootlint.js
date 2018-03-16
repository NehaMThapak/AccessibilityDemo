'use strict';

/**
 * Lint bootstrap.
 *
 * ---------------------------------------------------------------
 *
 * Lint bootstrap
 * An HTML linter for Bootstrap projects.
 * [bootlint](https://github.com/twbs/grunt-bootlint)
 *
 * For usage docs see:
 * 		https://github.com/twbs/grunt-bootlint
 */
module.exports = function (grunt) {
	grunt.config('bootlint', {
		bootlint: {
			options: {
				// relaxerror: ['W005','W009'],
				relaxerror: {
					'E014': [
						'public/build/html/mag/recipe.html'
					],
					'W005': [],
					'W009': [
						'public/build/html/mag/index.html'
					]
				},
				showallerrors: false,
				stoponerror: false,
				stoponwarning: false
			},
			files: {
				src: [
					'<%= globalConfig.path.build %>/**/*.html'
				]
			}
		}
  });

	grunt.loadNpmTasks('grunt-bootlint');
};

/* EOF */
