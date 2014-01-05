
var ascensor = $('#ascensor').ascensor({direction:"x",ascensorFloorName:['','RUSH','EVENTS'],loop:false,time:100,childType:'section'});

$("#nav-bar div").click(function(event, index) {
	ascensor.trigger("scrollToStage", $(this).index()-1);
});

$(".video").fitVids();

ascensor.on("scrollStart", function(event, floor){
	$("#nav-bar div").removeClass("selected");
	$("#nav-bar div:eq("+floor.to+")").addClass("selected");
});