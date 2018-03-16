'use strict';

/**
 * Compiles LESS files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * Only the `client/app/main.less` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 * [less]https://github.com/gruntjs/grunt-contrib-less
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-less
 */
module.exports = function (grunt) {
	grunt.config('less', {
		options: {
			ieCompat: false,
			strictImports: true
		},
		local: {
			files: [
				{
					expand: true,
					cwd: '<%= globalConfig.path.source %>/app/',
					src: ['app.less'],
					dest: '<%= globalConfig.path.build %>/css/app/',
					ext: '.css'
				},
				{
					expand: true,
					cwd: '<%= globalConfig.path.source %>/appmag/',
					src: ['appmag.less'],
					dest: '<%= globalConfig.path.build %>/css/appmag/',
					ext: '.css'
				},
				{
					expand: true,
					cwd: '<%= globalConfig.path.source %>/pages/',
					src: ['**/*.less'],
					dest: '<%= globalConfig.path.build %>/css/page/',
					ext: '.css'
				},
				{
					expand: true,
					cwd: '<%= globalConfig.path.source %>/mag/',
					src: ['**/*.less'],
					dest: '<%= globalConfig.path.build %>/css/mag/',
					ext: '.css'
				},
				{
					expand: true,
					cwd: '<%= globalConfig.path.source %>/extras/',
					src: ['**/*.less'],
					dest: '<%= globalConfig.path.build %>/css/extras/',
					ext: '.css'
				}
			]
		},
		develop: {
			files: [
				{
					expand: true,
					cwd: '<%= globalConfig.path.source %>/app/',
					src: ['app.less'],
					dest: '<%= globalConfig.path.build %>/css/app/',
					ext: '.css'
				},
				{
					expand: true,
					cwd: '<%= globalConfig.path.source %>/appmag/',
					src: ['appmag.less'],
					dest: '<%= globalConfig.path.build %>/css/appmag/',
					ext: '.css'
				},
				{
					expand: true,
					cwd: '<%= globalConfig.path.source %>/pages/',
					src: ['**/*.less'],
					dest: '<%= globalConfig.path.build %>/css/page/',
					ext: '.css'
				},
				{
					expand: true,
					cwd: '<%= globalConfig.path.source %>/mag/',
					src: ['**/*.less'],
					dest: '<%= globalConfig.path.build %>/css/mag/',
					ext: '.css'
				},
				{
					expand: true,
					cwd: '<%= globalConfig.path.source %>/extras/',
					src: ['**/*.less'],
					dest: '<%= globalConfig.path.build %>/css/extras/',
					ext: '.css'
				}
			]
		},
		production: {
			options: {
				compress: true,
				optimization: 1
			},
			files: [
				{
					expand: true,
					cwd: '<%= globalConfig.path.source %>/app/',
					src: ['app.less'],
					dest: '<%= globalConfig.path.build %>/css/app/',
					ext: '.css'
				},
				{
					expand: true,
					cwd: '<%= globalConfig.path.source %>/appmag/',
					src: ['appmag.less'],
					dest: '<%= globalConfig.path.build %>/css/appmag/',
					ext: '.css'
				},
				{
					expand: true,
					cwd: '<%= globalConfig.path.source %>/pages/',
					src: ['**/*.less'],
					dest: '<%= globalConfig.path.build %>/css/page/',
					ext: '.css'
				},
				{
					expand: true,
					cwd: '<%= globalConfig.path.source %>/mag/',
					src: ['**/*.less'],
					dest: '<%= globalConfig.path.build %>/css/mag/',
					ext: '.css'
				},
				{
					expand: true,
					cwd: '<%= globalConfig.path.source %>/extras/',
					src: ['**/*.less'],
					dest: '<%= globalConfig.path.build %>/css/extras/',
					ext: '.css'
				}
			]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
};

/* EOF */
