'use strict';

var bootable = require('bootable');
var cluster = require('cluster');
var httpServer = require('./config/boot/httpserver');
var locomotive = require('locomotive');
var NUM_WORKERS = process.env.WEB_CONCURRENCY || 1;
var app;

if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'local';
}

if (isNaN(process.env.PORT)) {
	process.env.PORT = (process.env.NODE_ENV === 'local')? 3009 : 80;
}

// Start function to boot up the web app
function start () {
	// Create a new application and initialize it with *required* support for
	// controllers and views.  Move (or remove) these lines at your own peril.
	app = new locomotive.Application();
	app.phase(locomotive.boot.controllers(__dirname + '/app/controllers'));
	app.phase(locomotive.boot.views());

	// Add phases to configure environments, run initializers, draw routes, and
	// start an HTTP server.  Additional phases can be inserted as needed, which
	// is particularly useful if your application handles upgrades from HTTP to
	// other protocols such as WebSocket.
	app.phase(require('bootable-environment')(__dirname + '/config/environments'));
	app.phase(bootable.initializers(__dirname + '/config/initializers'));
	app.phase(locomotive.boot.routes(__dirname + '/config/routes'));
	// Use custom modified http sever so app can integrate with Socket.io
	//app.phase(locomotive.boot.httpServer(3000, '0.0.0.0'));
	app.phase(httpServer(process.env.PORT));

	// Boot the application.  The phases registered above will be executed
	// sequentially, resulting in a fully initialized server that is listening
	// for requests.
	app.boot(process.env.NODE_ENV, function (err) {
		if (err) {
			console.error(err.message);
			console.error(err.stack);
			return process.exit(-1);
		}
	});
}

// Code to run if we're in the master process
// Only use cluster if max number of processes allowed is greater than 1
if (cluster.isMaster && NUM_WORKERS > 1) {
	console.log('##  Starting up master process...  ##');

	// Set cluster to silent mode to prevent
	// memory leaks due to issue in node core
	// http://stackoverflow.com/questions/14211102/memory-leaks-in-node-js-clusters-master-process
	// cluster.setupMaster({ silent : true });

	// Create cluster worker processes up to the max
	for (var i = 0; i < NUM_WORKERS; i++) {
		cluster.fork();
	}

	// Listen for dying workers
	cluster.on('exit', function (worker) {
		// Replace the dead worker
		console.log('*** Worker ' + worker.id + ' died :(');
		cluster.fork();
	});
}
// Code to run if we're in a worker process
else {
	if (cluster.worker && cluster.worker.id) {
		console.log('## Starting up worker: ', cluster.worker.id);
	}
	else {
		console.log('## Starting up main application process. ** Cluster not in use. **');
	}

	start();
}

/* EOF */
