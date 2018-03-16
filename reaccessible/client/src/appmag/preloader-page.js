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

	// Variable Definitions
	// ------------------------------------

	var scrollEvents = [
		'wheel.preloader-page.wm',
		'mousewheel.preloader-page.wm',
		'touchmove.preloader-page.wm',
		'DOMMouseScroll.preloader-page.wm'
	];
	// left: 37, up: 38, right: 39, down: 40,
	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	var scrollKeys = {
		32: 1,
		33: 1,
		34: 1,
		35: 1,
		37: 1,
		38: 1,
		39: 1,
		40: 1
	};
	var $lastFocused;


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
		$(window)
			.on('start.preloader-page.wm', onPreloadPageStart)
			.on('complete.preloader-page.wm', onPreloadPageComplete)
			.on(scrollEvents.join(' '), onPreloadPageScroll);

		$('#preloader-page')
			.on('blur.preloader-page.wm', onPreloadPageBlur);

		$(document)
			.on('click.preloader-page.wm', '#preloader-page.in', onPreloadPageClick)
			.on('keydown.preloader-page.wm', onPreloadPageScrollKeys);
	}

	/**
	 * @function onPreloadPageBlur
	 *
	 * @param  {jQuery.Event} event - The "blur.preloader-page.wm" event.
	 *
	 * @description
	 * Handles the #preloader-page element "blur.preloader-page.wm" event.
	 * Refocus on the preloader, while shown, to prevent mischievousness.
	 */
	function onPreloadPageBlur(event) {
		var $preloader = $(this);

		// If the user trys to focus out of the shown preloader,
		// refocus on the preloader to prevent mischievousness
		if ($preloader.hasClass('in')) {
			$preloader.focus();
		}
	}

	/**
	 * @function onPreloadPageClick
	 *
	 * @param  {jQuery.Event} event - The "click.preloader-page.wm" event.
	 *
	 * @description
	 * Handles the #preloader-page element "click.preloader-page.wm" event.
	 * Prevents event propagation on the preloader-page element.
	 */
	function onPreloadPageClick(event) {
		event.stopImmediatePropagation();
	}

	/**
	 * @function onPreloadPageComplete
	 *
	 * @param  {jQuery.Event} event - The "complete.preloader-page.wm" event.
	 *
	 * @description
	 * Handles the "complete.preloader-page.wm" event.
	 * Hides the page perloader and removes the
	 * preloader-page-open class from the html element.
	 */
	function onPreloadPageComplete(event) {
		$('#preloader-page')
			.removeClass('in')
			// Update the aria-hidden attribute
			.attr('aria-hidden', 'true');

		$('html,body')
			.removeClass('preloader-page-open');

		$lastFocused.focus();
		$lastFocused = null;
	}

	/**
	 * @function onPreloadPageScroll
	 *
	 * @param  {jQuery.Event} event - The "scroll.preloader-page.wm" event.
	 *
	 * @description
	 * Handles the "scroll.preloader-page.wm" event.
	 * If the preloader-page element has the in class
	 * prevent the event default.
	 */
	function onPreloadPageScroll(event) {
		if ($('#preloader-page').hasClass('in')) {
			event.preventDefault();
		}
	}

	/**
	 * @function onPreloadPageScrollKeys
	 *
	 * @param  {jQuery.Event} event - The "keydown.preloader-page.wm" event.
	 *
	 * @description
	 * Handles the "keydown.preloader-page.wm" event.
	 * If the preloader-page element has the in class
	 * and the keyCode could cause page scroll,
	 * prevent the event default.
	 */
	function onPreloadPageScrollKeys(event) {
		if (scrollKeys[event.keyCode] &&
			$('#preloader-page').hasClass('in')
		) {
			event.preventDefault();
		}
	}

	/**
	 * @function onPreloadPageStart
	 *
	 * @param  {jQuery.Event} event - The "start.preloader-page.wm" event.
	 *
	 * @description
	 * Handles the "start.preloader-page.wm" event.
	 * Shows the page perloader, focuses it, and adds the
	 * preloader-page-open class to the html element.
	 */
	function onPreloadPageStart(event) {
		$lastFocused = $(':focus');

		$('#preloader-page')
			.addClass('in')
			// Update the aria-hidden attribute.
			.attr('aria-hidden', 'false')
			// Focus on the preloader to prevent mischievousness.
			.focus();

		$('html,body')
			.addClass('preloader-page-open');
	}

})(jQuery);

/* EOF */
