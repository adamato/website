/////// Socket.io event handling
var socket = io.connect('http://0.0.0.0:3000');

socket.on('chatter', function (data) {
	console.log(data);
    $('#chatter').prepend(data);
});


////// JQuery button clicks

$('#send').on('click', function () {
    var data = {
		room: $('#room').text(),
        text: $('#text').val()
    };
    console.log(data);
    socket.emit('chat',data);
    $('#chatter').prepend('<div class="post2"><h3>Me</h3><p>'+new Date()+'</p><p>'+$('#text').val()+'</p></div>');
});
