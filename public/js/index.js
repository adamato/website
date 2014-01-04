var ascensor = $('#ascensor').ascensor({direction:"x",ascensorFloorName:['','RUSH','EVENTS'],loop:false,time:100,childType:'section'});

$(".internal-links li").click(function(event, index) {
	ascensor.trigger("scrollToStage", $(this).index()-1);
});

// $(".internal-links li").hover(function(event, index) {
//	ascensor.trigger("scrollToStage", $(this).index());
// });   

$(".video").fitVids();

ascensor.on("scrollStart", function(event, floor){
	$(".internal-links li").removeClass("selected");
	$(".internal-links li:eq("+floor.to+")").addClass("selected");
});
