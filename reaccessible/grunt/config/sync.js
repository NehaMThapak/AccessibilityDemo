'use strict';

/**
 * A grunt task to keep directories in sync. It is very similar to grunt-contrib-copy
 * but tries to copy only those files that has actually changed.
 *
 * ---------------------------------------------------------------
 *
 * Synchronize files from the `public/build` folder to `public/local`,
 * smashing anything that's already there.
 * [sync]https://github.com/tomusdrw/grunt-sync
 *
 * For usage docs see:
 * 		https://github.com/tomusdrw/grunt-sync
 *
 */
module.exports = function (grunt) {
	grunt.config('sync', {
		assets: {
			files: [
				{
					cwd: '<%= globalConfig.path.assets %>/',
					src: ['**/*'],
					dest: '<%= globalConfig.path.local %>'
				}//,
				// {
				// 	cwd: '<%= globalConfig.path.bower %>/bootstrap/dist/',
				// 	src: ['fonts/*.{eot,svg,ttf,woff,woff2}'],
				// 	dest: '<%= globalConfig.path.local %>/'
				// }
			]
		},
		local: {
			files: [{
				cwd: '<%= globalConfig.path.build %>/',
				src: ['**/*'],
				dest: '<%= globalConfig.path.local %>'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-sync');
};

/* EOF */
