!function(a){"use strict";function b(){a(document).on("hide.bs.modal",".modal",e).on("show.bs.modal",".modal",f).on("shown.bs.modal",".modal",g).on("show.bs.modal","#leave-modal",c),a(window).on("breakpointChange.bs",d),a("#leave-modal a.btn-continue").on("click",function(){a("#leave-modal").modal("hide")}),a(document).ready(function(){a("a.leave").attr("data-toggle","modal").attr("data-target","#leave-modal")})}function c(b){var c=a(this),d=a(b.relatedTarget),e=d.attr("href");c.find("a.btn-continue").attr("href",e)}function d(b,c){a(".modal.in").each(function(){a(".modal-backdrop")[a(this).is(":hidden")?"hide":"show"]()}),a("#global-navigation-modal.in").length>0&&("md"===c.current||"lg"===c.current||"xl"===c.current)&&a("#global-navigation-modal.in").modal("hide")}function e(b){var c=a(this),d=a("#page");c.attr("aria-hidden","true").find("iframe.video").attr("src","about:blank"),d.attr("aria-hidden","false"),a('.shown[data-toggle="modal"][data-target="#'+c.attr("id")+'"]').removeClass("shown"),a("#oo_tab").show(),a("html").removeClass("modal-open push-page"),a(window).triggerHandler("pushPage.bs",{pushed:!1})}function f(b){var c,d=a(this),e=a("#page"),f=a(b.relatedTarget),g=f.attr("data-video-url");f.addClass("shown"),g&&(c=d.find("#video-modal-label").html(f.attr("data-video-title")||f.siblings(".video-title").html()).text(),d.find("iframe.video").attr("src",g).attr("title",c)),d.attr("aria-hidden","false"),e.attr("aria-hidden","true"),a(".modal.in").not(this).modal("hide"),a("html").addClass("modal-open"),d.is("[data-push-page]")&&(a("html").addClass("push-page"),a(window).triggerHandler("pushPage.bs",{pushed:!0})),a("#oo_tab").hide()}function g(b){var c=a(this),d=a(b.relatedTarget).attr("data-video-url");d&&window.setTimeout(function(){c.find("button.close").focus()},10),c.find("[data-autofocus]").focus()}requestAnimationFrame(b)}(jQuery);