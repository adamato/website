exports.init = function (cb) {
	// establish a connection to mongo 
	require('mongodb').MongoClient.connect('mongodb://localhost/forum-chat', function (err,db) {
		if (err) throw err;

		var forum = db.collection('forum'), 
			chat = db.collection('chat');

		forum.remove(function(){});
		chat.remove(function(){});

		var committees = {
			dev: { // committee
				website: { // project 
					jquery: [{ // topic
						user:'jeremy', // posts
						text:'sup'
					}],
					nodejs: [{
						user:'dom',
						text:'i love it'
					},{
						user:'greg',
						text:'me too'
					}]
				}
			},
			rush: {
				cs: {
					powerpoint: [{
						user:'sam',
						text:'it sucks'
					},{
						user:'dom',
						text:'damn'
					}],
					meeting: [{
						user:'sam',
						text:'it sucked'
					},{
						user:'greg',
						text:'you suck'
					}]
				},
				biz: {
					powerpoint: [{
						user:'sam',
						text:'it rocks'
					},{
						user:'dan',
						text:'sweet'
					}],
					meeting: [{
						user:'sam',
						text:'nice'
					},{
						user:'dan',
						text:'cool'
					}]
				}
			}
		};

	forum.insert(committees,function(err,added){
/*		console.log(added);
		forum.find({},{'rush.cs':true,_id:false}).toArray( function (err,found) {
			console.log(found[0]);
		});
*/
	});

		var Forum = {
			add: function (committee, project, topic, msg, cb) {
				// var time = new Date(),
				var obj = {},
					obj1 = {},
					obj2 = {};
				if(typeof(project) === 'function') {
					obj[committee] = {};
					forum.findAndModify({},{},{$set:obj},{new:true,upsert:true}, function(err, added) {
						if(err) console.log(err);
						return project(added);
					});
				} else if(typeof(topic) === 'function') {
					obj1[project] = {};
					obj[committee] = obj1;
					forum.findAndModify({},{},{$set:obj},{new:true,upsert:true}, function(err, added) {
						if(err) console.log(err);
						return topic(added);
					});
				} else if(typeof(msg) === 'function') {
					obj2[topic] = [];
					obj1[project] = obj2;
					obj[committee] = obj1;
					forum.findAndModify({},{},{$set:obj},{new:true,upsert:true}, function(err, added) {
						if(err) console.log(err);
						return msg(added);
					});
				} else {
					msg.date = new Date();
					obj2[topic] = msg;
					obj1[project] = obj2;
					obj[committee] = obj1;
					forum.find({},{}).toArray( function (err, found) {
						if(err) console.log(err);
						(((found[0])[committee])[project])[topic].push(msg);
						forum.update({_id:found[0]._id},found[0],function (err, added) {
							if(err) console.log(err);
							return cb(added);
						});
					});
				}

			},
			load: function (committee, project, topic, cb) {
				var names = [],
					projection = {_id:false};
				if(typeof(committee) === 'function') {
					forum.find({},projection).toArray( function (err,found) {
						if(err) console.log(err);
						for (var name in found[0] ) {
							names.push(name);
						}
						return committee(names);
					});
				} else if (typeof(project) === 'function') {
					projection[committee] = true;
					forum.find({},projection).toArray( function (err,found) {
						if(err) console.log(err);
						for (var name in (found[0])[committee] ) {
							names.push(name);
						}
						return project(names);
					});
				} else if (typeof(topic) === 'function') {
					projection[committee+'.'+project] = true;
					forum.find({},projection).toArray( function (err,found) {
						if(err) console.log(err);
						for (var name in ((found[0])[committee])[project] ) {
							names.push(name);
						}
						return topic(names);
					});
				} else {
					projection[committee+'.'+project+'.'+topic] = true;
					forum.find({},projection).toArray( function (err,found) {
						if(err) console.log(err);
						return cb( (((found[0])[committee])[project])[topic] );
					});
				}
			}
		},

		Chat = {
			add: function (room, msg, cb) {
				msg.date = new Date();
				chat.update({ room:room },{ $push: {msgs:msg} },{upsert:true}, function (err,added) {
					if(err) console.log(err);
					return cb(added);
				});
			},
			load: function (room, cb) {
				chat.find({room:room},{msgs:true,_id:false}).toArray( function (err,found) {
					if(err) console.log(err);
					return cb(found[0]);
				});
			}
		};

		return cb( Forum, Chat );
	});
};