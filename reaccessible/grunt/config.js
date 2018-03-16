'use strict';

module.exports = {
	git: {
		branches: {
			develop: 'develop',
			production: 'master'
		}
	},
	path: {
		app: 'app',
		assets: 'assets',
		bower: 'bower_components',
		build: 'public/build',
		develop: 'public/develop',
		docs: 'docs',
		local: 'public/local',
		production: 'public/production',
		'public': 'public',
		source: 'client/src',
		tasks: 'grunt'
	},
	less: {
		main: [
			// Main / Bootstrap
			'<%= globalConfig.path.source %>/app/main.less',
		]
	},
	js: {
		vendor: [
			// Lodash
			'<%= globalConfig.path.bower %>/lodash/lodash.js',

			// jQuery + plugins
			'<%= globalConfig.path.bower %>/jquery/dist/jquery.js',
			'<%= globalConfig.path.bower %>/jquery-hammerjs/jquery.hammer-full.js',
			'<%= globalConfig.path.bower %>/picturefill/dist/picturefill.js',
			'<%= globalConfig.path.bower %>/matchheight/dist/jquery.matchHeight.js',
			'<%= globalConfig.path.bower %>/jcf/js/jcf.js',
			'<%= globalConfig.path.bower %>/jcf/js/jcf.checkbox.js',
			'<%= globalConfig.path.bower %>/jcf/js/jcf.radio.js',
			'<%= globalConfig.path.bower %>/jcf/js/jcf.scrollable.js',
			'<%= globalConfig.path.bower %>/jcf/js/jcf.select.js',

			// Bootstrap
			'<%= globalConfig.path.bower %>/bootstrap/dist/js/bootstrap.js',
			'<%= globalConfig.path.bower %>/bootstrap-validator/dist/validator.js',

			// Form Helpers
			//'<%= globalConfig.path.bower %>/bootstrap-formhelpers/js/lang/en_US/bootstrap-formhelpers-phone.en_US.js',
			'<%= globalConfig.path.bower %>/bootstrap-formhelpers/js/bootstrap-formhelpers-phone.js',

			// Slider
			'<%= globalConfig.path.bower %>/bootstrap-slider/dist/bootstrap-slider.js',

			// ACCDC (Calendar)
			'<%= globalConfig.path.bower %>/accdc-bootstrap/js/Acc.DC.API.js',
			'<%= globalConfig.path.bower %>/accdc-bootstrap/js/modules/calendar_generator.js',
			'<%= globalConfig.path.bower %>/accdc-bootstrap/js/accdc_bootstrap.js'
		]
	}
};

/* EOF */
