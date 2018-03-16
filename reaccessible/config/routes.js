(function() {
	'use strict';

	var _ = require('lodash');
	var camelize = require('underscore.string/camelize');

	// Draw routes.  Locomotive's router provides expressive syntax for drawing
	// routes, including support for resourceful routes, namespaces, and nesting.
	// MVC routes can be mapped to controllers using convenient
	// `controller#action` shorthand.  Standard middleware in the form of
	// `function(req, res, next)` is also fully supported.  Consult the Locomotive
	// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
	// information.
	module.exports = function () {
		// Note routes get converted to camelCase for
		// controller methods.
		// Exmaple: "directors-officers" -> "directorsOfficers".
		var routes = [
			// About
			'about',
			'about/careers',
			'about/careers/benefits',
			'about/careers/find-job',
			'about/careers/question',
			'about/guides',
			'about/guides/first-time-buyer',
			'about/guides/venture-capital',
			'about/community/events/3-point-play/nominate-hometown',
			'about/community/events/3-point-play/nominate-hometown-sub',
			'about/contact',
			'about/contact/abuse-fraud',
			'about/contact/abuse-fraud-sub',
			'about/contact/iowa-providers',
			'about/contact/south-dakota-providers',
			'about/company-information',
			'about/company-information/basics',
			'about/company-information/directors-officers',
			'about/company-information/directors-officers/bio',
			'about/company-information/who',
			'about/forms',
			'about/forms/iowa',
			'about/forms/south-dakota',
			'about/newsroom',
			'about/newsroom/article',
			'about/privacy-legal',
			'about/tables',
			
			//	Employer
			'employer',
			'employer/employer-fpo',
			'employer/request-quote',
			'employer/request-quote-sub',
			'employer/employer-fpo/employer-fpo-one',
			'employer/employer-fpo/employer-fpo-two',
			'employer/employer-fpo/employer-fpo-three',
			'employer/employer-fpo/employer-fpo-three/employer-fpo-three-sub',
			//	Producer
			'producer',
			'producer/producer-fpo',
			'producer/producer-fpo/producer-fpo-one',
			'producer/producer-fpo/producer-fpo-two',
			'producer/producer-fpo/producer-fpo-three',
			'producer/producer-fpo/producer-fpo-three/producer-fpo-three-sub',
			//	Provider
			'provider',
			'provider/provider-fpo',
			'provider/provider-fpo/provider-fpo-one',
			'provider/provider-fpo/provider-fpo-two',
			'provider/provider-fpo/provider-fpo-three',
			'provider/provider-fpo/provider-fpo-three/provider-fpo-three-sub',

			// Glossary
			'glossary',

			// Newsletter
			'newsletter',

			// Search
			'search',

			// Error
			'error/404',
			'error/500',

			// Dev
			'styleguide',

			//blue
			'blue',
			'blue/article',
			'blue/category',
			'blue/tags',
			'blue/search'
		];

		var self = this;

		// Root
		this.root('pages#home');

		routes.forEach(function (route) {
			var methodName = camelize(_.last(route.split('/')));
			var controllerPrefix = _.startsWith(route, 'blue') ? 'mag#' : 'pages#';
			if ((controllerPrefix === 'mag#') && (methodName === 'blue')) {
				methodName = 'index';
			}
			self.match(route, controllerPrefix + methodName);
		});
		
		self.match('api/zip', 'mock#index', { via: ['POST', 'GET'] });

		// Catch-all for 404
		self.match('*', 'pages#404');
	};

})();

/* EOF */
