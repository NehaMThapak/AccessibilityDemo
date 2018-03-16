/**
 * @file Segment nav component specific JavaScript.
 * @author Matt Irwin
 *
 * @requires jquery
 */

/**
 * @function [anonymous]
 *
 * @module wellmark.global
 *
 * @description
 * Segment nav component code closure.
 * Extends the toggle functionality for the segment nav.
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
	function init() {
		$(document)
			.on('hidden.bs.dropdown', '#segment-nav', onToggleCollapseHidden);
	}

	/**
	 * @function onToggleCollapseHidden
	 *
	 * @param  {jQuery.Event} event - The dropdown "hidden" event.
	 *
	 * @description
	 * Handles the dropdown "hidden" event.
	 * Forces focus to opener for browsers that don't by default
	 */
	function onToggleCollapseHidden (event) {
		$('#content-nav-opener').focus();
	}


})(jQuery);

/* EOF */
