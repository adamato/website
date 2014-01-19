var socket = io.connect('http://0.0.0.0:3000'),
	room = {};


$('#forum').on('click', function () {
	$('#committees div').remove();
	socket.emit('committees',{}, function (committees) {
		committees.forEach( function (committee) {
			$('#committees').append('<div><h1>' + committee + '</h1></div>');
		});
	});
});


$('#committees').on('click', 'h1', function () {
	$('#projects div').remove();
	$('.selectedCommittee').removeClass('selectedCommittee');
	$(this).addClass('selectedCommittee');
	socket.emit('projects',{ room:room, committee:$(this).text()}, function (projects) {
		projects.forEach( function (project) {
			$('#projects').append('<div><h2>' + project + '</h2></div>');
		});
	});
});

$('#projects').on('click', 'h2', function () {
	$('#topics div').remove();
	$('.selectedProject').removeClass('selectedProject');
	$(this).addClass('selectedProject');
	socket.emit('topics',{ room:room, committee: $('h1.selectedCommittee').text(), project: $(this).text() }, function (topics) {
		topics.forEach( function (topic) {
			$('#topics').append('<div><h3>' + topic + '</h3></div>');
		});
	});
});

$('#topics').on('click', 'h3', function () {
	$('#posts div').remove();
	$('.selectedTopic').removeClass('selectedTopic');
	$(this).addClass('selectedTopic');
	socket.emit('posts',{ room:room, committee: $('h1.selectedCommittee').text(), project: $('h2.selectedProject').text(), topic: $(this).text() }, function (posts,newRoom) {
		room = newRoom;
		posts.forEach( function (post) {
			$('#posts').append('<div class="post"><h3>'+ post.user +'</h3><p>' + post.time + '<br>' + post.text + '</p></div>');
		});
	});
});

$('#send').on('click', function() {
	var sent = {
		committee: $('h1.selectedCommittee').text(),
		project: $('h2.selectedProject').text(),
		topic: $('h3.selectedProject').text(),
		text: $('#text').text()
	};
	socket.emit('newPost',sent);
	$('#posts').append('<div class="post2"><h3>Me</h3><p>'+new Date()+'</p><p>'+$('#text').val()+'</p></div>');
});

socket.on('sentPost', function (data) {
	console.log(data);
	$('#posts').append(data);
});