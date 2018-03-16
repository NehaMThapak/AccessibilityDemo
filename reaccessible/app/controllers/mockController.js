'use strict';

var fs = require('fs');
var locomotive = require('locomotive');
var path = require('path');
var controller;

controller = new locomotive.Controller();

var sdata = {
	'90034': {
		'city': 'Los Angeles',
		'state': 'CA'
	},
	'90017': {
		'city': 'Los Angeles',
		'state': 'CA'
	},
	'90230': {
		'city': 'Culver City',
		'state': 'CA'
	},
	'90210': {
		'city': 'Beverly Hills',
		'state': 'CA'
	},
	'90066': {
		'city': 'Los Angeles',
		'state': 'CA'
	},
	'97210': {
		'city': 'Portland',
		'state': 'OR'
	},
	'98122': {
		'city': 'Seattle',
		'state': 'WA'
	},
	'89109': {
		'city': 'Las Vegas',
		'state': 'NV'
	},
	'85016': {
		'city': 'Phoenix',
		'state': 'AZ'
	},
	'84105': {
		'city': 'Salt Lake City',
		'state': 'UT'
	},
	'00000': {
		'city': 'Anytown',
		'state': 'KS'
	}
}


// Controller Methods
// -------------------------
controller.index = function() {
	var self = this;
	this.respond({
		default: function() {
			var bzip = self.req.body.zip, rjson;
			if(!bzip){
				self.res.status(400).json({message: 'No zip value passed'});
			} else if (!/^(\d{5}(-\d{4})?)$/g.test(bzip)) {
				self.res.status(400).json({message: 'Invalid Zip', ozip: bzip });
			} else {
				bzip = bzip.substring(0,5);
				rjson = sdata[bzip] || sdata ['00000'];
				self.res.json(rjson); 
			}
		}
	});
}

// Export
// -------------------------

module.exports = controller;


/* EOF */
