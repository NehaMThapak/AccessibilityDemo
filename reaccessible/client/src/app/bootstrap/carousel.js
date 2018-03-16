/**
 * @file Extends the Bootstrap Carousel component with touch
 *       swipe events, pagination "page" UI update, and pause
 *       functionality.
 *
 * @author Mike Lilli
 *
 * @requires jquery
 * @requires jquery-hammerjs
 * @requires bootstrap
 */

/**
 * @function [anonymous]
 *
 * @module bootstrap.carousel
 *
 * @description
 * Carousel component code closure.
 */
(function ($) {
	'use strict';

	var isEdge = /Edge\/\d+/g.test(window.navigator.userAgent);

	// Initialization
	// ------------------------------------

	// Initialize the carousel logic
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
		$('.carousel')
			// Add touch support
			.hammer()
			// Update the slides to have aria attributes
			.each(function () {
				var $carousel = $(this);
				var $currentSlide = $carousel.find('.carousel-inner > .item.active').first();

				if (isEdge) { preemptSlideAssignment($currentSlide); }
				updateCarouselControls($carousel);
			})
			// Update the pause button state, when available
			.filter('[data-ride="carousel"]:has(.carousel-pause)')
				.each(function () {
					var $carousel = $(this);
					if (!$carousel.attr('data-state')) {
						$carousel.attr('data-state', 'cycle');
					}
				});

		$(document)
			.on('blur', '.carousel', onCarouselBlur)
			.on('focus', '.carousel', onCarouselFocus)
			.on('slide.bs.carousel', '.carousel', onCarouselSlide)
			// Add "page of" pagination functionality
			// and update aria-hidden attributes
			.on('slid.bs.carousel', '.carousel', onCarouselSlid)
			// Add touch swipe handlers
			.on('swipeleft', '.carousel.default', onSwipeLeft)
			.on('swiperight', '.carousel.default', onSwipeRight)
			// Add pause functionality
			.on('click.bs.carousel.data-api', '.carousel-pause', onTogglePauseButtonClick)
			.on('click.bs.carousel.data-api', '[data-slide]', onSlideToClick)
			.on('click.bs.carousel.data-api', '[data-slide-to]', onSlideToClick);

		$(window)
				.on('pushPage.bs', onPushPage)
				.on('breakpointInit.bs',  onBreakpointInit);
	}

	function onBreakpointInit (event, data) {
		var $carousels = $('.carousel');
		var beginState = data.current === 'xs' || data.current === 'sm' ? 'pause' : ''; // pause on small viewports
		$carousels.filter('[data-ride!="false"]').each(function() { 
			toggleCarouselPause($(this), beginState);				
		});
	}

	/**
	 * @function onCarouselBlur
	 *
	 * @param  {jQuery.Event} event - The blur event.
	 *
	 * @description
	 * Handles the blur event.
	 * Removes the aria-live attribute.
	 */
	function onCarouselBlur (event) {
		var $carousel = $(this);
		$carousel.removeAttr('aria-live');
	}

	/**
	 * @function onCarouselFocus
	 *
	 * @param  {jQuery.Event} event - The focus event.
	 *
	 * @description
	 * Handles the focus event.
	 * Adds the aria-live attribute.
	 */
	function onCarouselFocus (event) {
		var $carousel = $(this);
		$carousel.attr('aria-live', 'polite');
	}

	/**
	 * @function onCarouselSlid
	 *
	 * @param  {jQuery.Event} event - The carousel slid event.
	 *
	 * @description
	 * Handles the carousel slid event.
	 * Updates the UI with the page number.
	 * NOTE: This gets triggered after slide.
	 */
	function onCarouselSlid (event) {
		var $carousel = $(this);
		var $page = $carousel.find('.pagination .page');
		var $currentSlide = $(event.relatedTarget);
		var page;
		var pages;

		$currentSlide.hide().show()
			.siblings().hide();

		if (isEdge) { preemptSlideAssignment($currentSlide, event.direction); }

		// Update the "page of" number if it exists
		if ($page.length) {
			page = ($currentSlide.index() + 1).toString();
			pages = ($currentSlide.siblings().length + 1).toString();

			$page
				.text(page)
				.parent()
					.attr('aria-label', page + ' of ' + pages);
		}

		// If the slid event was flagged as an interaction
		// (clicked on prev, next, pagination or a swipe)
		// Then we need to reset the flag and pause the
		// carousel.
		if ($carousel.data('bs.carousel-interaction')) {
			$carousel.data('bs.carousel-interaction', false);

			toggleCarouselPause($carousel, 'pause');
		}


	}

	/**
	 * @function onCarouselSlide
	 *
	 * @param  {jQuery.Event} event - The carousel slide event.
	 *
	 * @description
	 * Handles the carousel slide event.
	 * Update the aria attributes.
	 * NOTE: This gets triggered before slid.
	 */
	function onCarouselSlide (event) {
		var $carousel = $(this);
		var $currentSlide = $(event.relatedTarget);

		updateCarouselControls($carousel, $currentSlide);
	}


	/**
	 * @function preemptSlideAssignment
	 *
	 * @param {jQuery} $currentSlide - The carousel's current slide jQuery element.
	 *
	 * @description
	 * Update slide classes in advance - fix for MS Edge skipping animation
	 */
	function preemptSlideAssignment ($currentSlide, direction) {
		var ddir = direction || 'left';
		var slides = $currentSlide.siblings().length + 1;
		var $pSlide = $currentSlide.prev().length > 0 ? $currentSlide.prev() : $currentSlide.siblings().last();
		var $nSlide = $currentSlide.next().length > 0 ? $currentSlide.next() : $currentSlide.siblings().first();

		$currentSlide.parent().find('.prev, .next').removeClass('prev').removeClass('next');
		if (slides > 2) {
			$pSlide.addClass('prev');
			$nSlide.addClass('next');
		} else if (slides > 1) {
			if (ddir === 'left') {
				$nSlide.addClass('next');
			} else {
				$pSlide.addClass('prev');
			}
		}
	}

	/**
	 * @function onPushPage
	 *
	 * @param  {jQuery.Event} event - The "pushPage" event.
	 *
	 * @description
	 * Handles the "pushPage" event.
	 * Paused the carousels that are cycling when page,
	 * is pushed and resume the cycle when returned.
	 */
	function onPushPage (event, data) {
		var $carousel = $('.carousel');

		if (data.pushed) {
			$carousel.filter('[data-state="cycle"]')
				.each(function () {
					toggleCarouselPause($(this).attr('data-resume', 'true'), 'pause');
				});

		}
		else {
			$carousel.filter('[data-resume="true"]')
				.each(function () {
					toggleCarouselPause($(this), 'cycle');
				});
		}
	}

	/**
	 * @function onSlideToClick
	 *
	 * @param  {jQuery.Event} event - The "click" event.
	 *
	 * @description
	 * Handles the carousel slide and slideTo "click" event.
	 * Flags the carousel as interacted with.
	 */
	function onSlideToClick (event) {
		var $this = $(this);
		var target = $this.attr('data-target');
		var $carousel = (target)?
			$(target) : $this.parents('.carousel:first');

		// Set the interaction data flag to true so that we
		// know to pause the carousel on onCarouselSlid.
		$carousel.data('bs.carousel-interaction', true);
	}

	/**
	 * @function onSwipeLeft
	 *
	 * @param  {jQuery.Event} event - The swipeleft event.
	 *
	 * @description
	 * Handles the carousel swipeleft event.
	 * Triggers the carousel "next" method.
	 */
	function onSwipeLeft (event) {
		var $carousel = $(this);

		// Set the interaction data flag to true so that we
		// know to pause the carousel on onCarouselSlid.
		$carousel.data('bs.carousel-interaction', true);

		$carousel.carousel('next');
	}

	/**
	 * @function onSwipeRight
	 *
	 * @param  {jQuery.Event} event - The swiperight event.
	 *
	 * @description
	 * Handles the carousel swiperight event.
	 * Triggers the carousel "prev" method.
	 */
	function onSwipeRight (event) {
		var $carousel = $(this);

		$carousel.carousel('prev');

		// Set the interaction data flag to true so that we
		// know to pause the carousel on onCarouselSlid.
		$carousel.data('bs.carousel-interaction', true);
	}

	/**
	 * @function onTogglePauseButtonClick
	 *
	 * @param  {jQuery.Event} event - The click event.
	 *
	 * @description
	 * Handles the toggle pause button click event.
	 * Pauses/unpauses the carousel by triggering the
	 * "pause" or "cycle" method. Also updates the
	 * data-pause attribute for CSS purposes.
	 */
	function onTogglePauseButtonClick (event) {
		var $this = $(this);
		var target = $this.attr('data-target');
		var $carousel = (target)?
			$(target) : $this.parents('.carousel:first');
		var action;

		if ($carousel.attr('data-state') === 'cycle') {
			action = 'pause';
		}
		else {
			action = 'cycle';
		}

  	toggleCarouselPause($carousel, action);
	}

	/**
	 * @function toggleCarouselPause
	 *
	 * @param {jQuery} $carousel - The click event.
	 * @param {string} [action='cycle'|'pause'] - The action to perform.
	 *
	 * @description
	 * Sets the carousel pause state. If no action is provided
	 * then the carousel dynamically calculates the action.
	 */
	function toggleCarouselPause ($carousel, action) {
		var srTextAttr;
		var state;

		if (!action) {
			state = $carousel.attr('data-state');
			if (!state) {
				state = ($carousel.attr('data-ride') === 'carousel')?
					'cycle' : 'paused';
			}

			if (state === 'cycle') {
				action = 'pause';
			}
			else {
				action = 'cycle';
			}
		}

		if (action === 'pause') {
			$carousel
				.attr('data-state', 'paused')
				.carousel('pause');

			srTextAttr = 'data-play-text';
		}
		else {
			$carousel
				.attr('data-state', 'cycle')
				.carousel('cycle');

			srTextAttr = 'data-pause-text';
		}

		$carousel
			.find('.carousel-pause')
			.each(function () {
				var $button = $(this);
				$button.find('.sr-only').text($button.attr(srTextAttr));
			});
	}

	/**
	 * @function updateCarouselControls
	 *
	 * @param {jQuery} $carousel - The carousel jQuery element.
	 * @param {jQuery} $currentSlide - The carousel's current slide jQuery element.
	 *
	 * @description
	 * Updates the tabindex and aria attributes
	 * baased on active slide state for accessibility.
	 */
	function updateCarouselControls ($carousel, $currentSlide) {
		var activeSlideId = $currentSlide && $currentSlide.attr('id');

		$carousel
			.find('.carousel-indicators button')
			.each(function () {
				var $button = $(this);
				var isActive;

				if (activeSlideId) {
					isActive = (activeSlideId === $button.attr('aria-controls'));
				}
				else {
					isActive = $button.hasClass('active');
				}
			});

		$carousel
			.find('.carousel-inner > .item')
			.each(function () {
				var $slide = $(this);
				var isActive;

				if (activeSlideId) {
					isActive = (activeSlideId === $slide.attr('id'));
				}
				else {
					isActive = $slide.hasClass('active');
				}

				$slide.attr('aria-hidden', (!isActive).toString());

				if (isActive) {
					$slide.removeAttr('tabindex');
				}
				else {
					$slide.attr('tabindex', '-1');
				}
			});

		if ($currentSlide) {
			$currentSlide.show();
		}
	}

})(jQuery);

/* EOF */
