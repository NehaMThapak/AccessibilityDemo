/**
 * @file Extends the Bootstrap FormHelpers component with date
 *       masking functionality.
 *
 * @author Mike Lilli
 *
 * @requires jquery
 * @requires bootstrap
 * @requires bootstrap-formhelpers
 */

/**
 * @function [anonymous]
 *
 * @module bootstrap-formhelpers.date
 *
 * @description
 * Date masking component code closure.
 */
(function ($) {
	'use strict';


	/* DATE CLASS DEFINITION
	 * ====================== */

	function BFHDate(element, options) {
		this.options = $.extend({}, $.fn.bfhdate.defaults, options);
		this.$element = $(element);

		if (this.$element.is('input[type="text"]')) {
			this.addFormatter();
		}

		if (this.$element.is('span')) {
			this.displayFormatter();
		}
	}

	BFHDate.prototype = {

		constructor: BFHDate,

		addFormatter: function() {
			this.$element.on('keyup.bfhdate.data-api', BFHDate.prototype.change);

			this.loadFormatter();
		},

		loadFormatter: function () {
			var formattedNumber = formatNumber(this.options.format, this.$element.val());

			this.$element.val(formattedNumber);
		},

		displayFormatter: function () {
			var formattedNumber = formatNumber(this.options.format, this.options.number);

			this.$element.html(formattedNumber);
		},

		change: function (event) {
			var $this = $(this).data('bfhdate');
			var cursorEnd;
			var cursorPosition;
			var formattedNumber;

			if ($this.$element.is('.disabled') || $this.$element.attr('disabled') !== undefined) {
				return true;
			}

			cursorPosition = getCursorPosition($this.$element[0]);

			cursorEnd = false;
			if (cursorPosition === $this.$element.val().length) {
				cursorEnd = true;
			}

			if (event.which === 8 && $this.options.format.charAt($this.$element.val().length) !== 'd') {
				$this.$element.val(String($this.$element.val()).substring(0, $this.$element.val().length - 1));
			}

			formattedNumber = formatNumber($this.options.format, $this.$element.val());

			if (formattedNumber === $this.$element.val()) {
				return true;
			}

			$this.$element.val(formattedNumber);

			if (cursorEnd) {
				cursorPosition = $this.$element.val().length;
			}

			setCursorPosition($this.$element[0], cursorPosition);

			return true;
		}

	};

	function formatNumber(format, number) {
		var formattedNumber = '';
		var indexFormat;
		var indexNumber;
		var lastCharacter;

		number = String(number).replace(/\D/g, '');

		for (indexFormat = 0, indexNumber = 0; indexFormat < format.length; indexFormat = indexFormat + 1) {
			if (/\d/g.test(format.charAt(indexFormat))) {
				if (format.charAt(indexFormat) === number.charAt(indexNumber)) {
					formattedNumber += number.charAt(indexNumber);
					indexNumber = indexNumber + 1;
				}
				else {
					formattedNumber += format.charAt(indexFormat);
				}
			}
			else if (format.charAt(indexFormat) !== 'd') {
				if (number.charAt(indexNumber) !== '' || format.charAt(indexFormat) === '+') {
					formattedNumber += format.charAt(indexFormat);
				}
			}
			else {
				if (number.charAt(indexNumber) === '') {
					formattedNumber += '';
				}
				else {
					formattedNumber += number.charAt(indexNumber);
					indexNumber = indexNumber + 1;
				}
			}
		}

		lastCharacter = format.charAt(formattedNumber.length);
		if (lastCharacter !== 'd') {
			formattedNumber += lastCharacter;
		}

		return formattedNumber;
	}

	function getCursorPosition($element) {
		var position = 0;
		var selection;

		if (document.selection) {
			// IE Support
			$element.focus();
			selection = document.selection.createRange();
			selection.moveStart ('character', -$element.value.length);
			position = selection.text.length;
		}
		else if ($element.selectionStart || $element.selectionStart === 0) {
			position = $element.selectionStart;
		}

		return position;
	}

	function setCursorPosition($element, position) {
		var selection;

		if (document.selection) {
			// IE Support
			$element.focus();
			selection = document.selection.createRange();
			selection.moveStart('character', -$element.value.length);
			selection.moveStart('character', position);
			selection.moveEnd('character', 0);
			selection.select();
		}
		else if ($element.selectionStart || $element.selectionStart === 0) {
			$element.selectionStart = position;
			$element.selectionEnd = position;
			$element.focus();
		}
	}

	/* DATE PLUGIN DEFINITION
	 * ======================= */

	var old = $.fn.bfhdate;

	$.fn.bfhdate = function (option) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data('bfhdate');
			var options = (typeof(option) === 'object' && option);

			if (!data) {
				$this.data('bfhdate', (data = new BFHDate(this, options)));
			}
			if (typeof option === 'string') {
				data[option].call($this);
			}
		});
	};

	$.fn.bfhdate.Constructor = BFHDate;

	$.fn.bfhdate.defaults = {
		format: '',
		number: ''
	};


	/* DATE NO CONFLICT
	 * ========================== */

	$.fn.bfhdate.noConflict = function () {
		$.fn.bfhdate = old;
		return this;
	};


	/* DATE DATA-API
	 * ============== */

	$('form input[type="text"].bfh-date, span.bfh-date').each(function () {
		var $date = $(this);
		console.info(this.className);
		$date.bfhdate($date.data());
	});

})(window.jQuery);
