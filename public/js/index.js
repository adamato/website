
var ascensor = $('#ascensor').ascensor({direction:"x",ascensorFloorName:['','RUSH','EVENTS','CONTACT'],loop:false,time:400,childType:'section'});

$('#nav-bar div').click(function(event, index) {
	ascensor.trigger('scrollToStage', $(this).index());
});

$(".vendor").fitVids();

ascensor.on('scrollStart', function(event, floor){
	$('#nav-bar div').removeClass('selected');
	$('#nav-bar div:eq('+floor.to+')').addClass('selected nav-active');
});

// Google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-46859810-1']);
_gaq.push(['_trackPageview']);
(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


//For the menu

$(function() {
	var pull		= $('#pull');
		menu        = $('nav');
		menuHeight	= menu.height();

	$(pull).on('click', function(e) {
		e.preventDefault();
		menu.slideToggle();
	});

	$(window).resize(function(){
		var w = $(window).width();
		if(w > 320 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});
});