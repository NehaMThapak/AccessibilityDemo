'use strict';

/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 * [watch](https://github.com/gruntjs/grunt-contrib-watch)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-watch
 */
module.exports = function (grunt) {
	grunt.config('watch', {
		options: {
			debounceDelay: 250,
			interrupt: true,
			spawn: false
		},
		assets: {
			// Assets to watch:
			files: [
				'<%= globalConfig.path.assets %>/**/*'
			],

			// When assets are changed:
			tasks: [
				'sync:assets'
			]
		},
		grunt: {
			options: {
				reload: true
			},

			files: [
				'Gruntfile.js',
				'tasks/**/*.js'
			],

			// When assets are changed:
			tasks: [
				'jshint:gruntfile',
				'jshint:tasks'
			]
		},
		local: {
			files: [
				// App EJS template files
				'<%= globalConfig.path.app %>/views/**/*.html.ejs',

				// Source files
				'<%= globalConfig.path.source %>/**/*',

				// Images. We watch the images because we need to run cssUrlEmbed which re-runs less
				'<%= globalConfig.path.assets %>/**/*'
			],
			// empty task list, development watch will run tasks dynamically based on changed file
			tasks: []
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};

/* EOF */
