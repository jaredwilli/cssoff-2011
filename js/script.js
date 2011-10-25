/**
 * Author: Jared Williams
 */
 
var CSSOFF = {
	c: {
		init: function(){
			var n = $('nav li a'),
				j = $('#obstacles li a');
				
			n.click(function(e) {
				var l = $(this).attr('href').slice(1);
				CSSOFF.c.s(l);
			});
			
			j.hover(function(e) {
				var x = $(this).attr('href').slice(1);
				CSSOFF.c.o(x);
			}, function(e) {
				$('#lg-obstacle').removeClass(this.href);
			});
			
			if ($('#home').hasClass('.active')) {
				$('nav li:last-child').fadeOut('slow').hide();
			} else {
				$('nav li:last-child').fadeIn('slow').show();
			}
			
			if ($('#contestants').hasClass('active')) {
				CSSOFF.c.a.t();
			}
				CSSOFF.c.a.t();
		},
		
		o: function(x) {
			$('#lg-obstacle').removeAttr('class');
			$('#lg-obstacle').addClass(x);
		},
		s: function(a) {
			var e = $('#'+a);
			$('.active').removeClass('active');
			$('html, body').animate({ scrollTop: e.position().top }, 500);
			e.addClass('active');
		},
		a: {
			sec: 60,
			t: function() {
				$('.counter span').text(this.sec);
				this.sec -= 1;
				if (this.sec > -1) {
					setTimeout(function() {
						CSSOFF.c.a.t(); // lolcat
					}, 1000);
				}
			}
		}
	}
};
var UTIL = {
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