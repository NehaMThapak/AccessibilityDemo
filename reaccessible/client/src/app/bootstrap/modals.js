/**
 * @file Extends the Bootstrap Modal component to ensure that all
 *       shown modals are hidden when show a modal.
 *
 * @author Mike Lilli
 *
 * @requires jquery
 * @requires bootstrap
 */

/**
 * @function [anonymous]
 *
 * @module bootstrap.modals
 *
 * @description
 * Modal component code closure.
 */
(function ($) {
	'use strict';

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
		// Bind event listeners
		$(document)
			.on('hide.bs.modal', '.modal', onModalHide)
			.on('show.bs.modal', '.modal', onModalShow)
			.on('shown.bs.modal', '.modal', onModalShown)
			.on('show.bs.modal', '#leave-modal', onLeaveModalShow);

		$(window)
			.on('breakpointChange.bs', onBreakpointChange);

		$('#leave-modal a.btn-continue').on('click', function () { $('#leave-modal').modal('hide'); });
		$(document).ready(function () { 
			$('a.leave').attr('data-toggle', 'modal').attr('data-target', '#leave-modal'); 
			
			$('#global-content div.modal').detach().appendTo('body');
		});
	}

	function onLeaveModalShow(event) {
		var $modal = $(this);
		var $opener = $(event.relatedTarget);
		var exitUrl = $opener.attr('href');

		$modal.find('a.btn-continue').attr('href', exitUrl);
	}

	/**
	 * @function onBreakpointChange
	 *
	 * @param {jQuery.Event} event - The window's "breakpointChange" event.
	 * @param {object} data - The breakpoint event data.
	 * @param {string} data.current - The current breakpoint.
	 * @param {string} data.previous - The previous breakpoint.
	 *
	 * @description
	 * Handles the window's "breakpointChange" event.
	 * Ensure that any shown modal that is hidden / shown
	 * gets the modal backdrop hidden / shown.
	 */
	function onBreakpointChange (event, data) {
		$('.modal.in')
			.each(function () {
				$('.modal-backdrop')
					[($(this).is(':hidden'))? 'hide' : 'show']();
			});
	}

	/**
	 * @function onModalHide
	 *
	 * @param  {jQuery.Event} event - The modal "hide" event.
	 *
	 * @description
	 * Handles the modal "hide" event.
	 * Sets the aria-hidden attribute to "true".
	 * Removes the "shown" css class to opener element.
	 * Removes the "push-page" css class from the body element.
	 */
	function onModalHide (event) {
		var $modal = $(this);
		var $page = $('#page');

		$modal
			// Update the aria-hidden attribute
			.attr('aria-hidden', 'true')
			// Stop any video, if there is one
			.find('iframe.video')
			.attr('src', 'about:blank');

		// Update the aria-hidden attribute of the page
		$page.attr('aria-hidden', 'false');

		// Remove the "shown" css class from the opener element
		$('.shown[data-toggle="modal"][data-target="#' + $modal.attr('id') + '"]')
			.removeClass('shown');

		// show the opinonlab widget
		$('#oo_tab').show();

		// Remove the "modal-open" and push-page" css class from the body element
		$('html')
			.removeClass('modal-open push-page');

		$(window)
				.triggerHandler('pushPage.bs', { pushed: false });
	}

	/**
	 * @function onModalShow
	 *
	 * @param  {jQuery.Event} event - The modal "show" event.
	 *
	 * @description
	 * Handles the modal "show" event.
	 * Adds the "shown" css class to the opener element.
	 * Hides any shown modals.
	 * Sets the aria-hidden attribute to "false".
	 * Adds the "push-page" css class from the body element
	 * if the modal has the data-push-page attribute.
	 */
	function onModalShow (event) {
		var $modal = $(this);
		var $page = $('#page');
		var $opener = $(event.relatedTarget);
		var videoUrl = $opener.attr('data-video-url');
		var videoTitle;

		// Add "shown" css class to the opener element
		$opener
			.addClass('shown');

		if (videoUrl) {
			videoTitle = $modal
				.find('#video-modal-label')
				.html($opener.attr('data-video-title') || $opener.siblings('.video-title').html()).text();

			$modal
				.find('iframe.video')
				.attr('src', videoUrl)
				.attr('title', videoTitle);
		}

		// Update the aria-hidden attribute
		$modal.attr('aria-hidden', 'false');

		// Add the aria-hidden attribute to the page
		$page.attr('aria-hidden', 'true');

		// Hide any open modals
		$('.modal.in').not(this)
			.modal('hide');

		// Add the "modal-open" css class to the html element
		$('html')
				.addClass('modal-open');

		// Check if this modal should push the page over,
		// if so, add the "push-page" and "pushing-page"
		// css classes to the body element
		if ($modal.is('[data-push-page]')) {
			$('html')
				.addClass('push-page');

			$(window)
				.triggerHandler('pushPage.bs', { pushed: true });
		}

		// hide the opinionlab widget
		$('#oo_tab').hide();
	}

	/**
	 * @function onModalShown
	 *
	 * @param  {jQuery.Event} event - The modal "shown" event.
	 *
	 * @description
	 * Handles the modal "shown" event.
	 * Auto-focuses on any child element within the modal
	 * that has the data-auto-focus attribute.
	 */
	function onModalShown (event) {
		var $modal = $(this);
		var videoUrl = $(event.relatedTarget).attr('data-video-url');

		if(videoUrl){
			window.setTimeout(function() {$modal.find('button.close').focus();}, 200);
		}

		$modal.find('[data-autofocus]').focus();
	}

})(jQuery);

/* EOF */
