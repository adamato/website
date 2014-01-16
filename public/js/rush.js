$(document).ready(function(){
	$('.carousel').carousel({
		interval: 3500
	});
});

function interested(){
	$.post('/interest',$('#interest-form').serialize(),function(data){
		$('.modal-header').hide();
		$('.modal-body').html('<h1 style="text-align:center;">Thanks, we\'ll be in touch!</h1>');
		setTimeout(function(){
			$('#myModal').modal('hide');
		},2000);
	});
}