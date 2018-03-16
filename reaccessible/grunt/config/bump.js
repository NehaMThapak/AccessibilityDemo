'use strict';

/**
 * Bump version.
 *
 * ---------------------------------------------------------------
 *
 * Bump version
 * [bump](https://github.com/vojtajina/grunt-bump)
 *
 * For usage docs see:
 * 		https://github.com/vojtajina/grunt-bump
 */
module.exports = function (grunt) {
	grunt.config('bump', {
		options: {
			files: [
				'package.json',
				'bower.json'
			],
			commit: true,
			commitMessage: 'Release v%VERSION%',
			commitFiles: ['-a'], // '-a' for all files
			createTag: false,
			push: true,
			pushTo: '',
			tagName: 'v%VERSION%',
			tagMessage: 'Version %VERSION%',
			updateConfigs: ['pkg']
		}
	});

	grunt.loadNpmTasks('grunt-bump');
};

/* EOF */
