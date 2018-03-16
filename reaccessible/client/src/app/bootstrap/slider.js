/**
 * @file Extends the Bootstrap Slider component to update
 *       the currently selected label.
 *
 * @author Mike Lilli
 *
 * @requires jquery
 * @requires bootstrap
 * @requires bootstrap-slider
 */

/**
 * @function [anonymous]
 *
 * @module bootstrap.slider
 *
 * @description
 * Slider component code closure.
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
		$('[data-provide="slider"]')
			.on('slideEnabled', onSliderInitialized)
			.on('change', onSliderChange);
	}

	/**
	 * @function initSlider
	 *
	 * @param {jQuery.Element} $slider - The slider element.
	 *
	 * @description
	 * Initializes the slider.
	 * Calls setLabelSelected.
	 */
	function initSlider($slider) {
		var slider = $slider.data('slider');

		if (!slider) {
			setTimeout(function () {
				initSlider($slider);
			}, 100);

			return;
		}

		setLabelSelected($slider, slider.getValue());
	}

	/**
	 * @function onSliderChange
	 *
	 * @param {jQuery.Event} event - The slider's "change" event.
	 *
	 * @description
	 * Handles the slider's "change" event.
	 * Calls setLabelSelected.
	 */
	function onSliderChange(event) {
		var $slider = $(this);
		setLabelSelected($slider, $slider.data('slider').getValue());
	}

	/**
	 * @function onSliderInitialized
	 *
	 * @param {jQuery.Event} event - The slider's "slideEnabled" event.
	 *
	 * @description
	 * Handles the slider's "slideEnabled" event.
	 * Calls initSlider.
	 */
	function onSliderInitialized(event) {
		var $slider = $(this);
		initSlider($slider);
	}

	/**
	 * @function setLabelSelected
	 *
	 * @param {jQuery.Element} $slider - The slider element.
	 * @param {object} value - The current value of the slider.
	 *
	 * @description
	 * Finds the slider label that should be selected
	 * and then adds the "selected" CSS class to the label.
	 */
	function setLabelSelected($slider, value) {
		var $labels = $slider.parent().find('.slider-tick-label');
		var slider = $slider.data('slider');
		var ticks = slider.getAttribute('ticks');
		var index = ticks.indexOf(value);

		$labels
			.removeClass('selected')
			.eq(index)
				.addClass('selected');
	}

})(jQuery);

/* EOF */
