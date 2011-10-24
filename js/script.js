/**
 * Author: Jared Williams
 */
 
CSSOFF = {
	c: {
		init: function(){
			var n = $('nav li a');
			n.click(function(e) {
				var l = $(this).attr('href').slice(1);
				CSSOFF.c.s(l);
				e.preventDefault();
			});
		},
		s: function(a) {
			var e = $('#'+a);
			$('html, body').animate({ scrollTop: e.position().top }, 500);
			e.addClass('active');
		},
		t: function(a) {
			var num = $('#contestants .counter span').text()
			for (var i = 0; i < num; i++) {
				num -= 1;
			}
		}
	}
}
UTIL = {
	fire : function(func,funcname,args){
		var namespace = CSSOFF;
		funcname = (funcname === undefined) ? 'init' : funcname;
		if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function'){
			namespace[func][funcname](args);
		} 
	}, 
	loadEvents : function(){
		var bodyId = document.body.id;
		// hit up common first.
		UTIL.fire('c');
		// do all the classes too.
		$.each(document.body.className.split(/\s+/),function(i,classnm){
			UTIL.fire(classnm);
			UTIL.fire(classnm,bodyId);
		});
		UTIL.fire('c','finalize');
	} 
}; 
// kick it all off here 
$(document).ready(UTIL.loadEvents);