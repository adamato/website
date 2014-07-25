$(document).ready(function(){
	$('#if_student').hide();
	$('#if_representative').hide();
	$('#closing').hide();
	$('select[name="role"]').change(function(){
		if ($('select[name="role"] option:selected').val() == 'student') {
			$('#if_student').show();
			$('#if_representative').hide();
			$('#closing').show();
		}
		if ($('select[name="role"] option:selected').val() == 'representative') {
			$('#if_student').hide();
			$('#if_representative').show();
			$('#closing').show();
		}
	});
});