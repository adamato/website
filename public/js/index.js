var ascensor = $('#ascensor').ascensor({direction:"x",ascensorFloorName:['','RUSH','MEMBERS'],loop:false,time:100,childType:'section'});

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


/*
// for some sweet ascensor shit, check out http://www.pearltrees.com/#/N-s=1_6763447&N-p=63187740&N-u=1_921583&N-fa=6763283&N-f=1_6763447
*/