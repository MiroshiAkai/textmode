/**
 *
 *
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * Copyright (C) 2012-2013  Ruben van Os
 *
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 2 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

connected = false;
prepareconnecting = false;
username = "";

TerminalShell.commands['say'] = function(terminal, message) { // Should be in commands.js. FIXME!
	chat(Terminal.history[Terminal.historyPos-1].slice(4));
}

TerminalShell.commands['users'] = function(terminal) { // Show user list. Like say, FIXME
	ws.send('cul');
}

function prepareConnect() {
	prepareconnecting = true;
	if (username == "") {
		username = readCookie('usersettings');
	}
	if (username == "") {
		Terminal.print('Please choose a username by typing "name" followed by your preferred username');
	} else {
		connect();
	}
}

function connect() {
	prepareconnect = false;
	ws = WebSocket("ws://localhost:8398/"); // 8398 is the default port
        ws.onmessage = function(evt) { receiveMessage(evt); };
        ws.onclose = function() { connectionLost(); };
        ws.onopen = function() { connected = true; identifyPlayer(); };
};

function identifyPlayer() {
	ws.send('cni'+username);
};

function changeNick() {
	ws.send('cnc'+username);
};

function sendMessage(message) {
	ws.send(message)
};

function chat(message) {
	ws.send('cmc'+message);
};

function sendPrivateMessage(message) {
	var messagesplit = message.split(" "); // Split it up
	var recipient = messagesplit.shift(); // Grab the first word as recipient
	var message = messagesplit.join(" "); // Put the rest together as message
	ws.send('cmp'+recipient+'|'+message);
	Terminal.print($('<p>').addClass('server').text("To "+recipient+": "+message));
};

function receivePrivateMessage(message) {
	var messagesplit = message.split("|"); // Split it up
	var sender = messagesplit[0]; // Grab the first word as sender
	var message = messagesplit[1];
	Terminal.print($('<p>').addClass('server').text("From "+sender+": "+message));
};

function printUserList(users) {
	for (var i = 0; i < users.length; i++) {
		Terminal.print($('<p>').addClass('userlist').text(users[i].slice(2,-2)));
	};
};

function receiveMessage(evt) {
	var messagetype = evt.data.slice(0,3) // Grab the first three characters to find out what kind of message we are dealing with
	var message = evt.data.slice(3) // Save the rest as the "message"

	switch (messagetype) {
	case "scj": Terminal.print($('<p>').addClass('server').text(message+' has connected.')); break; // User joined
	case "scl": Terminal.print($('<p>').addClass('server').text(message+' has left.')); break; // User left
	case "scu": // Server sends user list
		Terminal.print('Online users:');
		var users = message.split(',')
		printUserList(users);
		Terminal.print('');
		break;
	case "scn": // User changes nickname
		var oldnick = message.split('?')[0];
		var newnick = message.split('?')[1]; 
		Terminal.print($('<p>').addClass('server').text(oldnick+' is now known as '+newnick));
		break;
	case "smg": Terminal.print($('<p>').addClass('server').text('Server: '+message)); break; // General Server Message
	case "smc": Terminal.print($('<p>').addClass('server').text(message)); break; // Server-wide chat message
	case "smp": receivePrivateMessage(message); break; // Private Chat message
	case "smd": // Server Debug Message
		if (debug == true) {
			Terminal.print($('<p>').addClass('server').text('Server debug: '+message));
		}
		break;
	case "eno": Terminal.print($('<p>').addClass('server').text('Server: '+message+' is not online.')); break;
	default:
		Terminal.print('Server sent us a request we couldn\'t understand: '+evt.data);
		ws.send('ens'+evt.data);
	};
};

function connectionLost() {
	Terminal.print($('<p>').addClass('error').text('Connection to server lost.'));
	connected = false;
	menu = "wayofplaying";
	printgamemodemenu();
};
