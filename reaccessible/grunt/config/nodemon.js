'use strict';

/**
 * Processes Less files.
 *
 * ---------------------------------------------------------------
 *
 * Processes Less files
 * [nodemon](https://github.com/remy/nodemon)
 *
 * For usage docs see:
 * 		https://github.com/remy/nodemon
 */
module.exports = function (grunt) {
	grunt.config('nodemon', {
		develop: {
			options: {
				delay: 1000,
				env: {
					ASSET_PATH: '/local/',
					NODE_ENV: 'local',
					PORT: 3009,
					ROOT_PATH: '/',
					WEB_CONCURRENCY: 1,
					WEB_MEMORY: 256
				},
				ext: 'js,json',
				ignore: [],
				watch: [
					'app',
					'config'
				]
			},
			script: '<%= pkg.main %>'
		}
	});

	grunt.loadNpmTasks('grunt-nodemon');
};

/* EOF */
