$('#rush').load("html/rush.html");
$('#members').load("html/members.html");

var ascensor = $('#ascensor').ascensor({direction:"x"});

$(".internal-links li").click(function(event, index) {
	ascensor.trigger("scrollToStage", $(this).index());
});

$(".internal-links li").hover(function(event, index) {
	ascensor.trigger("scrollToStage", $(this).index());
});                                               

ascensor.on("scrollStart", function(event, floor){
	$(".internal-links li").removeClass("selected");
	$(".internal-links li:eq("+floor.to+")").addClass("selected");
});

