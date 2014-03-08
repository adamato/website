//Video Stuff
var ascensor = $('#ascensor').ascensor({direction:"x",ascensorFloorName:['','RUSH','EVENTS','CONTACT'],loop:false,time:400,childType:'section'});
$('#nav-bar div').click(function(event, index){
	ascensor.trigger('scrollToStage', $(this).index());
});
ascensor.on('scrollStart', function(event, floor){
	$('#nav-bar div').removeClass('selected');
	$('#nav-bar div:eq('+floor.to+')').addClass('selected nav-active');
});
$(".vendor").fitVids();

//Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-46859810-1']);
_gaq.push(['_trackPageview']);
(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


//Navigation Menu, for Mobile

$(function(){
	var pull		= $('#pull');
		menu        = $('nav');
		menuHeight	= menu.height();
		isPulled	= 0;

	$(pull).on('click', function(e){
		e.preventDefault();
		menu.slideToggle();
		isPulled = 1;
	});

	$('.nav-link').on('click', function(e){
		if(isPulled == 1){
			menu.slideToggle();
			isPulled = 0;
		}
	});

	$(window).resize(function(){
		var w = $(window).width();
		if(w > 320 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});
});