'use strict';

/**
 * Gruntfile
 *
 * This Node script is executed when you run `grunt`.
 * It's purpose is to load the Grunt tasks in your project's `tasks`
 * folder, and allow you to add and remove tasks as you see fit.
 * For more information on how this works, check out the `README.md`
 * file that was generated in your `tasks` folder.
 *
 * WARNING:
 * Unless you know what you're doing, you shouldn't change this file.
 * Check out the `tasks` directory instead.
 */
module.exports = function(grunt) {
	var includeAll;
	var path;
	var registerDefinitions;
	var taskConfigurations;

	// https://github.com/sindresorhus/time-grunt
	require('time-grunt')(grunt);

	includeAll = require('include-all');
	path = require('path');

	// Project configuration.
	grunt.initConfig({
		'globalConfig': require(path.resolve(__dirname, './grunt/config.js')),
		'pkg': grunt.file.readJSON('package.json')
	});

	// Load tasks + configs
	taskConfigurations = loadTasks('./grunt/config');
	registerDefinitions = loadTasks('./grunt/tasks');
	// (ensure that a default task exists)
	if (!registerDefinitions.default) {
		registerDefinitions.default = function (grunt) {
			grunt.registerTask('default', []);
		};
	}

	// Invoke the tasks
	invokeConfigFn(taskConfigurations);
	invokeConfigFn(registerDefinitions);

	/**
	 * Loads Grunt configuration modules from the specified
	 * relative path. These modules should export a function
	 * that, when run, should either load/configure or register
	 * a Grunt task.
	 */
	function loadTasks(relPath) {
		return includeAll({
			dirname: path.resolve(__dirname, relPath),
			filter: /(.+)\.js$/
		}) || {};
	}

	/**
	 * Invokes the function from a Grunt configuration module with
	 * a single argument - the `grunt` object.
	 */
	function invokeConfigFn(tasks) {
		for (var taskName in tasks) {
			if (tasks.hasOwnProperty(taskName)) {
				tasks[taskName](grunt);
			}
		}
	}
};

/* EOF */
