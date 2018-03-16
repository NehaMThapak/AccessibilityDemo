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
	}

})();

/* EOF */
