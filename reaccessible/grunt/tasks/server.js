'use strict';

module.exports = function (grunt) {
	// server only task
	grunt.task.registerTask('server', 'Watches the server side source directories and keeps the web server running.', function () {
		grunt.task.run('nodemon');
	});
};

/* EOF */
