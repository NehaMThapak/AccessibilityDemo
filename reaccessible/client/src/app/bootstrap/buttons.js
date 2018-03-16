/**
 * @file Extends the Bootstrap buttons component to update
 *       the currently selected label.
 *
 * @author Mike Lilli
 *
 * @requires jquery
 * @requires bootstrap
 */

/**
 * @function [anonymous]
 *
 * @module bootstrap.buttons
 *
 * @description
 * Buttons component code closure.
 */
(function ($) {
	'use strict';

	// Initialize the modal logic
	// ------------------------------------

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
			.on('click', '.btn[data-has-btn-preloader],.btn[data-has-btn-preloader="true"]', onButtonPreloadClick);
	}

	/**
	 * @function onButtonPreloadClick
	 *
	 * @param {jQuery.Event} event - The "click" event.
	 *
	 * @description
	 * Handles the "click" event.
	 * Adds the btn-preload class, and prevents event default
	 * if the btn-preload class already exists.
	 * This allows for initial click event handler(s) to fire
	 * on the first click, and disables the button until the
	 * btn-preload class is manually removed (i.e. after AJAX callback).
	 */
	function onButtonPreloadClick(event) {
		var $btn = $(this);

		if ($btn.hasClass('btn-preload')) {
			event.preventDefault();
			event.stopImmediatePropagation();
			return;
		}

		$btn
			.addClass('btn-preload');
	}

})(jQuery);

/* EOF */
