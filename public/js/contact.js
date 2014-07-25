$(document).ready(function(){
	$('#or').hide();
	$('#phone').hide();
	$('#respectively').hide();
	$('#greetings').change(function(){
		$("#width_tmp").html($('').text());
		$("#width_tmp").html($('#greetings option:selected').text());
		$(this).width($("#width_tmp").width()+7);
	});
	$('#intents').change(function(){
		$("#width_tmp").html($('').text());
		$("#width_tmp").html($('#intents option:selected').text());
		$(this).width($("#width_tmp").width()+7);
	});
	$('#contact_method').change(function(){
		$("#width_tmp").html($('').text());
		$("#width_tmp").html($('#contact_method option:selected').text());
		$(this).width($("#width_tmp").width()+7);
	});
	$('#closings').change(function(){
		$("#width_tmp").html($('').text());
		$("#width_tmp").html($('#closings option:selected').text());
		$(this).width($("#width_tmp").width()+7);
	});
});
$("#contact_method").change(function(){
	if ($("#contact_method option:selected").text() == "email") {
		$('#email').show();
		$('#or').hide();
		$('#phone').hide();
		$('#respectively').hide();
	}
	if ($("#contact_method option:selected").text() == "phone") {
		$('#email').hide();
		$('#or').hide();
		$('#phone').show();
		$('#respectively').hide(); 
	}
	if ($("#contact_method option:selected").text() == "either email or phone") {
		$('#email').show();
		$('#or').show();
		$('#phone').show();
		$('#respectively').show();
	}

});