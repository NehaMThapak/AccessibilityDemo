'use strict';

/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept less files, from the assets folder into the vuild directory.
 *
 * # build task config
 * Copies all directories and files from the build directory into the assets directory.
 *
 * [copy]https://github.com/gruntjs/grunt-contrib-copy
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = function (grunt) {
	grunt.config('copy', {
		local: {
			files: [
				// Build Output
				{
					expand: true,
					cwd: '<%= globalConfig.path.build %>/',
					src: [
						'**'
					],
					dest: '<%= globalConfig.path.local %>/'
				},
				// Static Assets
				// {
				// 	expand: true,
				// 	cwd: '<%= globalConfig.path.bower %>/bootstrap/dist/',
				// 	src: [
				// 		'fonts/*.{eot,svg,ttf,woff,woff2}'
				// 	],
				// 	dest: '<%= globalConfig.path.local %>/'
				// },
				{
					expand: true,
					cwd: '<%= globalConfig.path.assets %>/',
					src: [
						'*.ico',
						'font/*.{eot,svg,ttf,woff,woff2}',
						'img/**/*',
						'video/**/*.*'
					],
					dest: '<%= globalConfig.path.local %>/'
				}
			]
		},
		develop: {
			files: [
				// Build Output
				{
					expand: true,
					cwd: '<%= globalConfig.path.build %>',
					src: [
						'**'
					],
					dest: '<%= globalConfig.path.develop %>/'
				},
				// Static Assets
				// {
				// 	expand: true,
				// 	cwd: '<%= globalConfig.path.bower %>/bootstrap/dist/',
				// 	src: [
				// 		'fonts/*.{eot,svg,ttf,woff,woff2}'
				// 	],
				// 	dest: '<%= globalConfig.path.develop %>/'
				// },
				{
					expand: true,
					cwd: '<%= globalConfig.path.assets %>/',
					src: [
						'*.ico',
						'font/*.{eot,svg,ttf,woff,woff2}',
						'img/**/*',
						'video/**/*'
					],
					dest: '<%= globalConfig.path.develop %>/'
				}
			]
		},
		production: {
			files: [
				// Build Output
				{
					expand: true,
					cwd: '<%= globalConfig.path.build %>',
					src: [
						'**'
					],
					dest: '<%= globalConfig.path.production %>/'
				},
				// Static Assets
				// {
				// 	expand: true,
				// 	cwd: '<%= globalConfig.path.bower %>/bootstrap/dist/',
				// 	src: [
				// 		'fonts/*.{eot,svg,ttf,woff,woff2}'
				// 	],
				// 	dest: '<%= globalConfig.path.production %>/'
				// },
				{
					expand: true,
					cwd: '<%= globalConfig.path.assets %>/',
					src: [
						'*.ico',
						'font/*.{eot,svg,ttf,woff,woff2}',
						'img/**/*',
						'video/**/*'
					],
					dest: '<%= globalConfig.path.production %>/'
				}
			]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
};

/* EOF */
