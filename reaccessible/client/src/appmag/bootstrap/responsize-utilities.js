/**
 * @file Extends Bootstrap to check for breakpoint change
 *       on window resize and when there is a change,
 *       updates the body element's class with the correct
 *       breakpoint css class: "breakpoint-{BREAKPOINT}, and
 *       also broadcast's the window's "breakpointChange.bs"
 *       change event.
 *
 * @author Mike Lilli
 *
 * @requires jquery
 * @requires bootstrap
 */

/**
 * @function [anonymous]
 *
 * @module bootstrap.responsize-utilities
 *
 * @description
 * Responsive utilities code closure.
 */
(function ($) {
	'use strict';

	// Local Variables
	// ------------------------------------

	var breakpoint;


	// Initialize the modal logic
	// ------------------------------------

	requestAnimationFrame(init);


	// Function Definitions
	// ------------------------------------

	/**
	 * @function init
	 *
	 * @description
	 * Initializes the module.
	 */
	function init () {
		// Create the breakpoints html and append elements
		// to the document
		['xs', 'sm', 'md', 'lg', 'xl'].forEach(function (brkpoint) {
			$('<span/>')
				.addClass('breakpoint visible-' + brkpoint)
				.attr('data-breakpoint', brkpoint)
				.appendTo(document.body);
		});

		// Set the breakpoint
		updateBreakpoint();

		// Bind event listeners
		$(window)
			.on('resize', throttle(onWindowResize, 250));
	}

	/**
	 * @function getBreakpoint
	 *
	 * @returns {string} The current breakpoint.
	 *
	 * @description
	 * Determins the current breakpoint and returns the value.
	 */
	function getBreakpoint() {
		return $('body > .breakpoint:visible').attr('data-breakpoint');
	}

	/**
	 * @function onWindowResize
	 *
	 * @param  {jQuery.Event} event - The window's "resize" event.
	 *
	 * @description
	 * Handles the window's "resize" event.
	 * Calls updateBreakpoint().
	 */
	function onWindowResize (event) {
		requestAnimationFrame(updateBreakpoint);
	}

	/**
	 * @function throttle
	 *
	 * @param {function} func - The function to throttle.
	 * @param {number} threshhold - The threshhold in miliseconds.
	 *
	 * @description
	 * Creates and returns a throttled function based on the
	 * supplied threashhold.
	 */
	function throttle (func, threshhold) {
		var deferTimer;
		var last;

		return function () {
			var now = new Date().getTime();

			if (last && now < last + threshhold) {
				window.clearTimeout(deferTimer);
				deferTimer = window.setTimeout(function () {
					last = now;
					func();
				}, threshhold);
			}
			else {
				last = now;
				func();
			}
		};
	}

	/**
	 * @function updateBreakpoint
	 *
	 * @description
	 * Determines what the current breakpoint is, and if it
	 * is different than the previous breakpoint, sets the
	 * breakpoint css class on the <body> element.
	 * If there was a previous breakpoint, then triggers the
	 * window's breakpointChange.bs event for the with the
	 * current and previous breakpoints in the event data.
	 *
	 * ** Note: ** Calls getBreakpoint().
	 */
	function updateBreakpoint () {
			var previousBreakpoint = breakpoint;

			breakpoint = getBreakpoint();

			if (breakpoint && breakpoint !== previousBreakpoint) {

				$(document.body)
					.removeClass('breakpoint-xs breakpoint-sm breakpoint-md breakpoint-lg breakpoint-xl')
					.addClass('breakpoint-' + breakpoint)
					.attr('data-breakpoint', breakpoint);

				// Update aria attributes for elements that are shown/hidden
				// based on bootstrap visibility css classes
				$('[aria-hidden="true"][class^="visible-' + breakpoint + '"],[aria-hidden="true"][class*=" visible-' + breakpoint + '"]')
					.removeAttr('aria-hidden');

				$('[aria-hidden="true"][class^="hidden-"],[aria-hidden="true"][class*=" hidden-"]').filter(':not(.hidden-' + breakpoint + ')')
					.removeAttr('aria-hidden');

				$('[class^="hidden-' + breakpoint + '"],[class*=" hidden-' + breakpoint + '"]')
					.attr('aria-hidden', 'true');

				$('[class^="visible-"],[class*=" visible-"]').filter(':not([class^="visible-' + breakpoint + '"],[class*=" visible-' + breakpoint + '"])')
					.attr('aria-hidden', 'true');

				if (previousBreakpoint) {
					// Trigger the global window handler
					$(window)
						.triggerHandler('breakpointChange.bs', {
							current: breakpoint,
							previous: previousBreakpoint
						});
				}
				else
				{
					$(window).triggerHandler('breakpointInit.bs', {
						current: breakpoint
					});
				}
			}
		}

})(jQuery);

/* EOF */
