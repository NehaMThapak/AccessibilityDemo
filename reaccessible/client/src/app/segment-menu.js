/**
 * @file Segment menu component specific JavaScript.
 * @author Mike Lilli
 *
 * @requires jquery
 */

/**
 * @function [anonymous]
 *
 * @module wellmark.global
 *
 * @description
 * Segment menu component code closure.
 * Extends the collapse functionality for the segment menu.
 */
(function ($) {
	'use strict';

	// Initialize the home page logic
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
		// Fix ie focus issue
		$('.segment-menu .menu-item-container a span').on('click', function(){ $(this).closest('a').focus(); });
	
		// Bind event listeners		
		$('.segment-menu [data-toggle="collapse"][data-href][data-href!=""]')
			.on('click.bs.collapse', onCollapseClick);

		$(document)
			.on('click.bs.collapse', onDocumentClick)
			.on('click.bs.collapse', '.segment-menu .close', onCloseClick)
			.on('hidden.bs.collapse', '.segment-menu .collapse', onToggleCollapseHidden)
			.on('show.bs.collapse', '.segment-menu .collapse', onToggleCollapseShow)
			.on('keydown.segment-menu', '.menu-item-container', onSegmentMenuKeydown);
	}

	/**
	 * @function onCloseClick
	 *
	 * @param  {jQuery.Event} event - The "click" event.
	 *
	 * @description
	 * Handles the close click event.
	 * Closes the segment menus.
	 */
	function onCloseClick (event) {
		event.stopImmediatePropagation();

		$(this).closest('.collapse')
			.collapse('hide');
	}

	/**
	 * @function onCollapseClick
	 *
	 * @param  {jQuery.Event} event - The collapse "click" event.
	 *
	 * @description
	 * Handles the collapse "click" event.
	 *
	 */
	function onCollapseClick (event) {
		var $button = $(this);
		var url = $button.attr('data-href');

		if (!$button.is('.collapsed') && url) {
			event.preventDefault();
			event.stopImmediatePropagation();

			location.href = url;
		}
	}

	/**
	 * @function onDocumentClick
	 *
	 * @param  {jQuery.Event} event - The "click" event.
	 *
	 * @description
	 * Handles the document click event.
	 * Closes any open segment menus.
	 */
	function onDocumentClick (event) {
		$('.segment-menu .collapse').each(function () {
			$(this)
				.collapse('hide');
		});
	}

	/**
	 * @function onToggleCollapseHidden
	 *
	 * @param  {jQuery.Event} event - The collapse "hidden" event.
	 *
	 * @description
	 * Handles the collapse "hidden" event.
	 * Removes the "open" class from the parent
	 * ".menu-item-container" element.
	 */
	function onToggleCollapseHidden (event) {
		$(this).parents('.menu-item-container:first')
			.removeClass('open');
	}

	/**
	 * @function onToggleCollapseShow
	 *
	 * @param  {jQuery.Event} event - The collapse "show" event.
	 *
	 * @description
	 * Handles the collapse "show" event.
	 * Adds the "open" class from the parent
	 * ".menu-item-container" element.
	 * Also, collapses any other open segment menus.
	 */
	function onToggleCollapseShow (event) {
		$(this).parents('.menu-item-container:first')
			.addClass('open')
			.parent().siblings().find('.collapse').each(function () {
				$(this).collapse('hide');
			});
	}

	/**
	 * @function onSegmentMenuKeydown
	 *
	 * @param  {jQuery.Event} event
	 *
	 * @description
	 * Handles arrow navigation on segment menus
	 */
	function onSegmentMenuKeydown(event) {
		var $this = $(this);
		var $items;
		var index;
		var k = event.which || event.keyCode;

    if (!/(32|37|38|39|40)/.test(k)) { return; }
    if (k === 32) { $this.click(); }

    $items = $this.parent().find('a, button');
    index = $items.index($items.filter(':focus'));

    if (k === 38 || k === 37) { index--; } // up or left
    if (k === 39 || k === 40) { index++; } // down or right
    if (index < 0) { index = $items.length - 1; }
    if (index === $items.length) { index = 0; } // loop around
	
    $items.eq(index).focus();
	
    event.preventDefault();
    event.stopPropagation();
	}

})(jQuery);

/* EOF */
