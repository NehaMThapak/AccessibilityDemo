/* jshint camelcase: false */
/**
 * @file Zip Code to City State Autofill
 * @author Matt Irwin
 *
 * @requires jquery
 * @requires google.maps
 */
/**
 * @function [anonymous]
 *
 * @module wellmark.extras
 *
 * @description
 * zip2CityStateAutofill code closure.
 */
(function($){"use strict";var selector_zip="input.zip_ctl";var selector_city="input.city_ctl";var selector_state="select.state_ctl";var wellmark_zip_url=window.wellmarkZipURL||"/api/zip";
// Function Definitions
// ------------------------------------
/**
	 * @function zipFailed
	 *
	 * @param {object} response - response from promise as object
	 * in expected format
	 *
	 * @description
	 * Function for service promise resolve function;
	 * handles "good" data.  Takes city and state values and sets
	 * appropriate form values
	 * 
	 */
function zipResolved(response){$(selector_city).val(response.city);$(selector_state).val(response.state);jcf.refresh(selector_state)}/**
	 * @function zipFailed
	 *
	 * @param {string|any} response - response from promise
	 *
	 * @description
	 * Function for service promise reject function;
	 * handles "bad" or no data.  This does not throw an error
	 * since functionality is "bonus" and otherwise feature
	 * gracefully degrades
	 * 
	 */
function zipFailed(response){console.log("zipFailed",response)}/**
	 * @function zipToCityState
	 *
	 * @param {string} zip - zip code
	 *
	 * @description
	 * Takes zip code sends to service that will return
	 * city and state data, wrappped in deferred which
	 * handles good or failed values passing them on to
	 * respective (resolve or reject) functions
	 * 
	 */
function zipToCityState(zip){var prm=$.Deferred();$.ajax({method:"POST",url:wellmark_zip_url,data:{zip:zip}}).done(function(results){prm.resolve(results)}).fail(function(err,results){prm.reject(results)});prm.then(zipResolved,zipFailed)}/**
	 * @function isValidZip
	 *
	 * @param {string} zip - zip code
	 *
	 * @description
	 * Does simple US zip code validation
	 * 
	 */
function isValidZip(zip){return/^(\d{5}(-\d{4})?)$/g.test(zip)}/**
	 * @function initZip2CityStateAutofill
	 *
	 * @description
	 * Initializes autofill:
	 *   * Sets up listeners 
	 *     + Listeners validate zip on change and send on 
	 *       to get/translate values
	 * 
	 * Function not executed as part of this script
	 * so it can be a callback if needed (google does this)
	 * 
	 * 
	 */
function initZip2CityStateAutofill(){$(selector_zip).on("keyup change",function(){if(isValidZip($(this).val())){zipToCityState($(this).val())}})}initZip2CityStateAutofill()})(jQuery);