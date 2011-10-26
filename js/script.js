CSSOFF = {
	c: {
		init: function(){
			var j = $('#obstacles li a'),
				o = [],
				k = '80,76,65,73,68',
				e = $('nav li a');
				
			e.click(function(v) {
				var l = $(this).attr('href').slice(1);
				CSSOFF.c.s(l);
			});
			
			j.hover(function(v) {
				var x = $(this).attr('href').slice(1);
				CSSOFF.c.o(x);
			}, function(v) {
				$('#lg-obstacle div').removeClass(this.href);
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
			
			
			$(document).keydown(function(v) {
				o.push( v.keyCode );
				CSSOFF.c.w(o, k);
			});
			
			/* IE8 Doesn't support coolness */
			$('#prizes li:last-child').css({ top: '-145px' });
			$('#prizes li:nth-child(3)').css({ top: '60px' });
			
			var z = $('form label');
			for(var i = 0; i < z.length; i++) { 
				var a = z[i],
			  		b = $(a).attr('for'),
					c = $('input').attr('name', b);
				console.log($(a).text())
				c.val($(a).text());
			}
		},
		o: function(x) {
			$('#lg-obstacle ul li').hide();
			$('#lg-obstacle ul li#'+x).show();
			$('#lg-obstacle div').removeAttr('class');
			$('#lg-obstacle div').addClass(x);
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
				if (this.sec >= 0) {
					setTimeout(function() {
						CSSOFF.c.a.t(); // lolcat
					}, 1000);
				} else {
					$('#contestants .right h1').text('Times Up! Game Over');
				}
			}
		},
		w: function(o, k) { // :)
			if ( o.toString().indexOf(k) >= 0 ) {
				$(document).unbind('keydown', arguments.callee);
				$.getScript('http://anti-code.com/plaidirish/paulify.js', function(){
					paulify_add();
					$(document).keydown(paulify_add);
				});          
			}	
		}
	}
};
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