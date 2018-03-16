'use strict';

module.exports = function (grunt) {
	grunt.registerTask('build', 'Builds the web application for the designated environment.', function (env) {
		var envRegex = /\:(\{env\})/;
		var tasks;

		if (!env) {
			env = 'develop';
		}

		grunt.log.writeln('Building app version v' + grunt.config('pkg.version') + ' for environment: ' + env);

		tasks = [
			// Hint the source JavaScript
			'jshint:gruntfile',
			'jshint:tasks',
			'jshint:src',
			// Lint bootstrap
			'ejs:all',
			'ejs:mag',
			'htmllint:all',
			'bootlint:bootlint',
			'clean:html',
			// Perform less task
			'less:{env}',
			// Perform the JavaScript uglification
			'uglify:{env}',
			// Perform JavaScript concatination, and clean up tpm files
			'concat:{env}',
			'clean:compile',
			// Wipe out the development folder
			'clean:{env}',
			// Copy over compiled (/public/build/)
			// and static assets (/assets/) to the development folder
			'copy:{env}',
			// Wipe out the build folder
			'clean:build',
			// Cleans and builds documentation
			'clean:docs',
			'jsdoc:dist'
		];

		// Run Tasks
		tasks.forEach(function (task) {
			var matches = task.match(envRegex);

			if (matches) {
				matches.slice(1).forEach(function (match) {
					task = task.replace(match, env);
				});
			}

			grunt.log.writeln('Running task: ' + task.replace(envRegex, env));
			grunt.task.run(task);
		});
	});
};

/* EOF */
