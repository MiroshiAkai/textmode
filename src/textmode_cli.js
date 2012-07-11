function pathFilename(path) {
	var match = /\/([^\/]+)$/.exec(path);
	if (match) {
		return match[1];
	}
}

function getRandomInt(min, max) {
	// via https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Math/random#Examples
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(items) {
	return items[getRandomInt(0, items.length-1)];
}

function objectNameToId(object) {
	if (object == "computer") {
		objectid=0
	} else if (object == "crayons") {
		objectid=1
	} else if (object == "flashlight") {
		objectid=2
	} else if (object == "note") {
		objectid=3
	} else if (object == "screwdriver") {
		objectid=4
	} else if (object == "clock") {
		objectid=5
	} else if (object == "drawer") {
		objectid=6
	} else {
		objectid=-1
	}
}

// Early semi-randomization code
lockedcount=0
hallway_length=getRandomInt(1,5)
stair_location=getRandomInt(1,5)
amount_of_floors=getRandomInt(3,3)
// Indexing variables like a gentleman
amountofmoves=0
amountofroomsentered=0
time=getRandomInt(0,24)
if (time > 12) {
	timeinfo='\nIt is now '+(time-12)+':00PM';
} else {
	timeinfo='\nIt is now '+time+':00AM.';
}
destination=0
lasthallway=0
time_passes=true
logged_in=false
using_computer=false
menu=false
silent_move=false
password=getRandomInt(0,9)+''+getRandomInt(0,9)+''+getRandomInt(0,9)+''+getRandomInt(0,9)
currentfloor=1
var inventory = [];
gameresult='playing'
gameover=0
objectid=-1

// Choose random gamemode and mutator
gamemode=getRandomInt(1,1) // 1=Ghost
mutator=getRandomInt(1,1) // 1=Turn-based, 2=Realtime

// Execute gamemode-specific commands
if (gamemode == 1) {
	ghostfloor=1
	randomInt=getRandomInt(1,2)
	if (randomInt == 1) {
		ghostweakness='crayon'
	} else if (randomInt == 2) {
		ghostweakness='screwdriver'
	} else if (randomInt == 3) {
		ghostweakness='flashlight'
	}
	amountofghostmoves=0
	amountofscaressurvived=0
	ghostlocationfloor=getRandomInt(1,1)
	if (getRandomInt(1,2) == 1) {
		ghostlocationroom=getRandomInt(0,(hallway_length));
	} else {
		ghostlocationroom=getRandomInt(0,(hallway_length*2+11));
	}
	if (ghostlocationfloor == 1) {
		ghostlocation=ghostlocationroom
		if ((ghostlocation > hallway_length) && (ghostlocation <=9)) {
			ghostlocation = hallway_length
		}
	}
	if (mutator == 2) {
		// Realtime-specific code here
	}
};

//Generate rooms
var rooms1 = new Array(hallway_length*2+1);
var roomdescription = new Array(hallway_length*2+1);
var itemlocation = new Array(4);
for (i = 0; i <= 4; i++) {
	itemlocation[i] = getRandomInt(0, (hallway_length*2+1));
}
itemname = new Array(4);
itemname[0]="computer"
itemname[1]="crayons"
itemname[2]="flashlight"
itemname[3]="note"
itemname[4]="screwdriver"
var note = new Array(hallway_length*2+1);

var roomcontainsitem = new Array(6)
for (i = 0; i <=6; i++) {
	roomcontainsitem[i] = new Array
}
roomcontainsitemname = new Array(6)
roomcontainsitemlongname = new Array(6)
roomcontainsitemname[0]="computer"
roomcontainsitemlongname[0]="a computer"
roomcontainsitemname[1]="crayons"
roomcontainsitemlongname[1]="a box of crayons"
roomcontainsitemname[2]="flashlight"
roomcontainsitemlongname[2]="a flashlight"
roomcontainsitemname[3]="note"
roomcontainsitemlongname[3]="a note"
roomcontainsitemname[4]="screwdriver"
roomcontainsitemlongname[4]="a screwdriver"
roomcontainsitemname[5]="clock"
roomcontainsitemlongname[5]="a clock"
roomcontainsitemname[6]="drawer"
roomcontainsitemlongname[6]="a drawer"


for (var i = 0; i <= (hallway_length*2+1) ; i++){
	containsitem=0
	var description = new Array()
	for (var j = 0; j <= itemlocation.length; j++) {
		if (itemlocation[j] == 1) {
			containsitem=1
		}
	}
	if (getRandomInt(0,1) == 1 && containsitem != 0) {
		rooms1[i]='locked'
		lockedcount=lockedcount+1
		roomdescription[i]='The room is locked'
	} else {
		for (j = 0; j <= roomcontainsitem.length; j++) {
			if (j <= itemlocation.length) {
				if (itemlocation[j] == i) {
					roomcontainsitem[j].push(i)
					description.push(roomcontainsitemlongname[j]);
				} else if (j >= 4) {
					if (getRandomInt(0,1) == 1) {
						roomcontainsitem[j].push(i)
						description.push(roomcontainsitemlongname[j]);
					}
				}
			}
		}
		roomdescription[i] = 'You are in a room.'
		for (j = 0; j <= description.length; j++) {
			if (j == 0 && description.length >= 2) {
				roomdescription[i] = roomdescription[i] + ' The room contains '+description.shift()
			} else if (j == 0) {
				roomdescription[i] = roomdescription[i] + ' It only contains '+description.shift()+'.'
			} 
			if (j == 1 && description.length >= 3) {
				roomdescription[i] = roomdescription[i] + ', '+description.shift()
			} else if (j == 1) {
				roomdescription[i] = roomdescription[i] + ' and '+description.shift()+'.'
			}
			if (j == 2) {
				roomdescription[i] = roomdescription[i] + ', and '+description.shift()+'.'
			}
			if (j == 3 && description.length >= 5) {
				roomdescription[i] = roomdescription[i] + ' It also contains '+description.shift()
			} else if (j == 3) {
				roomdescription[i] = roomdescription[i] + ' It also contains '+description.shift()+'.'
			}
			if (j == 4 && description.length >= 6) {
				roomdescription[i] = roomdescription[i] + ', '+description.shift()
			} else if (j == 4) {
				roomdescription[i] = roomdescription[i] + ' and '+description.shift()+'.'
			}
			if (j == 5) {
				roomdescription[i] = roomdescription[i] + ' and '+description.shift()+'.'
			}
			if (j == 6 && description.length == 7) {
				roomdescription[i] = roomdescription[i] + ' You can also see '+description.shift()+'.'
			} else if (j == 6 && description.length >= 8) {
				roomdescription[i] = roomdescription[i] + ' You can also see '+description.shift()
			}
			if (j == 7) {
				for (j = 7; j <= description.length-1; j++) {
					roomdescription[i] = roomdescription[i] + ', '+description.shift()
				}
				if (j == description.length) {
					roomdescription[i] = roomdescription[i] + ' and '+description.shift()+'.'
				}
			}
		}
	}
}

Adventure = {
	rooms: {
		0:{description:'You are in a hallway.', exits:{north:1, east:11, west:10}, enter:function(terminal) {
				currentlocation=0
		}},
		1:{description:'You are in a hallway.', exits:{north:2, east:13, south:0, west:12}, enter:function(terminal) {
				currentlocation=1
		}},
		2:{description:'You are in a hallway.', exits:{north:3, east:15, south:1, west:14}, enter:function(terminal) {
				currentlocation=2
		}},
		3:{description:'You are in a hallway.', exits:{north:4, east:17, south:2, west:16}, enter:function(terminal) {
				currentlocation=3
		}},
		4:{description:'You are in a hallway.', exits:{north:5, east:19, south:3, west:18}, enter:function(terminal) {
				currentlocation=4
		}},
		5:{description:'You are in a hallway.', exits:{east:21, south:4, west:20}, enter:function(terminal) {
				currentlocation=5
		}},				
		10:{description:roomdescription[0], exits:{east:0}, enter:function(terminal) {
				currentlocation=10
				lasthallway=0
		}},
		11:{description:roomdescription[1], exits:{west:0}, enter:function(terminal) {
				currentlocation=11
				lasthallway=0
		}},
		12:{description:roomdescription[2], exits:{east:1}, enter:function(terminal) {
				currentlocation=12
				lasthallway=1
		}},
		13:{description:roomdescription[3], exits:{west:1}, enter:function(terminal) {
				currentlocation=13
				lasthallway=1
		}},
		14:{description:roomdescription[4], exits:{east:2}, enter:function(terminal) {
				currentlocation=14
				lasthallway=2
		}},
		15:{description:roomdescription[5], exits:{west:2}, enter:function(terminal) {
				currentlocation=15
				lasthallway=2
		}},
		16:{description:roomdescription[6], exits:{east:3}, enter:function(terminal) {
				currentlocation=16
				lasthallway=3
		}},
		17:{description:roomdescription[7], exits:{west:3}, enter:function(terminal) {
				currentlocation=17
				lasthallway=3
		}},
		18:{description:roomdescription[8], exits:{east:4}, enter:function(terminal) {
				currentlocation=18
				lasthallway=4
		}},
		19:{description:roomdescription[9], exits:{west:4}, enter:function(terminal) {
				currentlocation=19
				lasthallway=4
		}},
		20:{description:roomdescription[10], exits:{east:5}, enter:function(terminal) {
				currentlocation=20
				lasthallway=5
		}},
		21:{description:roomdescription[11], exits:{west:5}, enter:function(terminal) {
				currentlocation=21
				lasthallway=5
		}},
		100:{description:'You are at the top of the stairs. You can only go down here, or try to go through the door.', exits:{down:2}, enter:function(terminal) {
				currentlocation=100
		}},
		200:{description:'You are on the ground floor.', exits:{up:2, east:201}, enter:function(terminal) {
				currentlocation=200
		}},
		201:{description:'You have reached the school\'s front door.', exits:{west:200}, enter:function(terminal) {
				currentlocation=201
		}},
		202:{description:'This area has not been made yet. Sending you back to the previous area...'}, enter:function(terminal) {
				Adventure.goTo(Terminal,201);
		},
		666:{description:'You\'re dead!'},
	},
	status: {
		alive: true,
	},
	
	goTo: function(terminal, id) {
		Adventure.location = Adventure.rooms[id];
		if (Adventure.location.enter) {
			Adventure.location.enter(terminal);
		}
		Adventure.look(terminal);
		silent_move=false
		using_computer=false
		if (mutator == 1) {
			Adventure.gamemode(terminal);
		}
	}
};
currentlocation = Adventure.location = Adventure.rooms[0];

TerminalShell.commands['look'] = Adventure.look = function(terminal) {
	if (gameover == 0) {
		if (silent_move == false) {
			terminal.print(Adventure.location.description);	
			if (Adventure.location.exits) {
				terminal.print(timeinfo);
				if (currentlocation == 0) {
					var possibleDirections = ['north', 'east', 'west'];
				} else if (currentlocation >= hallway_length && currentlocation <= 9) {
					var possibleDirections = ['east', 'south', 'west'];
				} else {
					var possibleDirections = [];
					$.each(Adventure.location.exits, function(name, id) {
					possibleDirections.push(name);
					});
				}
				terminal.print('Exits: '+possibleDirections.join(', '));
				if (menu != false) {
					terminal.print('');
					if (menu == "newgame") {
						terminal.print('Would you like to start a new game?');
					}
				}
			}
		}
	} else {
		terminal.print('This action cannot be executed when the match has ended.');
	}
};

TerminalShell.commands['go'] = Adventure.go = function(terminal, direction) {
	if (gameover == 0) {
		if (Adventure.location.exits && direction in Adventure.location.exits) {
			destination=Adventure.location.exits[direction]
			if (time_passes == true) {
				random_time_passing=getRandomInt(0,5)
				if (random_time_passing==5) {
					time=time+1
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
			if (currentlocation == hallway_length) {
				if (direction == 'north') {
					terminal.print('You cannot go '+direction+'.');
				}
			}
			if (destination >= 10 && destination <= 99) {
				if (direction == 'west') {
					destination=destination-10
				} else {
					if (direction == 'east') {
						destination=destination-10
					}
				}
				if (rooms1[destination] == 'locked') {
					terminal.print('The door is locked!')
				} else {
					amountofroomsentered=amountofroomsentered+1
					amountofmoves=amountofmoves+1				
					Adventure.goTo(terminal, Adventure.location.exits[direction]);
				}
			} else {
				amountofmoves=amountofmoves+1
				Adventure.goTo(terminal, Adventure.location.exits[direction]);
			}
		} else if (!direction) {
			terminal.print('Go where?');
		} else {
			terminal.print('You cannot go '+direction+'.');
		}
	} else {
		terminal.print('This action cannot be executed when the match has ended.');
	}
};

TerminalShell.commands['yes'] = function(terminal) {
	if (!menu) {
		Terminal.print('Could not find a question to answer "yes" to.');
	} else if (menu='newgame') {
		location.reload(true);
	}
}

TerminalShell.commands['no'] = function(terminal) {
	if (!menu) {
		Terminal.print('Could not find a question to answer "no" to.');
	} else if (menu='newgame') {
		Terminal.print('No new game has been started, please refresh the page if you want to continue playing.');
	}
}

TerminalShell.commands['use'] = Adventure.go = function(terminal, object) {
	// Convert objects to numbers
	objectNameToId(object);
	if (gameover == 0) {
		objectlocation=currentlocation-10
		if (!object) {
			terminal.print('Use what?');
// 		} else if (object == "computer") {
// 			if (rooms1hascomputer[objectlocation] == 1) {
// 				using_computer=true
// 				if (logged_in == false) {
// 					terminal.print('Please login using the "login" command.');
// 				} else {
// 					if (gamemode == 1) {
// 						Terminal.setWorking(true);
// 						terminal.print('Searching for the ghost...');
// 						setTimeout("Terminal.print('You are at: Floor '+currentfloor+'.');", 2000);
// 						setTimeout("Terminal.print('The ghost is at: Floor '+ghostfloor+'.');", 2500);
// 						if (ghostlocation >= 0 && ghostlocation <= 9) {
// 							setTimeout("Terminal.print('The ghost is in the hallway.');", 3000);
// 						} else if (ghostlocation >= 10 && ghostlocation <= 99) {
// 							setTimeout("Terminal.print('The ghost is in a room.');", 3000);
// 						}
// 						setTimeout("Terminal.print('Searching for weakness...');", 3500);
// 						setTimeout("Terminal.print('The ghost can be defeated using: '+ghostweakness+'.');", 5000);
// 						setTimeout("Terminal.print('Connection closed...');", 5000);
// 						Terminal.setWorking(false);
// 						using_computer=false
// 					}
// 				}
// 			} else {
// 				terminal.print('You cannot use '+object+'.');
// 			}
// 		} else if (object == "note") {
// 			if (roomcontainsitemname
// 			terminal.print('You grab the note and start reading...');
// 			terminal.setWorking(true);
// 			terminal.print('');
// 			setTimeout("Terminal.print(note[objectlocation])", 2000);
// 			terminal.setWorking(false);
		} else if (objectid != -1) {
			if (roomcontainsitem[objectid].indexOf(objectlocation) != -1) {
				terminal.print('You try to use the '+roomcontainsitemlongname[objectid]+', but nothing useful seems to happen.');
			} else {
				terminal.print('There is no '+roomcontainsitemname[objectid]+' here.');
			}
		} else {
			terminal.print('There is no '+object+' here.');
		}
	} else {
		terminal.print('This action cannot be executed when the match has ended.');
	}
};

TerminalShell.commands['take'] = Adventure.go = function(terminal, object) {
  	if (gameover == 0) {
		objectNameToId(object)
		objectlocation=currentlocation-10
		if (!object) {
			terminal.print('Take what?');
		} else if (objectid != -1) {
			if (roomcontainsitem[objectid].indexOf(objectlocation) != -1) {
				if (gamemode == 1) { // Ghost
					if (inventory.length >= 1) {
						terminal.print('Your inventory is full!');
					} else {
						terminal.print(roomcontainsitemlongname[objectid]+' has been put in your inventory.');
						inventory.push(object);
						roomcontainsitem[objectid].splice(roomcontainsitem[objectid].indexOf(objectlocation), 1)
					}
				}
			} else {
				terminal.print('You cannot take '+object+'.');
			}
		} else {
			terminal.print('You cannot take '+object+'.');
		}
	} else {
		terminal.print('This action cannot be executed when the match has ended.');
	}
};

TerminalShell.commands['drop'] = Adventure.go = function(terminal, object) {
	if (gameover == 0) {  
		if (!object) {
			terminal.print('Drop what?');
		} else {
			objectNameToId(object)
			if ($.inArray(object, inventory) != -1) {
				objectlocation=currentlocation-10
				objectininventory = inventory.indexOf(object)
				inventory.splice(objectininventory, 1);
				roomcontainsitem[objectid].push(currentlocation-10)
				terminal.print('You dropped '+object+'.');
			} else {
				terminal.print('Could not find '+object+' in your inventory.');
			}
		}
	} else {
		terminal.print('This action cannot be executed when the match has ended.');
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
		terminal.print('This action cannot be executed when the match has ended.');
	}
};
TerminalShell.commands['inspect'] = function(terminal, object) {
	if (gameover == 0) { 
		objectlocation=currentlocation-10
		if (!object) {
			Terminal.print('Inspect what?');
		} else {
			if (currentlocation >= 0 && currentlocation <= 9) {
				if (object == "door") {
					Terminal.print('This door leads to the laboratory');
				} else if (object == "wall") {
					Terminal.print('It looks like a pretty normal concrete wall.');
				} else {
					Terminal.print('You cannot inspect '+object+'.');
				}
			} else {
				if (object == "computer") {
					if (rooms1hascomputer[objectlocation] == 1) {
						Terminal.print('It is an old computer, probably from around the 70s. It seems to be running Unix.');
					} else {
						Terminal.print('You cannot inspect '+object+'.');
					}
				} else if (object == "clock") {
					if (rooms1hasclock[objectlocation] == 1) {
						if (time_passes == false) {
							Terminal.print('The hands of the clock don\'t move, but the clock doesn\'t look like it is broken.'+timeinfo);
						} else {
							Terminal.print('You look at the clock.'+timeinfo);
						}
					} else {
						Terminal.print('You cannot inspect '+object+'.');
					}
				} else if (object == "drawer") {
					if (rooms1hasdrawer[objectlocation] == 1) {
						Terminal.print('The drawer is made of wood, and seems slightly damaged due to old age, from the looks of it. It appears to be openable.');
					} else {
						Terminal.print('You cannot inspect '+object+'.');
					}
				} else {
					Terminal.print('You cannot inspect '+object+'.');
				}
			}
		}
	} else {
		terminal.print('This action cannot be executed when the match has ended.');
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
		terminal.print('This action cannot be executed when the match has ended.');
	}
};

TerminalShell.commands['login'] = function(terminal, username, passwd) {
	if (gameover == 0) { 
		if (!using_computer) {
			terminal.print('Unrecognized command. Type "help" for assistance.');
		} else {
			if (logged_in == true) {
				terminal.print('You are already logged in!')
			} else {
				if (!username) {
					terminal.print('Usage: login username password');
				} else {
					if (username == 'root') {
						if (!passwd) {
							terminal.print('You must enter a password!');
						} else {
							if (passwd == password) {
								logged_in=true
								terminal.print('You have logged in succesfully.');
								Terminal.runCommand('use computer');
							} else {
								terminal.print('Incorrect password.');
							}
						}
					} else {
						terminal.print('Incorrect user credentials');
					}
				}
			}
		}
	} else {
		terminal.print('This action cannot be executed when the match has ended.');
	}
}

// Gamemode-specific code
Adventure.gamemode = function(terminal) {
	if (gamemode == 1) { // Ghost
		ghostmove=getRandomInt(1,10) // Decides if the Ghost moves
		if (ghostmove == 1) {
			amountofghostmoves=amountofghostmoves+1
			ghostlocationfloor=getRandomInt(1,1)
			if (getRandomInt(1,2) == 1) {
				ghostlocationroom=getRandomInt(0, hallway_length);
			} else {
				ghostlocationroom=getRandomInt(0, (hallway_length*2+11));
			}
			if (ghostlocationfloor == 1) {
				ghostlocation=ghostlocationroom
				if ((ghostlocation > hallway_length) && (ghostlocation <=9)) {
					ghostlocation = hallway_length
				}
			}
		}
		if (currentlocation == ghostlocation) {
			if ($.inArray(ghostweakness, inventory) != -1) {
				terminal.print('You use the '+ghostweakness+' in your inventory on the ghost.');
				terminal.print('The ghost makes a terrible noise and disappears.');
				terminal.print('You win!');
				gameresult='won'
				gameover=1
			} else {
				if ((getRandomInt(0,1) == 1)) {
					terminal.print('The ghost got you! GAME OVER!');
					gameresult='lost'
					gameover=1
				} else {
					terminal.print('BOO!');
					shake($('#screen'));
					amountofscaressurvived=amountofscaressurvived+1
					amountofghostmoves=amountofghostmoves+1
					ghostlocationfloor=getRandomInt(1,1)
					if (getRandomInt(1,2) == 1) {
						ghostlocationroom=getRandomInt(0, hallway_length);
					} else {
						ghostlocationroom=getRandomInt(0,(hallway_length*2+11))
					}
					if (ghostlocationfloor == 1) {
						ghostlocation=ghostlocationroom
						if ((ghostlocation > hallway_length) && (ghostlocation <=9)) {
							ghostlocation = hallway_length
						}
					}
				}
			}
		} else {
			if (getRandomInt(1,20) == 1) {
				terminal.print('You feel a cold shiver...');
			}
			// Debug
			// terminal.print('You are at '+currentlocation+'. The ghost is at '+ghostlocation+'.');
		}
	}
	if ((gameresult=='won') || (gameresult=='lost')) {
		Adventure.gameresult(terminal);
	}
};

Adventure.gameresult = function(terminal) {
	if (gamemode == 1) {
		terminal.print('');
		terminal.print('=== Game Statistics ===');
		terminal.print('Gamemode: Ghost');
		if (mutator == 1) {
			terminal.print('Mutator: Turn-based');
		} else if (mutator == 2) {
			terminal.print('Mutator: Realtime');
		} else {
			terminal.print('Mutator: Unknown');
		}
		terminal.print('Amount of moves: '+amountofmoves+'.');
		terminal.print('Amount of ghost moves: '+amountofghostmoves+'.');
		terminal.print('Amount of scares survived: '+amountofscaressurvived+'.');
		terminal.print('Amount of rooms entered: '+amountofroomsentered+'.');
		terminal.print('Playtime: '+playtime+' seconds.');
		terminal.print('');
		if (gameresult == 'lost') {
			terminal.print('The game was LOST');
		} else if (gameresult == 'won') {
			terminal.print('The game was WON');
		} else {
			terminal.print('The game ended with an undefined status (neither won nor lost)');
		}
	}
	menu='newgame'
	terminal.print('Do you want to start a new game? (yes/no)');
};

// No peeking!
TerminalShell.commands['help'] = function(terminal) {
	terminal.print('Type "yes" or "no" to answer questions given by the system.');
	terminal.print('Type "go" to go to a direction. For example, "go west" to go west.');
	terminal.print('Type "look" to look around the environment.');
	terminal.print('Type "take" to add an item to your inventory. For example, "take crayon" to put a crayon in your inventory.');
	terminal.print('Type "use" to use an object in the room. For example, type "use computer" to use a computer in the room. The "use" command is used for all kinds of interaction, so if you want to read a book write "use book" to do so.');
}; 

function shake(elems) {
	elems.css('position', 'relative');
	for (var i = 0; i <= 100; i++) {
		return window.setTimeout(function() {
			elems.css({top:getRandomInt(-3, 3), left:getRandomInt(-3, 3)});
		}, 100);
	}
}

$(document).ready(function() {
	Terminal.promptActive = false;
	function noData() {
		Terminal.print($('<p>').addClass('error').text('Unable to load startup data. :-('));
		Terminal.promptActive = true;
	}
	$('#screen').bind('cli-load', function(e) {
		$('#screen').one('cli-ready', function(e) {
		});
			currentlocation=0
			Terminal.print('Welcome to Textmode');
			Terminal.print($('<p>').html('Programmed and storyboard by <a href="https://github.com/TheLastProject">TheLastProject</a>'));
			Terminal.print($('<p>').html('Based on the <a href="https://github.com/chromakode/xkcdfools">xkcdfools</a> codebase.'));
			Terminal.print($('<p>').html('Source code is available on <a href="https://github.com/TheLastProject/textmode">github</a>.'));
			Terminal.print('');
			Terminal.print('Type "help" for instructions on how to play.');
			Terminal.print('');
			setTimeout("Terminal.print('=== Game Start ===');", 500);
			if (gamemode == 1) {
				setTimeout("Terminal.print('=== Gamemode: GHOST ===');", 1000);
				if (mutator == 1) {
					setTimeout("Terminal.print('=== Mutator: Turn-based ===');", 1500);
				} else if (mutator == 2) {
					setTimeout("Terminal.print('=== Mutator: Realtime ===');", 1500);
				} else {
					setTimeout("Terminal.print('ERROR REQUESTING MUTATOR STATUS');", 1500);
				}
				setTimeout("Terminal.print('=== Winning condition: Meet the ghost while carrying the item which is his weakness ===');", 2000);
				setTimeout("Terminal.print('=== Losing condition: Meet the ghost without carrying the required item ===');", 2500);
				setTimeout("Terminal.print('=== Helpful object(s): Computer, Note ===');", 3000);
			} else {
				setTimeout("Terminal.print('Critical error, please refresh the page...');", 1000);
			}
			setTimeout("Terminal.print('');", 3000);
			setTimeout("Terminal.runCommand('look');", 3500);
			// Initialize timer
			playtime=0
			setInterval("playtime=playtime+1", 1000);
		}, noData);
});
