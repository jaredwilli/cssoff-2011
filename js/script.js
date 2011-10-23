/**
 * Author: Jared Williams
 */
 
CSSOFF = {
	common: {
		init: function(){
			var navItem = $('nav li a');
			
			navItem.click(function(e) {
				console.log($(this).attr('href').slice(1));
				var linkHref = $(this).attr('href').slice(1);
				CSSOFF.common.scroll(linkHref);
				e.preventDefault();
			});
			
		},
		scroll: function(elem) {
			console.log($('#'+elem));
			
			var el = $('#'+elem);
			$(window).animate({ scrollTop: el.position().top }, 500);
		}
	}
}
UTIL = {
	fire : function(func,funcname, args){
		var namespace = CSSOFF;
		funcname = (funcname === undefined) ? 'init' : funcname;
		if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function'){
			namespace[func][funcname](args);
		} 
	}, 
	loadEvents : function(){
		var bodyId = document.body.id;
		// hit up common first.
		UTIL.fire('common');
		// do all the classes too.
		$.each(document.body.className.split(/\s+/),function(i,classnm){
			UTIL.fire(classnm);
			UTIL.fire(classnm,bodyId);
		});
		UTIL.fire('common','finalize');
	} 
}; 
// kick it all off here 
$(document).ready(UTIL.loadEvents);