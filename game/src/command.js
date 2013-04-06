/**
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

TerminalShell.commands['look'] = Adventure.look = function(terminal) {
	if (gameover == 0) {
		if (silent_move == false) {
			if (wayofplaying == 2) {
				Terminal.print($('<p>').html('<a href="javascript:clicked(\'end\');">End turn</a>'));
			}
			if (inventory.length > 0) {
				inventorylist = 'Inventory: ';
				for (i = 0; i < inventory.length; i++) {
					inventorylist = inventorylist + '<a href="javascript:clicked(\'drop '+inventory[i]+'\');">'+inventory[i]+'</a>.';
				}
				Terminal.print($('<p>').html(inventorylist));
			}
			Terminal.print($('<p>').html(roomdescription[playerlocation[currentplayer]]));	
			if (Adventure.location.exits) {
				if (gamemode == 2) {
					terminal.print(timeinfo);
				} else {
					terminal.print('');
				}
				if (playerlocation[currentplayer] == 0) {
					if (amount_of_floors == 1) {
						var possibleDirections = ['north', 'east', 'west'];
						var possibleDirections2 = ['north', 'east', 'west'];
					} else {
						var possibleDirections = ['north', 'east', 'west', 'up'];
						var possibleDirections2 = ['north', 'east', 'west', 'up'];
					}
				} else if (playerlocation[currentplayer] == 30) {
					var possibleDirections = ['north', 'east', 'west', 'down'];
					var possibleDirections2 = ['north', 'east', 'west', 'down'];
				} else if ((playerlocation[currentplayer] == hallway_length) || (playerlocation[currentplayer] == hallway_length+30)) {
					var possibleDirections = ['east', 'south', 'west'];
					var possibleDirections2 = ['east', 'south', 'west'];
				} else {
					var possibleDirections = [];
					var possibleDirections2 = [];
					$.each(Adventure.location.exits, function(name, id) {
					possibleDirections.push(name);
					possibleDirections2.push(name);
					});
				}
				exitslist = 'Exits: '
				while (possibleDirections2.length > 0) {
					direction = possibleDirections2.splice(0,1);
					exitslist = exitslist + '<a href="javascript:clicked(\'go '+direction+'\');">'+direction+'</a>' + '          ';
				}
				Terminal.print($('<p>').html(exitslist));
				if (menu != false) {
					terminal.print('');
					if (menu == "newgame") {
						terminal.print('Would you like to start a new game?');
						Terminal.print($('<p>').html('<a href="javascript:clicked(\'yes\');">Yes</a> or <a href="javascript:clicked(\'no\');">No</a>'));
					}
				}
			}
		}
		if (lightstatus[playerlocation[currentplayer]] == 1) {
			flicker($('#screen'));
		}
	} else {
		terminal.print('This action cannot be executed now.');
	}
};

TerminalShell.commands['debug'] = function(terminal) {
	terminal.print('currentplayer = '+currentplayer);
	for (i=1; i<=amountofplayers; i++) {
		terminal.print('playerlocation['+i+'] = '+playerlocation[i]);
	}
	terminal.print('hallway_length = '+hallway_length);
	terminal.print('amount_of_floors = '+amount_of_floors);
	terminal.print('roomAmount = '+roomAmount);
	for (i = 0; i <= itemname.length ; i++) {
		terminal.print(itemname[i]+' = '+itemlocation[i]);
	}
};

TerminalShell.commands['go'] = Adventure.go = function(terminal, direction) {
	if (gameover == 0) {
		if (wayofplaying != 2 || movesdone == 0) {
			if (Adventure.location.exits && direction in Adventure.location.exits) {
				destination=Adventure.location.exits[direction]
				if (time_passes == true) {
					random_time_passing=getRandomInt(0,5)
					if (random_time_passing==5) {
						time++
					}
				}
				if (time >= 24) {
					do
					{
					time=time-24
					}
					while (time >= 24);
				}
				if (time > 12) {
					timeinfo='\nIt is now '+(time-12)+':00PM';
				} else {
					timeinfo='\nIt is now '+time+':00AM.';
				}
				if (playerlocation[currentplayer] == hallway_length) {
					if (direction == 'north') {
						terminal.print('You cannot go '+direction+'.');
					}
				}
				if (destination >= 10 && destination <= 99 && playerlocation[currentplayer] != hallway_length) {
					if (direction == 'west') {
						destination=destination-10
					} else {
						if (direction == 'east') {
							destination=destination-10
						}
					}
					if (rooms[destination] == 'locked') {
						terminal.print('The door is locked!')
					} else {
						amountofroomsentered++
						amountofmoves++			
						Adventure.goTo(terminal, Adventure.location.exits[direction]);
					}
				} else {
					amountofmoves++
					Adventure.goTo(terminal, Adventure.location.exits[direction]);
					// The player has everything needed to beat the ghost and checked the computer. Time to severely increase the chance of running into the ghost.
					if (gamemode == "ghost") {
						gamemodeIncreaseChance();
					}
				}
			} else if (!direction) {
				terminal.print('Go where?');
			} else {
				terminal.print('You cannot go '+direction+'.');
			}
		} else {
			terminal.print('You are only allowed to move once per turn! Please end your turn if you are done.');
		}
	} else {
		terminal.print('This action cannot be executed now.');
	}
};

TerminalShell.commands['yes'] = function(terminal) {
	if (menu == 'newgame') {
		menu='wayofplaying';
		printgamemodemenu();
	} else if (menu == 'ghostplayer2teleport') {
		ghostmove=1;
		Adventure.gamemode(terminal);
		ghostmove=0;
		gameover=0;
		Terminal.runCommand('end');
	} else if (menu == 'savenickname') {
		writeCookie("usersettings", username);
		Terminal.print('Username saved.');
		menu = '';
		if (connected == true) {
			changeNick();
		} else if (prepareconnecting == true) {
			prepareConnect();
		}
	} else {
		Terminal.print('Could not find a question to answer "yes" to.');
	}
};

TerminalShell.commands['no'] = function(terminal) {
	if (menu == 'newgame') {
		Terminal.print('No new game has been started, please refresh the page if you want to continue playing.');
	} else if (menu == 'ghostplayer2teleport') {
		ghostmove=0
		Adventure.gamemode(terminal);
		gameover=0
		Terminal.runCommand('end');
	} else if (menu == 'savenickname') {
		Terminal.print('Username was not saved');
		menu = '';
		if (connected == true) {
			changeNick();
		} else if (prepareconnecting == true) {
			prepareConnect();
		}
	} else {
		Terminal.print('Could not find a question to answer "no" to.');
	}
};

TerminalShell.commands['1'] = function(terminal) {
	if (menu == 'wayofplaying') {
		Terminal.print('Singleplayer selected.');
		wayofplaying=1;
		menu='gamemode';
		Terminal.print('Please choose a gamemode:');
		for (i = 0; i < singleplayermodes.length; i++) {
                	Terminal.print($('<p>').html('<a href="javascript:clicked('+(i+1)+');">'+(i+1)+'. '+capitaliseFirstLetter(singleplayermodes[i])+'</a>'));
		}
	} else if (menu == 'gamemode') {
		if (wayofplaying == 1) {
			gamemode = singleplayermodes[0]; // First singleplayer mode
			menu = false;
			loadGamemode();
		} else {
			gamemode = multiplayermodes[0]; // First multiplayer mode
			menu = false;
			loadGamemode();
		}
		amountofplayers = 2; // NPCs are players too, to make singleplayer and multiplayer work together more easily
		gameover = 0;
	} else {
		Terminal.print('Could not find a question to answer "1" to.');
	}
};

TerminalShell.commands['2'] = function(terminal) {
	if (menu == 'wayofplaying') {
		Terminal.print('Local multiplayer selected.');
		wayofplaying=2;
		menu='gamemode';
		Terminal.print('Please choose a gamemode:');
		for (i = 0; i < multiplayermodes.length; i++) {
			Terminal.print($('<p>').html('<a href="javascript:clicked('+(i+1)+');">'+(i+1)+'. '+capitaliseFirstLetter(multiplayermodes[i])+'</a>'));
		}
	} else {
		Terminal.print('Could not find a question to answer "2" to.');
	}
};

TerminalShell.commands['3'] = function(terminal) {
	if (menu == 'wayofplaying') {
		Terminal.print('Online multiplayer selected.');
		Terminal.print('Connecting you to the server...');
		menu = false;
		prepareConnect();
	} else {
		Terminal.print('Could not find a question to answer "3" to.');
	}
}

/** PDF support needs work. Please FIXME.
TerminalShell.commands['4'] = function(terminal) {
	browser=navigator.appName
	if ((menu == 'wayofplaying') && ($.browser.name != 'msie' && $.browser.name != 'safari')) {
		gamemode=0;
		initializeEverything();
		createPDF();
		menu='wayofplaying';
		printgamemodemenu();
	} else {
		Terminal.print('Could not find a question to answer "4" to.');
	}
};
*/


TerminalShell.commands['use'] = Adventure.go = function(terminal, object) {
	// Convert objects to numbers
	objectNameToId(object);
	if (gameover == 0) {
		if (!object) {
			terminal.print('Use what?');
		} else if (objectid == 0) { // Computer
			if (roomcontainsitem[0].indexOf(playerlocation[currentplayer]) != -1) {
				using_computer=true
				if (logged_in == false) {
					if (gotlogininfo == true) {
						logged_in=true
						terminal.print('You have logged in succesfully.');
						Terminal.runCommand('use computer');					  
					} else {
						terminal.print('The computer prompts you for login information, but you don\'t know what to type in...');
					}
				} else {
					if (gamemode == "ghost") {
						gamemodeUseComputer();
					} else {
						Terminal.print('You see no use for the computer');
					}
					using_computer=false
				}
			} else {
				terminal.print('You cannot use '+object+'.');
			}
		} else if (objectid == 1) { // Note
			if (roomcontainsitem[objectid].indexOf(playerlocation[currentplayer]) != -1) {
				terminal.print('You grab the note and start reading...');
				terminal.setWorking(true);
				terminal.print('');
				setTimeout("Terminal.print('login: root '+password)", 1000);
				setTimeout("Terminal.print(''", 1500);
				setTimeout("Terminal.print('You remember this information, just in case it would be of use'", 1500);
				gotlogininfo=true;
				terminal.setWorking(false);
			} else {
				terminal.print('There is no '+roomcontainsitemname[objectid]+' here.');
			}
		} else if (objectid != -1) {
			if (roomcontainsitem[objectid].indexOf(playerlocation[currentplayer]) != -1) {
				terminal.print('You try to use the '+roomcontainsitemlongname[objectid]+', but nothing useful seems to happen.');
			} else {
				terminal.print('There is no '+roomcontainsitemname[objectid]+' here.');
			}
		} else {
			terminal.print('There is no '+object+' here.');
		}
	} else {
		terminal.print('This action cannot be executed now.');
	}
};

TerminalShell.commands['take'] = Adventure.go = function(terminal, object) {
  	if (gameover == 0) {
		objectNameToId(object)
		if (!object) {
			terminal.print('Take what?');
		} else if (objectid != -1) {
			if (roomcontainsitem[objectid].indexOf(playerlocation[currentplayer]) != -1) {
				if (inventory.length >= inventorylimit) {
					terminal.print('Your inventory is full!');
				} else {
					terminal.print(capitaliseFirstLetter(roomcontainsitemlongname[objectid])+' has been put in your inventory.');
					inventory.push(object);
					roomcontainsitem[objectid].splice(roomcontainsitem[objectid].indexOf(playerlocation[currentplayer]), 1)
					description[playerlocation[currentplayer]] = descriptionbackup[playerlocation[currentplayer]]
					description[playerlocation[currentplayer]].splice(description[playerlocation[currentplayer]].indexOf(roomcontainsitemlongname[objectid]), 1)
					i = playerlocation[currentplayer]
					createDescription(playerlocation[currentplayer]);
				}
			} else {
				terminal.print('You cannot take '+object+'.');
			}
		} else {
			terminal.print('You cannot take '+object+'.');
		}
	} else {
		terminal.print('This action cannot be executed now.');
	}
};

TerminalShell.commands['drop'] = Adventure.go = function(terminal, object) {
	if (gameover == 0) {  
		if (!object) {
			terminal.print('Drop what?');
		} else {
			objectNameToId(object)
			if ($.inArray(object, inventory) != -1) {
				objectininventory = inventory.indexOf(object)
				inventory.splice(objectininventory, 1);
				roomcontainsitem[objectid].push(playerlocation[currentplayer])
				description[playerlocation[currentplayer]] = descriptionbackup[playerlocation[currentplayer]]
				description[playerlocation[currentplayer]].push(roomcontainsitemlongname[objectid])
				i = playerlocation[currentplayer]
				createDescription(playerlocation[currentplayer])
				terminal.print('You dropped '+object+'.');
			} else {
				terminal.print('Could not find '+object+' in your inventory.');
			}
		}
	} else {
		terminal.print('This action cannot be executed now.');
	}
};

TerminalShell.commands['inventory'] = function(terminal) {
	if (gameover == 0) { 
		inventory.sort()
		inventoryoutput='Inventory: '
		for (i = 0; i < inventory.length; i++) {
			inventoryoutput=inventoryoutput+inventory[i]
			if (i+1 < inventory.length) {
				inventoryoutput=inventoryoutput+', '
			} else {
				inventoryoutput=inventoryoutput+'.'
			}
		}
		if (inventoryoutput == 'Inventory: ') {
			terminal.print('Your inventory is empty.')
		} else {
			terminal.print(inventoryoutput);
		}
	} else {
		terminal.print('This action cannot be executed now.');
	}
};

TerminalShell.commands['sleep'] = TerminalShell.commands['rest'] = function(terminal, duration) {
	if (gameover == 0) { 
		duration = Number(duration);
		if (!duration) {
			terminal.print('TIP: If you type a number behind "rest", you will rest for that many hours. If no number has been entered, you will rest for 1 hour.');
			duration = 1;
		}
		terminal.setWorking(true);
		terminal.print("You go to rest.");
		$('#screen').fadeOut(1000);
		window.setTimeout(function() {
			terminal.setWorking(false);
			$('#screen').fadeIn();
			if (time_passes == true) {
				time=time+(duration)
				if (time >= 24) {
					do
					{
					time=time-24
					}
					while (time >= 24);
				}
				if (time > 12) {
					timeinfo='\nIt is now '+(time-12)+':00PM';
				} else {
					timeinfo='\nIt is now '+time+':00AM.';
				}
			}
				terminal.print(timeinfo);
		}, 2000);
	} else {
		terminal.print('This action cannot be executed now.');
	}
};

// Code to end your turn
TerminalShell.commands['end'] = function(terminal) {
	if (gameover == 0 && wayofplaying == 2) {
		terminal.clear();
		movesdone=0
		if (currentplayer >= amountofplayers) {
			currentplayer = 1
		} else {
			currentplayer = currentplayer + 1
		}
		terminal.print('Current player: Player '+currentplayer);
		if (gamemode == "ghost") {
			gamemodeEndTurn();
		}
	} else {
		terminal.print('This action cannot be executed now.');
	}
}

TerminalShell.commands['suicide'] = function(terminal) {
	gameover = 1;
	gameresult = 'lost';
	showGameResult();
}

TerminalShell.commands['help'] = function(terminal) {
	terminal.print('There are two ways of navigation in the game. You either type commands (impossible on smartphones and tablets) or click on "links" to execute actions.');
	terminal.print('If you choose to play by clicking, the information below here is unnecessary and you already know everything needed to play. If you choose to play by typing commands, here are the most important commands:');
	terminal.print('Type "yes" or "no" to answer questions given by the system.');
	terminal.print('Type "go" to go to a direction. For example, "go west" to go west.');
	terminal.print('Type "look" to look around the environment.');
	terminal.print('Type "take" to add an item to your inventory. For example, "take crayons" to put a box of crayons in your inventory.');
	terminal.print('Type "drop" to drop an item. For example, "drop crayons" to drop a box of crayons.');
	terminal.print('Type "inventory" to check which items you have in your inventory.');
	terminal.print('Type "use" to use an object in the room. For example, type "use computer" to use a computer in the room. The "use" command is used for all kinds of interaction, so if you want to read a book write "use book" to do so.');
};
