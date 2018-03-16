/* globals _, $A, jcf */
/**
 * @file Extends form elements with jcf.
 *
 * @author Mike Lilli
 *
 * @requires jcf
 */

/**
 * @function [anonymous]
 *
 * @module bootstrap.forms
 *
 * @description
 * Forms code closure.
 */
(function () {
	'use strict';

	// Initialization
	// ------------------------------------

	// Initialize the forms logic
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
		// Replace native elements with JCF custom elements
		jcf.replaceAll();

		// Set up date pickers
		$('[data-calendar-opener]').each(function () {
			var $opener = $(this);
			var $input = $('#' + $opener.attr('aria-describedby'));
			var input = $input[0];
			var opener = this;
			var openerId = opener.id;
			var tdc;

			tdc = $A.reg[openerId];
			if (tdc && tdc.loaded) {
				tdc.returnFocus = false;
				tdc.close();
				tdc.returnFocus = true;
			}

			$A.setCalendar(
				openerId,
				opener,
				input,
				false,
				function (event, dc) {
					var formattedDate = [
						_.padLeft(dc.range.current.month + 1, 2, '0'),
						_.padLeft(dc.range.current.mDay, 2, '0'),
						dc.range.current.year
					].join('/');
					$input.val(formattedDate);
					dc.close();
				}
			);
		});
	}

})();

/* EOF */
