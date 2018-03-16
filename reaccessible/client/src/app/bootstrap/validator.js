/**
 * @file Extends the Bootstrap validator component to
 *       display global error messages and bind to modals.
 *
 * @requires jquery
 * @requires bootstrap
 */

/**
 * @function [anonymous]
 *
 * @module bootstrap.validator
 *
 * @description
 * Form validation component code closure.
 * See: http://1000hz.github.io/bootstrap-validator/
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
			.on('shown.bs.modal', '.modal', onModalShown)
			.on('invalid.bs.validator', 'form[data-toggle="validator"]', onValidatorInvalid)
			.on('valid.bs.validator', 'form[data-toggle="validator"]', onValidatorValid)
			.on('click.bs.validator', 'p[data-field], li[data-field]', onValidatorErrorClick)
			.on('keypress.bs.validator', 'p[data-field], li[data-field]', onValidatorErrorKeypress)
			.on('click.bs.validator','button[type="submit"]', onSubmitClick);
	}

	function focusErrorSummary($form, isRepeat) {
		/**
		 * Focusing on the error summary does not appear to work in iOS 9.3.5.  The summary box is not an interactive element nor is it
		 * in the ARIA command hierarchy.
		 */
		if ($form.data('focus') === false) { 
			if (isRepeat === true) {
				$form.find('.errors-focus').parent().attr('aria-hidden', 'true').attr('aria-hidden', 'false');
			}
			$form.find('.errors-focus').focus();
		}
	}

	function onSubmitClick(event)
	{
		// Compensate for the validator library not firing events when the form is already in an error state.
 		var $form = $(this).parents('form:first');
		
		if ($form.has('.has-error').length) {
				focusErrorSummary($form, true); 
		}
	}
	
	/**
	 * @function onModalShown
	 *
	 * @param  {jQuery.Event} event - The modal "shown" event.
	 *
	 * @description
	 * Handles the modal "shown" event.
	 * If there are any forms in the modal that require validation,
	 * extends the form with validator functionality.
	 */
	function onModalShown (event) {
		$(this)
			.find('form[data-validator]:not([data-toggle="validator"])')
			.removeAttr('data-validator')
			.attr('data-toggle', 'validator')
			.validator();
	}

	/**
	 * @function onValidatorErrorClick
	 *
	 * @param {jQuery.Event} event - The "click" event.
	 *
	 * @description
	 * Handles the "click" event.
	 * Focuses on the corresponding form field.
	 */
	function onValidatorErrorClick (event) {
		var $error = $(this);
		var $form = $error.parents('form:first');

		$form.find('[name="' + $error.attr('data-field') + '"]').focus();
	}

	function onValidatorErrorKeypress (event) {
		var k = event.which;
		
		if (k === 13) { $(this).click(); return false; }
		return;
	}

	/**
	 * @function onValidatorInvalid
	 *
	 * @param {jQuery.Event} event - The form's "invalid" event.
	 *
	 * @description
	 * Handles the form's "invalid" event.
	 * Creates the error messages for invalid inputs
	 * and removes the error messages for valid inputs.
	 */
	function onValidatorInvalid (event) {
		var $form = $(this);
		var $input = $(event.relatedTarget);
		var $errors = $form.find('.errors');
		var $errorsList = $errors.find('div.list-unstyled');
		var name = $input.attr('name');
		var uniqueID = 'err-' + (function(){ return Math.round(new Date().getTime() + (Math.random() * 1000)); })();

		$input.attr('aria-describedby', uniqueID);
		$errorsList.find('p[data-field="' + name + '"]').remove();

		event.detail.forEach(function (message) {
			$errorsList.append('<p role="link" tabindex="0" data-field="' + name + '">' + message + '</p>');
		});

		$errors.addClass('with-errors').attr('aria-hidden', 'false');

		var $elementErrors = $form.find('.with-errors > ul > li:not(:has(>span))');
		$elementErrors.wrapInner('<span id="' + uniqueID + '"></span>').prepend('<span class="icon-warning" aria-hidden="true"></span>');

		/**
		 * HACK: The code below is specfically for Internet Explorer's interaction with the JAWS screen reader.  The JAWS screenreader
		 * does not honor alert roles properly and will only read the alert when you inject the markup in twice.
		 * For example in http://www.w3.org/WAI/WCAG20/Techniques/working-examples/ARIA19/aria-alert-validation.html with IE 11/JAWS 17.0.2619 it will
		 * not read the alert.
		 * See: https://stackoverflow.com/questions/28296683/jaws-16-not-reading-alert-role-in-ie-11
		 * */ 
		
		var ie11andabove = navigator.userAgent.indexOf('Trident') !== -1 && navigator.userAgent.indexOf('MSIE') === -1;
		if (ie11andabove)
		{
			setTimeout(function() { $errors.html($errors.html() + ' '); focusErrorSummary($form); }, 300);
			
		}
		else 
		{
			focusErrorSummary($form);
		}
	}

	/**
	 * @function onValidatorValid
	 *
	 * @param {jQuery.Event} event - The form's "valid" event.
	 *
	 * @description
	 * Handles the form's "valid" event.
	 * Removes the error messages for valid inputs.
	 */
	function onValidatorValid (event) {
		var $form = $(this);
		var $input = $(event.relatedTarget);
		var $errors = $form.find('.errors');
		var $errorsList = $errors.find('div.list-unstyled');
		var name = $input.attr('name');
		var $errorItems;

		$errorItems = $errorsList.find('p[data-field="' + name + '"]');
		$errorItems.remove();
		$errorItems = null;
		 
		if ($errorsList.find('p').length === 0) {
			$errors.removeClass('with-errors').attr('aria-hidden', 'true');
		}
	}

})(jQuery);

/* EOF */
