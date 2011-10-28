/**
 * Author: Jared Williams
 */
 
CSSOFF = {
	c: {
		init: function(){
			var j = $('#obstacles li a'),
				o = [],
				k = '80,76,65,73,68',
				e = $('nav li a');
			
			CSSOFF.c.n(); //inputs
            CSSOFF.c.a.t(); //count
				
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
						
			$(document).keydown(function(v) {
				o.push( v.keyCode );
				CSSOFF.c.w(o, k);
			});
			
			/* IE8 Doesn't support coolness */
			$('#prizes li:last-child').css({ top: '-145px' });
			$('#prizes li:nth-child(3)').css({ top: '60px' });
			var s = document.getElementsByTagName('select')
			for (var i = 0; i < s.length; i++) {
				s[i].style.background = '#fe6636';
			}

			if (!$.browser.opera) {
				$('select.select').each(function() {
					var f = $(this).attr('title');
					if ($('option:selected', this).val() != '') {
						f = $('option:selected',this).text();
					}
					$(this).css({ zIndex: 10, opacity: 0, '-khtml-appearance': 'none' })
						.after('<div class="select"><span>'+f+'</span></div>')
						.change(function(e) {
							var b = $('option:selected', this).text();
							$(this).next().html('<span>'+b+'</span>');
						});
				});
			};
		},
        n: function(){
            var inactive="inactive", active="active", focused="focused";
            $("label").each(function(){
                var obj=document.getElementById($(this).attr("for"));
                if($(obj)){
                    $(obj).addClass(inactive);
                    var text=$(this).text();
                    $(this).css({display: 'none' });
                    $(obj).val(text);
                    $(obj).focus(function(){
                    	$(this).addClass(focused)
                    		.removeClass(inactive)
                    		.removeClass(active);
                        if($(this).val()==text)
                            $(this).val("")
                    });
                    $(obj).blur(function(){
                        $(this).removeClass(focused);
                        if($(this).val()==""){
                            $(this).val(text).addClass(inactive)
                        }else{
                            $(this).addClass(active)
                        }
                    });
                }
            });
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
		w: function(o, k) {
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
UTIL={fire:function(func,funcname,args){var namespace=CSSOFF;funcname=(funcname===undefined)?'init':funcname;if(func!==''&&namespace[func]&& typeof namespace[func][funcname]=='function'){namespace[func][funcname](args);}},loadEvents:function(){var bodyId=document.body.id;UTIL.fire('c');$.each(document.body.className.split(/\s+/),function(i,classnm){UTIL.fire(classnm);UTIL.fire(classnm,bodyId);});UTIL.fire('c','finalize');}};$(document).ready(UTIL.loadEvents);