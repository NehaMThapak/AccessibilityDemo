'use strict';

/**
 * Modified HTTP Sever from Locomotive JS to store reference to the server instance so it can be used
 * elsewhere for things like configuring Socket.io. Solution taken partially from related Locomotive github
 * issue (https://github.com/jaredhanson/locomotive/issues/125#issuecomment-31503750).
 *
 * Listen for HTTP requests.
 *
 * This phase creates an HTTP server and listens for requests on the given
 * address and port, defaulting to 0.0.0.0:3000.
 *
 * This phase is typically one of the final phases in the boot sequence.
 * Initializers should be run and routes should be drawn prior to this phase,
 * ensuring that the application is fully prepared to handle requests.
 *
 * Examples:
 *
 *   app.phase(locomotive.boot.httpServer(8080));
 *
 *   app.phase(locomotive.boot.httpServer(8080, '127.0.0.1'));
 *
 *   app.phase(locomotive.boot.httpServer({ address: '127.0.0.1', port: 8080 }));
 *
 * @param {Number} port
 * @param {String} address
 * @param {Object} options
 * @return {Function}
 * @api public
 */
module.exports = function(port, address, options) {
	var http = require('http');

	/**
	 * Increase the global number of max sockets in node's socket pool for improved concurrency/performance
	 * (node default is 5). Limit is per host so this is especially useful for increased concurrency when
	 * updating multiple RAPI data sources interval.
	 *
	 * http://nodejs.org/docs/v0.6.3/api/http.html#agent.maxSockets
	 */
	// http.globalAgent.maxSockets = Infinity;
	http.globalAgent.maxSockets = 25;

	if (typeof address === 'object') {
		options = address;
		address = undefined;
	} else if (typeof port === 'object') {
		options = port;
		address = undefined;
		port = undefined;
	}
	options = options || {};
	port = port || options.port || 3000;
	address = address || options.address || '0.0.0.0';

	return function httpServer(done) {
		this.server = http.createServer(this.express).listen(port, address, function() {
			var addr = this.address();
			console.info('HTTP server listening on %s:%d', addr.address, addr.port);
		});

		return done();
	};
};
