'use strict';

var express = require('express');
var routes = require('./routes');


var PORT = 8080;

var cursor = {
	position: {
		line: 0,
		ch: 0
	}
};
var _cursors = [];

var main = function () {
	var app = require('express')();
	var server = app.listen(PORT);
	var io = require('socket.io').listen(server);

	io.on('connection', function (socket) {

		socket.cursor = {
			line: 0,
			ch: 0
		};

		socket.emit('news', {
			hello: 'world'
		});
		socket.on('my other event', function (data) {
			console.log(data);
		});
		// When client moves cursor, update.
		socket.on('cursor.move', function (position) {
			socket.cursor = position;
			var sockets = io.sockets.sockets;
			
			Object.keys(io.sockets.connected).forEach(function (k) {
				if (socket.id === k)
				{
					return;
				}

				var otherSocket = io.sockets.connected[k];
				otherSocket.emit('cursor.move', socket.id, socket.cursor);
			});
		});
	});

	routes.addRoutes(app);
};

if (require.main === module) {
	main();
}
