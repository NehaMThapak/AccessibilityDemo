/**
 * @file Things to flexbox component specific JavaScript
 *
 * @requires jquery
 * @requires matchHeight
 */

/**
 * @function [anonymous]
 *
 * @module wellmark.global
 *
 * @description
 * Handles variable content in item containers
 */
(function ($) {
	'use strict';
	var $items = $('.things-to-flexbox .item');

	// do this on breakpoint init and change only- if extra small viewport remove height matching
	$(window).on('breakpointInit.bs breakpointChange.bs', function () {
		if ($('body').attr('data-breakpoint') === 'xs') {
			$items.matchHeight({ remove: true });
		}
		else {
			$items.matchHeight({ byRow: false, property: 'height' });
		}
	});
})(jQuery);

/* EOF */
