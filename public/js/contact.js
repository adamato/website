$(document).ready(function(){
	$('#if_student').show();
	$('#if_company').hide();
	$('#if_student-org').hide();
	$('#closing').show();
	$('select[name="role"]').change(function(){
		if ($('select[name="role"] option:selected').text() == "student") {
			$('#if_student').show();
			$('#if_company').hide();
			$('#if_student-org').hide();
			$('#closing').show();
		}
		if ($('select[name="role"] option:selected').text() == "company representative") {
			$('#if_student').hide();
			$('#if_company').show();
			$('#if_student-org').hide();
			$('#closing').show();
		}
		if ($('select[name="role"] option:selected').text() == "student org representative") {
			$('#if_student').hide();
			$('#if_company').hide();
			$('#if_student-org').show();
			$('#closing').show();
		}
	});
});