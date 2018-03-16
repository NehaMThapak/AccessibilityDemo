/**
 * @file Extends the Bootstrap Popover component TODO.
 *
 * @author Mike Lilli
 *
 * @requires jquery
 * @requires bootstrap
 */

/**
 * @function [anonymous]
 *
 * @module bootstrap.popovers
 *
 * @description
 * Popovers component code closure.
 */
(function ($, GLOSSARY) {
	'use strict';

	// Constants
	// ------------------------------------

	var POPOVER_TEMPLATE = $('script[type="text/template"].glossary').html();


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

		// fix for buggy popovers in bootstrap
		// https://github.com/twbs/bootstrap/issues/16732

		$('body').on('hidden.bs.popover', function (e) {
			$(e.target).data('bs.popover').inState.click = false;
		});
		
		// Set up the elements
		$('[data-glossary]').each(function () {
			var $opener = $(this);
			var term = $opener.attr('data-glossary') || '';
			var glossaryItem = GLOSSARY[term.toLowerCase()];
			var href, html;
			var popoverOptions;

			if (glossaryItem) {
				href = $opener.attr('href') || '/glossary#' + term;
				html = $opener.html();

				popoverOptions = {
					content: glossaryItem.definition,
					html: true,
					placement: 'auto top',
					title: glossaryItem.term,
					template: POPOVER_TEMPLATE.replace('{URL}', href),
					viewport: {
						selector: '#global-content',
						padding: 5
					}
				};
				
				if(html.indexOf('<span') < 0) {
					$opener.html('<span class="text">' + html + '</span> <span class="icon-info" style="display: inline-block;"></span><span class="sr-only">Glossary popover</span>');
				}

				$opener
					// Make this keyboard accessible
					.attr('tabindex', '0')
					// Extend with popover functionality
					.popover(popoverOptions)
					// Prevent setting of the "#" on the url
					.on('click', function (event) {
						event.preventDefault();
					})
					.on('inserted.bs.popover', function (event) {
						var $popover = $(this).siblings('.popover');
						
						var $popoverContent = $popover.find('.popover-container');
						if($popoverContent[0].scrollHeight > $popoverContent[0].offsetHeight) {
							$popoverContent.attr('tabindex', '0');
						}
						else {
							$popoverContent.removeAttr('tabindex');
						}
						$popover.find('.visit-glossary').focus();
						$popover
							.on('click', '.btn-close', function (event) {
								event.preventDefault();
								$(this).closest('.popover').popover('hide');
								$opener.focus();
							});
					})
					.parent()
					.css('position', 'relative');
			}
		});
	}

})(jQuery, window.appData && window.appData.glossary);

/* EOF */
