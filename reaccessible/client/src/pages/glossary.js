/* globals jcf */
/**
 * @file Glossary page specific JavaScript.
 * @author Mike Lilli
 *
 * @requires jquery
 */

/**
 * @function [anonymous]
 *
 * @module wellmark.page.glossary
 *
 * @description
 * Glossary page code closure.
 */
(function ($) {
	'use strict';

	// Local Variables
	// ------------------------------------

	var $letters;
	var headerHeight;


	// Initialize the page logic
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
		$letters = $('ul.letters > li');
		headerHeight = $('.glossary-nav').height() + $('.navbar-header').height() + 190;

		// Bind event listeners
		$(document)
			.on('change blur', 'select[name="letter"]', onSelectChangeBlur);

		$(window)
			.on('scroll resize', onWindowResizeScroll);

		//jcf.replaceAll();
	}

	/**
	 * @function onSelectChangeBlur
	 *
	 * @param {jQuery.Event} event - The "change" or "blur" event.
	 *
	 * @description
	 * Handles the "change" event.
	 * Updated the location.hash to the select value change (letter select).
	 */
	function onSelectChangeBlur(event) {
		var hash = (location.hash || '').replace(/^#/, '');
		var val = $(this).val();

		if (!hash || hash.charAt(0) !== val) {
			location.hash = val;
		}
	}

	/**
	 * @function onWindowResizeScroll
	 *
	 * @param {jQuery.Event} event - The "resize" or "scroll" event.
	 *
	 * @description
	 * Handles the "resize" or "scroll" event.
	 * Update hash and select when scrolling through letters or resizing browser.
	 */
	function onWindowResizeScroll(event) {
		var offsetY = window.pageYOffset + headerHeight;

		event.stopPropagation();

		$letters.each(function () {
			var $letter = $(this);
			var offset = $letter.offset();
			var hash;
			var letter;

			if (offset.top < offsetY && offset.top + $letter.height() >= offsetY) {
				hash = (location.hash || '').replace(/^#/, '');
				letter = $letter.find('>a').attr('id');

				// Update hash if not present or when it is only a letter
				if (!hash || hash.charAt(0) !== letter) {
					history.replaceState(null, null, '#' + letter);
				}

				$('select[name="letter"]').val(letter);

				jcf.refresh('select[name="letter"]');

				return false;
			}
		});
	}

})(jQuery);

/* EOF */
