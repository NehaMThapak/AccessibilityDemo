//contingency plugin based on conditionize js
(function($) {
	'use strict';

	$.fn.ctgy = function(opts) {

		var options = $.extend({
			jsHide: true
		}, opts );

		$.fn.showOrHide = function(listenTo, listenFor, $section, init) {
			init = init || false;
			if ($(listenTo).is('select, input[type=text]') && ($(listenTo).val() === listenFor)) {
				if (!init) { 
					$section.slideDown(); 
				} else {
					$section.show();
				}
			}
			else if ($(listenTo + ':checked').filter(function(idx, elem){return (elem.value === listenFor);}).length > 0) {
				if (!init) { 
					$section.slideDown(); 
				} else {
					$section.show();
				}
			}
			else {
				if (!init) { 
					$section.slideUp();
				} else {
					$section.hide();
				}
			}
		};

		return this.each( function() {
			var cleanSelector = $(this).data('ctgy-option').toString().replace(/(:|\.|\[|\]|,)/g, '\\$1');
			var listenTo = (cleanSelector.substring(0,1)==='#'?cleanSelector:'[name=' + cleanSelector + ']');
			var listenFor = $(this).data('ctgy-value');
			var $section = $(this);

			$(listenTo).on('change', function() {
				$.fn.showOrHide(listenTo, listenFor, $section);
			});
			
			if (options.hideJS) {
				$(this).hide();
			}
			$.fn.showOrHide(listenTo, listenFor, $section, true);
		});
	};
}(jQuery));