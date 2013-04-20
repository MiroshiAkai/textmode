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

TerminalShell.commands['look'] = function(terminal) {
	if (gameover == 0) {
		if (silent_move == false) {
			if (wayofplaying == 2) {
				Terminal.print($('<p>').html('<a href="javascript:clicked(\'end\');">End turn</a>'));
			};
			if (inventory.length > 0) {
				inventorylist = 'Inventory: ';
				for (var i = 0; i < inventory.length; i++) {
					inventorylist = inventorylist + '<a href="javascript:clicked(\'drop '+inventory[i]+'\');">'+inventory[i]+'</a>.';
				};
				Terminal.print($('<p>').html(inventorylist));
			};
			createDescription();
			var possibleDirections = room[playerlocation[currentplayer]]["exit"];
			var possibleDirections2 = possibleDirections;
			if (gamemode == 2) {
				terminal.print(timeinfo);
			} else {
				terminal.print('');
			};
			exitslist = 'Exits: '
			for (var i = 0; i < room[playerlocation[currentplayer]]["exit"].length; i++) {
				direction = room[playerlocation[currentplayer]]["exit"][i];
				exitslist = exitslist + '<a href="javascript:clicked(\'go '+direction+'\');">'+direction+'</a>' + '          ';
			};
			Terminal.print($('<p>').html(exitslist));
			if (menu != false) {
				terminal.print('');
				if (menu == "newgame") {
					terminal.print('Would you like to start a new game?');
					Terminal.print($('<p>').html('<a href="javascript:clicked(\'yes\');">Yes</a> or <a href="javascript:clicked(\'no\');">No</a>'));
				};
			};
		};
	} else {
		terminal.print('This action cannot be executed now.');
	}
};

TerminalShell.commands['debug'] = function(terminal) {
	terminal.print('currentplayer = '+currentplayer);
	for (var i=1; i<=amountofplayers; i++) {
		terminal.print('playerlocation['+i+'] = '+playerlocation[i]);
	}
	terminal.print('hallway_length = '+hallway_length);
	terminal.print('amount_of_floors = '+amount_of_floors);
	terminal.print('roomAmount = '+roomAmount);
	for (var i = 0; i <= itemname.length ; i++) {
		terminal.print(itemname[i]+' = '+itemlocation[i]);
	}
};

TerminalShell.commands['n'] = function(terminal) { // Move north
	Terminal.runCommand('go north');
};

TerminalShell.commands['e'] = function(terminal) { // Move east
	Terminal.runCommand('go east');
};

TerminalShell.commands['s'] = function(terminal) { // Move south
	Terminal.runCommand('go south');
};

TerminalShell.commands['w'] = function(terminal) { // Move west
	Terminal.runCommand('go west');
};

TerminalShell.commands['u'] = function(terminal) { // Go up
	Terminal.runCommand('go up');
};

TerminalShell.commands['d'] = function(terminal) { // Go down
	Terminal.runCommand('go down');
};

TerminalShell.commands['go'] = function(terminal, direction) {
	if (gameover == 0) {
		if (wayofplaying != 2 || movesdone == 0) {
			if (room[playerlocation[currentplayer]]["exit"].indexOf(direction) != -1) {
				var directionY = room[playerlocation[currentplayer]]["y"];
				var directionX = room[playerlocation[currentplayer]]["x"];
				var directionFloor = room[playerlocation[currentplayer]]["floor"];
				switch (direction) {
					case "north": directionY++; break;
					case "east": directionX++; break;
					case "south": directionY--; break;
					case "west": directionX--; break;
					case "up": directionFloor++; break;
					case "down": directionFloor--; break;
					default: Terminal.print('ERROR THIS SHOULD NEVER HAPPEN');
				};
				for (var i = 0; i < 100; i++) {
					if ((room[i]["x"] == directionX) && (room[i]["y"] == directionY) && (room[i]["floor"] == directionFloor)) {
						window.playerlocation[currentplayer] = i;
						break;
					};
				};
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
				amountofroomsentered++
				amountofmoves++			
			} else if (!direction) {
				terminal.print('Go where?');
			} else {
				terminal.print('You cannot go '+direction+'.');
			}
			Terminal.runCommand('look');
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
		for (var i = 0; i < singleplayermodes.length; i++) {
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
		for (var i = 0; i < multiplayermodes.length; i++) {
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


TerminalShell.commands['use'] = function(terminal, object) {
	if (gameover == 0) {
		if (!object) {
			terminal.print('Use what?');
		} else {
			var objectid = objectNameToId(object);
			if (room[playerlocation[currentplayer]]["items"].indexOf(object) != -1) {
				if (object == "computer") {
					using_computer=true
					if (logged_in == false) {
						if (gotlogininfo == true) {
							logged_in=true
							terminal.print('You have logged in succesfully.');
							Terminal.runCommand('use computer');					  
						} else {
							terminal.print('The computer prompts you for login information, but you don\'t know what to type in...');
						};
					} else {
						if (gamemode == "ghost") {
							gamemodeUseComputer();
						} else {
							Terminal.print('You see no use for the computer');
						};
						using_computer=false
					};
				} else if (object == "note") { // Note
					terminal.print('You grab the note and start reading...');
					terminal.setWorking(true);
					terminal.print('');
					setTimeout("Terminal.print('login: root '+password)", 1000);
					setTimeout("Terminal.print('')", 1500);
					setTimeout("Terminal.print('You remember this information, just in case it would be of use')", 1500);
					gotlogininfo=true;
					terminal.setWorking(false);
				} else { // No really useful item
					Terminal.print('You try to use '+items[objectid]["longname"]+', but nothing useful seems to happen.');
				};
			} else {
				terminal.print('There is no '+object+' here.');
			};
		};
	} else {
		terminal.print('This action cannot be executed now.');
	};
};

TerminalShell.commands['take'] = function(terminal, object) {
  	if (gameover == 0) {
		if (!object) {
			terminal.print('Take what?');
		} else {
			var objectid = objectNameToId(object);
			if (room[playerlocation[currentplayer]]["items"].indexOf(object) != -1) {
				if (inventory.length >= inventorylimit) {
					terminal.print('Your inventory is full!');
				} else {
					terminal.print(capitaliseFirstLetter(items[objectid]["longname"])+' has been put in your inventory.');
					inventory.push(object);
					room[playerlocation[currentplayer]]["items"].splice(room[playerlocation[currentplayer]]["items"].indexOf(object), 1)
				};
			} else {
				terminal.print('You cannot take '+object+'.');
			};
		};
	} else {
		terminal.print('This action cannot be executed now.');
	};
};

TerminalShell.commands['drop'] = function(terminal, object) {
	if (gameover == 0) {  
		if (!object) {
			terminal.print('Drop what?');
		} else {
			var objectid = objectNameToId(object)
			if (inventory.indexOf(object) != -1) {
				objectininventory = inventory.indexOf(object)
				inventory.splice(objectininventory, 1);
				room[playerlocation[currentplayer]]["items"].push(object);
				terminal.print('You dropped '+items[objectid]["longname"]+'.');
			} else {
				terminal.print('Could not find '+object+' in your inventory.');
			};
		};
	} else {
		terminal.print('This action cannot be executed now.');
	};
};

TerminalShell.commands['inventory'] = function(terminal) {
	if (gameover == 0) { 
		inventory.sort()
		inventoryoutput='Inventory: '
		for (var i = 0; i < inventory.length; i++) {
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

TerminalShell.commands['help'] = function(terminal, subject) {
	if (subject === undefined) {
		Terminal.print('Please choose a help subject:');
		Terminal.print($('<p>').html('<a href=javascript:clicked(\'help basic\');">Basic</a>'));
		Terminal.print($('<p>').html('<a href=javascript:clicked(\'help gameplay\');">Gameplay</a>'));
		Terminal.print($('<p>').html('<a href=javascript:clicked(\'multiplayer\');">Multiplayer</a>'));
	} else if (subject == 'basic') {
		Terminal.print('Textmode is a reimagination of the text adventure game genre, which focuses on shorter games which are randomly generated and can be played online.');
		Terminal.print('The idea behind this is to make the text adventure genre more accessible to those who have no or little experience, and redefining the genre for those who do.');
		Terminal.print('To play textmode, just choose a way of playing and a gamemode. If you need more help, feel free to use the help menu.');
		Terminal.print('Textmode is written by Ruben van Os');
	} else if (subject == 'gameplay') {
		Terminal.print('Each gamemode has their own gameplay. To find out how it is played, just look at the information a gamemode gives you when the game starts.');
		Terminal.print('However, there are obviously things which are the same in all cases.');
		Terminal.print('For starters, each gamemode has a winning and losing condition. If you reach the winning condition, you win and reaching the losing condition causes you to lose. Simple enough.');
		Terminal.print('There are two ways of playing Textmode. You either type commands (which is only possible on devices with a hardware keyboard which correctly detect our input method) or click on "links" to execute actions.');
		Terminal.print('If you choose to play by clicking, you already know everything needed to play the game. Just look for bold text to click!');
		Terminal.print('If you choose to play by typing commands, please type "help commands" to get a list of commands.');
		Terminal.print('Please note that you are not required to stick with one input style. You can mix and match as much as you want.');
	} else if (subject == 'commands') {
		Terminal.print('Gameplay commands:');
		Terminal.print('yes / no: Answers a question asked by the game.');
		Terminal.print('go: Allows you to move into a direction. Example: "go west". Can also be shortened by the first letter of the direction. Example: "n" to go north.');
		Terminal.print('look: Gives a description of the room.');
		Terminal.print('take: Adds an item to your inventory. Example: "take crayons".');
		Terminal.print('drop: Drops an item. Example: "drop screwdriver".');
		Terminal.print('inventory: Lists items in inventory.');
		Terminal.print('use: Interacts with an object. Example: "use note".');
	};
};
