/////// Socket.io event handling
var socket = io.connect('http://0.0.0.0:3000');

socket.on('newPost', function (data) {
	console.log(data);
    $('#posts').prepend(data);
});


////// JQuery button clicks

$('.selection>h2').on('click', function () {
	var query = {
		type: $('#type').text(),
		sel: $(this).text()
	};
	socket.emit('selection', query, function (data) {
		console.log( data ); 
	});
});

$('#sendPost').on('click', function () {
    var data = {
        text: $('#text').val()
    };
    console.log(data);
    socket.emit('post',data);
    $('#posts').prepend('<div class="post2"><h3>Me</h3><p>'+new Date()+'</p><p>'+$('#text').val()+'</p></div>');
});
