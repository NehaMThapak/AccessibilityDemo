/**
 * @file StyleGuide page specific JavaScript.
 * @author Mike Lilli
 *
 * @requires jquery
 * @requires bootstrap-slider
 */
/**
 * @function [anonymous]
 *
 * @module wellmark.page.styleguide
 *
 * @description
 * Styleguide code closure.
 */
(function($){"use strict";
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
function init(){
// Bind event listeners
$(document).on("click","button.inc-progress",onIncProgressClick).on("click",'.btn[data-has-btn-preloader],.btn[data-has-btn-preloader="true"]',onPreloadBtnClick).on("click","#page-preloader-btn",onPreloadPageOpenerClick)}/**
	 * @function onIncProgressClick
	 *
	 * @param {jQuery.Event} event - The "click" event.
	 *
	 * @description
	 * Handles the "click" event.
	 * Increments the progress bar.
	 */
function onIncProgressClick(event){var $bar=$(".progress-bar");var $container=$bar.parent();var $text=$bar.find("> span:first");var html=$text.html();var percent=parseFloat($bar.attr("aria-valuenow")||0,10);if(percent<100){percent+=10}else{percent=0}$bar.css("width",percent+"%").attr("aria-valuenow",percent);$text.html(html.replace(/^\d+/,Math.round(percent)))}/**
	 * @function onPreloadBtnClick
	 *
	 * @param  {jQuery.Event} event - The "click" event.
	 *
	 * @description
	 * Handles the btn element "click" event.
	 * hides the button preloader after 5 seconds.
	 */
function onPreloadBtnClick(event){var $btn=$(this);setTimeout(function(){$btn.removeClass("btn-preload")},5e3)}/**
	 * @function onPreloadPageOpenerClick
	 *
	 * @param  {jQuery.Event} event - The "click" event.
	 *
	 * @description
	 * Handles the opener element "click" event.
	 * Shows the page preloader.
	 */
function onPreloadPageOpenerClick(event){$(window).trigger("start.preloader-page.wm");setTimeout(function(){$(window).trigger("complete.preloader-page.wm")},5e3)}})(jQuery);