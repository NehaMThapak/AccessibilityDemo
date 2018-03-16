'use strict';

/**
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript and css from a defined array.
 * [concat](https://github.com/gruntjs/grunt-contrib-concat)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function (grunt) {
	grunt.config('concat', {
		options: {
			separator: ';\n'
		},
		local: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			files: {
				'<%= globalConfig.path.build %>/js/app/main.js': [
					'<%= globalConfig.js.vendor %>',
					'<%= globalConfig.path.build %>/js/app/**/*.js'
				],
				'<%= globalConfig.path.build %>/js/app/mainmag.js': [
					'<%= globalConfig.js.vendor %>',
					'<%= globalConfig.path.build %>/js/appmag/**/*.js'
				]
			}
		},
		develop: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			files: {
				'<%= globalConfig.path.build %>/js/app/main.js': [
					'<%= globalConfig.js.vendor %>',
					'<%= globalConfig.path.build %>/js/app/**/*.js'
				],
				'<%= globalConfig.path.build %>/js/app/mainmag.js': [
					'<%= globalConfig.js.vendor %>',
					'<%= globalConfig.path.build %>/js/appmag/**/*.js'
				]
			}
		},
		production: {
			files: {
				'<%= globalConfig.path.build %>/js/app/main.js': [
					'<%= globalConfig.js.vendor %>',
					'<%= globalConfig.path.build %>/js/app/**/*.js'
				],
				'<%= globalConfig.path.build %>/js/app/mainmag.js': [
					'<%= globalConfig.js.vendor %>',
					'<%= globalConfig.path.build %>/js/appmag/**/*.js'
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
};

/* EOF */
