'use strict';

module.exports = function (grunt) {
	var _ = require('lodash');

	// Development watch task
	grunt.task.registerTask('dev', 'Builds the application and watches files for changes. Watch runs tasks dynamically to limit compilation to changed files.', function () {
		var changedFiles = {};
		var htmlAllSrc = grunt.config('ejs.all.src');
		var onChange = _.debounce(_onChange, 200);

		grunt.event.on('watch', _onWatch);

		grunt.task.run([
			'build:local',
			'watch'
		]);

		function _onChange () {
			// Only update the src list with .js file changes,
			// remove non-js files from the change list
			var changeList = Object.keys(changedFiles);
			var len = changeList.length;
			var runHtml = false;
			var runJs = false;
			var runLess = false;
			var tasks = [];
			var watchHtmlSrc = [];
			var watchSrc = [];

			// Clear out change list for next watch cycle
			changedFiles = {};

			// Iterate over the change list
			changeList.forEach(function (changedPath) {
				var changedFile = changedPath.substr(changedPath.lastIndexOf('/') + 1);
				var fileExt = changedFile.substr(changedFile.lastIndexOf('.') + 1);

				// Check the file extension and
				// push the change to the appropriate src list
				switch (fileExt) {
					case ('js'):
						runJs = true;
						watchSrc.push(changedPath);
						break;
					case ('less'):
						runLess = true;
						break;
					case ('ejs'):
						runHtml = true;
						if (changedPath.indexOf('app/views/pages') === 0) {
							watchHtmlSrc.push(changedPath.replace('app\/views\/pages\/', ''));
						}
						break;
					default:
						console.log('Nothing to do for files with extension: ' + fileExt);
				}
			});

			if (runHtml) {
				grunt.config('ejs.all.src', (watchHtmlSrc.length)? watchHtmlSrc : htmlAllSrc);

				tasks.push(
					'ejs:all',
					'ejs:mag',
					'htmllint:all',
					'bootlint:bootlint',
					'clean:html'
				);
			}

			// Build the task list
			if (runLess) {
				tasks.push('less:local');
			}

			if (runJs) {
				grunt.config('jshint.gruntfile', []);
				grunt.config('jshint.tasks', []);
				grunt.config('jshint.test', []);
				grunt.config('jshint.watchSrc', watchSrc);

				tasks.push(
					'jshint:src',
					'uglify:local',
					'concat:local',
					'clean:compile',
					'clean:docs',
					'jsdoc:dist'
				);
			}

			// always copy files and clean the build directory
			tasks.push(
				'sync:local',
				'clean:build'
			);

			// Run the tasks
			grunt.task.run(tasks);
		}

		function _onWatch (action, filepath, watchName) {
			grunt.config('htmllint.force', true);

			if (action === 'deleted') {
				grunt.task.run([
					'build:local'
				]);
			}
			else {
				changedFiles[filepath] = action;
				onChange();
			}
		}

	});
};

/* EOF */
