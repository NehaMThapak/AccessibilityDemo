/**
 * @file Back to top row specific functionality.
 *
 * @requires jquery
 */

/**
 * @function [anonymous]
 *
 * @module wellmark.global
 *
 * @description
 * Back to top functionality code closure.
 */
(function ($) {
	'use strict';

	// Initialize
	init();


	// Function Definitions
	// ------------------------------------

	/**
	 * @function init
	 *
	 * @description
	 * Initializes the module.
	 */
	function init () {
		// Bind event listeners
		$(document)
			.on('click', '.back-to-top.row a[href="#top"]', onBackToTopLinkClick);
	}

	/**
	 * @function onBackToTopLinkClick
	 *
	 * @param  {jQuery.Event} event - The "click" event.
	 *
	 * @description
	 * Handles the "click" event for back to top anchors.
	 */
	function onBackToTopLinkClick(event) {
		event.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, 'slow', function() {
			$('.navbar-brand').focus();
		});
	}

})(jQuery);

/* EOF */
