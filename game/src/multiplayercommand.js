/**
 *
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * Copyright (C) 2013  Ruben van Os
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

TerminalShell.commands['name'] = function(terminal, nickname) {
	username = nickname;
	Terminal.print('You are now known as \"'+username+'\"');
	menu = "savenickname";
	Terminal.print($('<p>').html('Do you want to save your nickname? <a href="javascript:clicked(\'yes\');">Yes</a> / <a href="javascript:clicked(\'no\');">No</a>'));
};

TerminalShell.commands['login'] = function(terminal, message) {
	Terminal.print('Trying to identify...');
	login(Terminal.history[Terminal.historyPos-1].slice(6));
	var loginname = message.split(" "); 
};

TerminalShell.commands['kick'] = function(terminal, message) {
	kickPlayer(message);
};

TerminalShell.commands['say'] = function(terminal, message) { // Send a chat message
	chat(Terminal.history[Terminal.historyPos-1].slice(4));
};

TerminalShell.commands['p'] = function(terminal, message) { // Send a private message
	sendPrivateMessage(Terminal.history[Terminal.historyPos-1].slice(2));
}

TerminalShell.commands['users'] = function(terminal) { // Show user list
	ws.send('cul');
};
