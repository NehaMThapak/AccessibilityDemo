/**
 * @file CEO page specific JavaScript.
 * @author Chad Harrington
 *
 * @requires jquery, ScrollReveal
 */

/**
 * @function [anonymous]
 *
 * @module wellmark.page.ceo
 *
 * @description
 * CEO page code closure.
 */
(function ($) {
	'use strict';

	// Local Variables
	// ------------------------------------

	var isDesktop = isViewingDesktop();
	var sr = window.ScrollReveal();

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

		 sr.reveal('.section-hero-title, .section-hero-subtitle', {
			 duration: 1000,
			 delay: isDesktop ? 700 : 250,
			 easing: 'ease-in',
			 scale: 1,
			 viewFactor: 0.9
		 });

		 sr.reveal('.section-title-animate', {
			origin: 'left',
			duration: 1000,
			delay: 250,
			easing: 'ease-in',
			scale: 1,
			viewFactor: 0.4
		 });

		 sr.reveal('.blockquote-animate', {
			origin: 'bottom',
			duration: 1000,
			delay: 250,
			easing: 'ease-in',
			scale: 1,
			viewFactor: 0.4
		 });


		 // Sequence animtions only show on desktop
		 if (isDesktop) {
			sr.reveal('.deliver-iconography-animate', {
				origin: 'top',
				distance: '60px',
				duration: 800,
				delay: 250,
				easing: 'ease-in',
				scale: 0.9,
				viewFactor: 0.4
			}, 400);

			sr.reveal('.predict-iconography-animate', {
				origin: 'top',
				distance: '60px',
				duration: 800,
				delay: 250,
				easing: 'ease-in',
				scale: 0.9,
				viewFactor: 0.4
			}, 400);

			sr.reveal('.clock, .donate', {
				origin: 'top',
				distance: '60px',
				duration: 800,
				delay: 250,
				easing: 'ease-in',
				scale: 0.9,
				viewFactor: 0.4
			}, 400);

			sr.reveal('.ambulance, .hospital, .wallet', {
				origin: 'top',
				distance: '40px',
				duration: 1000,
				delay: 250,
				easing: 'ease-in',
				scale: 1,
				viewFactor: 0.4
			}, 400);
		 }

	}

	/**
	 * @function isDesktop
	 *
	 * @description
	 * Check to see if viewing on desktop
	 */
	 function isViewingDesktop() {
		return ( $('body').hasClass('breakpoint-lg') || $('body').hasClass('breakpoint-md') );
	 }

})(jQuery);

/* EOF */
