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
			.on('shown.bs.dropdown', onBSDropdownOpen)
			.on('hidden.bs.dropdown', onBSDropdownClose);
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
	 * @function onBSDropdownOpen
	 *
	 * @param  {jQuery.Element} dropdown - The dropdown element.
	 *
	 * @description
	 * Handles the "focusin" event for dropdowns
	 * Checks if focused element is outside container dropdown
	 * if so, it unregisters listener and closes dropdown
	 * @return {Function} Function to attach to focusin
	 */
	function dropdownFocusCheck(dd) {
		
		return function(event) {
			if (!$.contains(dd[0], event.target)) {
				//remove this listener
				$(document).off('focusin.ddx');
				//close dropdown
				//Note: there is no 'close' method so this is done 'by hand'
				dd.removeClass('open');
				dd.find('[aria-expanded="true"]').attr('aria-expanded', 'false');
			}
		};
	}
	
	/**
	 * @function onBSDropdownOpen
	 *
	 * @param  {jQuery.Event} event - The "shown" event.
	 *
	 * @description
	 * Handles the "shown" event for Bootstrap dropdowns
	 * Sets focus to first link in dropdown.
	 * Initializes focusin listener to close when outside dropdown
	 * 
	 */
	function onBSDropdownOpen(event) {
		var dropdown = $(event.target);
		
		setTimeout(function() {
			dropdown.find('.dropdown-menu li:first-child a').focus();
		}, 10);
		
		if(dropdown.hasClass('focus-in-close')) {
			$(document).on('focusin.ddx', dropdownFocusCheck(dropdown));
		}
	}

	/**
	 * @function onBSDropdownClose
	 *
	 * @param  {jQuery.Event} event - The "hidden" event.
	 *
	 * @description
	 * Handles the "hidden" event for Bootstrap dropdowns
	 * Sets focus back to dropdown toggle.
	 */
	function onBSDropdownClose(event) {
		var dropdown = $(event.target);
		
		dropdown.find('[data-toggle="dropdown"]').focus();
	}

})(jQuery);

/* EOF */
