/**
 * @file Global functionality.
 *
 * @author Mike Lilli
 *
 * @requires jquery
 */

/**
 * @function [anonymous]
 *
 * @module wellmark.global
 *
 * @description
 * Global functionality code closure.
 */
(function ($) {
	'use strict';

	/*
function mediaqueryresponse(mql){
 if (mql.matches){ // if media query matches
  console.log("The condition " + mql.media + " has been met")
 }
 else{
  console.log("Condition not met yet")
 }
}

var mql = window.matchMedia("screen and (max-device-width: 480px) and (orientation: portrait)")
mediaqueryresponse(mql) // call listener function explicitly at run time
mql.addListener(mediaqueryresponse) // attach listener function to listen in on state changes
	*/

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
			.on('click', 'a[disabled],a.disabled', onDisabledLinkClick)
			.on('click', 'a.print-page', onPrintPage)
			.on('change', 'select[name="magsubnav"]', onSelectChangeBlur);
	}

	/**
	 * @function onDisabledLinkClick
	 *
	 * @param  {jQuery.Event} event - The "click" event.
	 *
	 * @description
	 * Handles the "click" event for anchors that disabled.
	 * Prevents the event's default action and stops propagation.
	 */
	function onDisabledLinkClick(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
	}

	/**
	 * @function onPrintPage
	 *
	 * @param  {jQuery.Event} event - The "click" event.
	 *
	 * @description
	 * Handles the "click" event for anchors with class "print-page".
	 * Prevents the event's default action and stops propagation.
	 */
	function onPrintPage(event) {
		event.preventDefault();
		window.print();
	}

	/**
	 * @function onSelectChangeBlur
	 *
	 * @param {jQuery.Event} event - The "change" or "blur" event.
	 *
	 * @description
	 * Handles the "change" event.
	 */
	function onSelectChangeBlur(event) {
		window.location = $(this).find('option:selected').val();
	}

})(jQuery);

/* EOF */
