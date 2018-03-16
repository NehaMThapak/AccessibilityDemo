'use strict';

var fs = require('fs');
var locomotive = require('locomotive');
var path = require('path');
var controller;
var controllerMethods;

controller = new locomotive.Controller();


// Controller Methods
// -------------------------

// NOTE: camelCase methods map to underscore
// view: 'camel_case.html.ejs'
controllerMethods = [
	'home',

	// About
	'about',
	'abuseFraud',
	'abuseFraudSub',
	'article',
	'basics',
	'benefits',
	'bio',
	'bluescareGiving',
	'careers',
	'guides',
	'companyInformation',
	'contact',
	'directorsOfficers',
	'findJob',
	'forms',
	'healthImprovement',
	'iowa', // forms
	'iowaProviders',
	'newsroom',
	'nominateHometown',
	'nominateHometownSub',
	'privacyLegal',
	'question',
	'search',
	'southDakota', // forms
	'southDakotaProviders',
	'tables',
	'ventureCapital',
	'who',

	//	Employer
	'employer',
	'employerFpo',
	'employerFpoOne',
	'employerFpoTwo',
	'employerFpoThree',
	'employerFpoThreeSub',
	'requestQuote',
	'requestQuoteSub',
	//	Producer
	'producer',
	'producerFpo',
	'producerFpoOne',
	'producerFpoTwo',
	'producerFpoThree',
	'producerFpoThreeSub',
	//	Provider
	'provider',
	'providerFpo',
	'providerFpoOne',
	'providerFpoTwo',
	'providerFpoThree',
	'providerFpoThreeSub',

	// Glossary
	'glossary',

	// Newsletter
	'newsletter',

	// Search
	'search',

	// UserID / Password Help
	'loginHelp',

	// Errors
	'404',
	'500',

	// Dev
	'styleguide'
];

controllerMethods.forEach(function (methodName) {
	controller[methodName] = function () {
		var locals = this.res.locals;
		var pathPart = this.req.path.replace(/^\//, '').split('/')[0];
		var segment;

		switch (pathPart) {
			case ('about'):
				segment = 'about';
				break;
			case ('employer'):
				segment = 'segment-two';
				break;
			case ('producer'):
				segment = 'segment-three';
				break;
			case ('provider'):
				segment = 'segment-four';
				break;
		}


		locals.pageId = methodName;
		locals.segment = segment;
		locals.extraStyles = undefined;
		locals.extraJS = undefined;

		locals.pageStyleExists = _pageStyleExists(locals)
		locals.pageScriptExists = _pageScriptExists(locals);

		//throw new Error('hi!');

		this.render();
	};
});

// controller.after('*', _after);
// function _after (error, req, res, next) {
// 	if (error) {
// 		this.invoke('pages', 'error/500');
// 	}

// 	return next();
// }


// Export
// -------------------------

module.exports = controller;


// Function Definitions
// -------------------------

function _pageScriptExists (locals) {
	var filePath = path.join(__dirname, '..', '..', 'public', locals.config.env, 'js', 'page', locals.pageId + '.js');

	try {
		return fs.lstatSync(filePath).isFile();
	}
	catch (ex) {
		return false;
	}
}

function _pageStyleExists (locals) {
	var filePath = path.join(__dirname, '..', '..', 'public', locals.config.env, 'css', 'page', locals.pageId + '.css');

	try {
		return fs.lstatSync(filePath).isFile();
	}
	catch (ex) {
		return false;
	}
}

/* EOF */
