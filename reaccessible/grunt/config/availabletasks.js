'use strict';

/**
 * Lists available tasks.
 *
 * ---------------------------------------------------------------
 *
 * Lists available tasks
 * [availabletasks](https://github.com/ben-eb/grunt-available-tasks)
 *
 * For usage docs see:
 * 		https://github.com/ben-eb/grunt-available-tasks
 */
module.exports = function (grunt) {
	grunt.config('availabletasks', {
		tasks: {
			options: {
				hideUngrouped: true,
				groups: {
					'Build code tasks': [
						'build',
						'concat',
						'clean',
						'concat',
						'copy',
						'less',
						'sync',
						'uglify'
					],
					'Development watch tasks': [
						'dev',
						'server',
						'watch'
					],
					'Document code tasks': [
						'jsdoc'
					],
					'Validate code tasks': [
						'bootlint',
						'ejs',
						'htmllint',
						'jshint'
					],
					'Version code tasks': [
						'bump'
					]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-available-tasks');
};

/* EOF */
