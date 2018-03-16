'use strict';

/**
 * Minify files with UglifyJS.
 *
 * ---------------------------------------------------------------
 *
 * Minifies client-side javascript `assets`.
 * [uglify](https://github.com/gruntjs/grunt-contrib-uglify)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-uglify
 */
module.exports = function (grunt) {
	grunt.config('uglify', {
		// Local Build
		local: {
			options: {
				beautify: {
					bracketize: true
				},
				compress: false,
				mangle: false,
				preserveComments: 'all',
				screwIE8: true
			},
			files: [
				{
					cwd: '<%= globalConfig.path.source %>/app/',
					dest: '<%= globalConfig.path.build %>/js/app/',
					expand: true,
					src: '**/*.js'
				},
				{
					cwd: '<%= globalConfig.path.source %>/appmag/',
					dest: '<%= globalConfig.path.build %>/js/appmag/',
					expand: true,
					src: '**/*.js'
				},
				{
					cwd: '<%= globalConfig.path.source %>/pages/',
					dest: '<%= globalConfig.path.build %>/js/page/',
					expand: true,
					src: '**/*.js'
				},
				{
					cwd: '<%= globalConfig.path.source %>/extras/',
					dest: '<%= globalConfig.path.build %>/js/extras/',
					expand: true,
					src: '**/*.js'
				},
				{
					cwd: '<%= globalConfig.path.source %>/mag/',
					dest: '<%= globalConfig.path.build %>/js/mag/',
					expand: true,
					src: '**/*.js'
				}
			]
		},
		// Develop Build
		develop: {
			options: {
				beautify: {
					bracketize: true
				},
				compress: false,
				mangle: false,
				preserveComments: 'all',
				screwIE8: true
			},
			files: [
				{
					cwd: '<%= globalConfig.path.source %>/app/',
					dest: '<%= globalConfig.path.build %>/js/app/',
					expand: true,
					src: '**/*.js'
				},
				{
					cwd: '<%= globalConfig.path.source %>/appmag/',
					dest: '<%= globalConfig.path.build %>/js/appmag/',
					expand: true,
					src: '**/*.js'
				},
				{
					cwd: '<%= globalConfig.path.source %>/pages/',
					dest: '<%= globalConfig.path.build %>/js/page/',
					expand: true,
					src: '**/*.js'
				},
				{
					cwd: '<%= globalConfig.path.source %>/extras/',
					dest: '<%= globalConfig.path.build %>/js/extras/',
					expand: true,
					src: '**/*.js'
				},
				{
					cwd: '<%= globalConfig.path.source %>/mag/',
					dest: '<%= globalConfig.path.build %>/js/mag/',
					expand: true,
					src: '**/*.js'
				}
			]
		},
		// Release Build
		production: {
			options: {
				beautify: false,
				compress: {},
				mangle: true,
				preserveComments: false,
				report: 'gzip',
				screwIE8: true
			},
			files: [
				{
					cwd: '<%= globalConfig.path.source %>/app/',
					dest: '<%= globalConfig.path.build %>/js/app/',
					expand: true,
					src: '**/*.js'
				},
				{
					cwd: '<%= globalConfig.path.source %>/appmag/',
					dest: '<%= globalConfig.path.build %>/js/appmag/',
					expand: true,
					src: '**/*.js'
				},
				{
					cwd: '<%= globalConfig.path.source %>/pages/',
					dest: '<%= globalConfig.path.build %>/js/page/',
					expand: true,
					src: '**/*.js'
				},
				{
					cwd: '<%= globalConfig.path.source %>/extras/',
					dest: '<%= globalConfig.path.build %>/js/extras/',
					expand: true,
					src: '**/*.js'
				},
				{
					cwd: '<%= globalConfig.path.source %>/mag/',
					dest: '<%= globalConfig.path.build %>/js/mag/',
					expand: true,
					src: '**/*.js'
				}
			]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
};

/* EOF */
