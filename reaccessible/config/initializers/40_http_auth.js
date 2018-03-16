(function() {
	'use strict';

	module.exports = function() {
		var auth;
		var basic;

		if (this.get('env') !== 'local') {
			console.log('Intializing http auth...');

			auth = require('http-auth');
			basic = auth.basic({
					realm: 'The Realm'
				},
				function (username, password, callback) {
					callback(username === 'mxm' && password === 'Auw69VwR');
				}
			);

			// Auth
			// https://github.com/gevorg/http-auth
			this.use(auth.connect(basic));
		}
	};
})();

/* EOF */
