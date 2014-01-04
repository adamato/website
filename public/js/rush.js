$(document).ready(function(){
	$('.carousel').carousel({
		interval: 3000
	});
});

function interested(){
	$.post('/interest',$('#interest-form').serialize(),function(data){
		$('.modal-body').html('<h1>Thanks, we\'ll keep you posted!</h1>');
	});
}