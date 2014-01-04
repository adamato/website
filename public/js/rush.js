$(document).ready(function(){
	$('.carousel').carousel({
		interval: 2000
	});
});

function interested(){
	$.post('/interest',$('#interestForm').serialize(),function(data){
		$('.modal-body').html('<h1>Thanks, we\'ll keep you posted!</h1>');
	});
}