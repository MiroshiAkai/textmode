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

function createDescription(currentlocation) {
	descriptionbackup[i] = description[i].slice(0, description[i].length);
	if (i >= 0 && i <= 9) { // Generate hallway
		roomdescription[i] = 'You are in a hallway.'
		if (lightstatus[i] != 1) {
			roomdescription[i] = roomdescription[i] + ' The fluorescent lamp shines brightly.'
		} else if (lightstatus[i] == 1) {
			roomdescription[i] = roomdescription[i] + ' The fluorescent lamp flickers.'
		}
	} else {
		roomdescription[i] = 'You are in a room.'
	}
	for (j = 0; j <= description[i].length; j++) {
		if (j == 0 && description[i].length >= 2) {
			roomdescription[i] = roomdescription[i] + ' The room contains '+description[i].shift()
		} else if (j == 0 && description[i].length >= 1) {
			roomdescription[i] = roomdescription[i] + ' It only contains '+description[i].shift()+'.'
		} else if (j == 0 && i >= 10) {
			roomdescription[i] = roomdescription[i] + ' It is empty.'
		}
		if (j == 1 && description[i].length >= 3) {
			roomdescription[i] = roomdescription[i] + ', '+description[i].shift()
		} else if (j == 1) {
			roomdescription[i] = roomdescription[i] + ' and '+description[i].shift()+'.'
		}
		if (j == 2) {
			roomdescription[i] = roomdescription[i] + ', and '+description[i].shift()+'.'
		}
		if (j == 3 && description[i].length >= 5) {
			roomdescription[i] = roomdescription[i] + ' It also contains '+description[i].shift()
		} else if (j == 3) {
			roomdescription[i] = roomdescription[i] + ' It also contains '+description[i].shift()+'.'
		}
		if (j == 4 && description[i].length >= 6) {
			roomdescription[i] = roomdescription[i] + ', '+description[i].shift()
		} else if (j == 4) {
			roomdescription[i] = roomdescription[i] + ' and '+description[i].shift()+'.'
		}
		if (j == 5) {
			roomdescription[i] = roomdescription[i] + ' and '+description[i].shift()+'.'
		}
		if (j == 6 && description[i].length == 7) {
			roomdescription[i] = roomdescription[i] + ' You can also see '+description[i].shift()+'.'
		} else if (j == 6 && description[i].length >= 8) {
			roomdescription[i] = roomdescription[i] + ' You can also see '+description[i].shift()
		}
		if (j == 7) {
			for (j = 7; j <= description[i].length-1; j++) {
				roomdescription[i] = roomdescription[i] + ', '+description[i].shift()
			}
			if (j == description[i].length) {
				roomdescription[i] = roomdescription[i] + ' and '+description[i].shift()+'.'
			}
		}
	}
}

// Early semi-randomization code
lockedcount=0
hallway_length=getRandomInt(9,9)
if (hallway_length == 1) {
	length=13
} else if (hallway_length == 2) {
	length=15
} else if (hallway_length == 3) {
	length=17
} else if (hallway_length == 4) {
	length=19
} else if (hallway_length == 5) {
	length=21
} else if (hallway_length == 6) {
	length=23
} else if (hallway_length == 7) {
	length=25
} else if (hallway_length == 8) {
	length=27
} else if (hallway_length == 9) {
	length=29
} else if (hallway_length == 10) {
	length=31
}
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
gameover=1
objectid=-1
mutator=1

// Execute gamemode-specific commands
function initializeGamemode() {
	if (gamemode == 1) {
		ghostfloor=1
		randomInt=getRandomInt(1,3)
		if (randomInt == 1) {
			ghostweakness='crayons'
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
			ghostlocationroom=getRandomInt(0,(length));
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
		Terminal.print('=== Gamemode: GHOST ===');
		if (mutator == 1) {
			setTimeout("Terminal.print('=== Mutator: Turn-based ===');", 500);
		} else if (mutator == 2) {
			setTimeout("Terminal.print('=== Mutator: Realtime ===');", 500);
		} else {
			setTimeout("Terminal.print('ERROR REQUESTING MUTATOR STATUS');", 500);
		}
		setTimeout("Terminal.print('=== Winning condition: Meet the ghost while carrying the item which is his weakness ===');", 1000);
		setTimeout("Terminal.print('=== Losing condition: Meet the ghost without carrying the required item ===');", 1500);
		setTimeout("Terminal.print('=== Helpful object(s): Computer, Note ===');", 2000);
	}
	timer();
}

//Generate rooms
var rooms1 = new Array(length);
var roomdescription = new Array(length);
var lightstatus = new Array(length);
var itemlocation = new Array(5);
for (i = 0; i <= 5; i++) {
	itemlocation[i] = getRandomInt(10, (length));
}
itemname = new Array(5);
itemname[0]="computer"
itemname[1]="crayons"
itemname[2]="flashlight"
itemname[3]="note"
itemname[4]="screwdriver"
var note = new Array(length);

var roomcontainsitem = new Array(7)
for (i = 0; i <=7; i++) {
	roomcontainsitem[i] = new Array
}
roomcontainsitemname = new Array(7)
roomcontainsitemlongname = new Array(7)
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

var description = new Array()
var descriptionbackup = new Array()
for (var i = 0; i <= (length) ; i++){
	description[i] = new Array()
	descriptionbackup[i] = new Array()
	if (i >= 0 && i <= 9) { // Generate hallway
		lightstatus[i] = getRandomInt(1, 3)
	} else { // Generate rooms
		containsitem=0
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
						description[i].push(roomcontainsitemlongname[j]);
					} else if (j >= 5) {
						if (getRandomInt(0,1) == 1) {
							roomcontainsitem[j].push(i)
							description[i].push(roomcontainsitemlongname[j]);
						}
					}
				}
			}
		}
	}
	createDescription(i)
}

Adventure = {
	rooms: {
		0:{description:roomdescription[0], exits:{north:1, east:11, west:10}, enter:function(terminal) {
				currentlocation=0
		}},
		1:{description:roomdescription[1], exits:{north:2, east:13, south:0, west:12}, enter:function(terminal) {
				currentlocation=1
		}},
		2:{description:roomdescription[2], exits:{north:3, east:15, south:1, west:14}, enter:function(terminal) {
				currentlocation=2
		}},
		3:{description:roomdescription[3], exits:{north:4, east:17, south:2, west:16}, enter:function(terminal) {
				currentlocation=3
		}},
		4:{description:roomdescription[4], exits:{north:5, east:19, south:3, west:18}, enter:function(terminal) {
				currentlocation=4
		}},
		5:{description:roomdescription[5], exits:{north:6, east:21, south:4, west:20}, enter:function(terminal) {
				currentlocation=5
		}},	
		6:{description:roomdescription[6], exits:{north:7, east:23, south:5, west:22}, enter:function(terminal) {
				currentlocation=6
		}},
		7:{description:roomdescription[7], exits:{north:8, east:25, south:6, west:24}, enter:function(terminal) {
				currentlocation=7
		}},
		8:{description:roomdescription[8], exits:{north:9, east:27, south:7, west:26}, enter:function(terminal) {
				currentlocation=8
		}},
		9:{description:roomdescription[9], exits:{east:29, south:8, west:28}, enter:function(terminal) {
				currentlocation=9
		}},	
		10:{description:roomdescription[10], exits:{east:0}, enter:function(terminal) {
				currentlocation=10
				lasthallway=0
		}},
		11:{description:roomdescription[11], exits:{west:0}, enter:function(terminal) {
				currentlocation=11
				lasthallway=0
		}},
		12:{description:roomdescription[12], exits:{east:1}, enter:function(terminal) {
				currentlocation=12
				lasthallway=1
		}},
		13:{description:roomdescription[13], exits:{west:1}, enter:function(terminal) {
				currentlocation=13
				lasthallway=1
		}},
		14:{description:roomdescription[14], exits:{east:2}, enter:function(terminal) {
				currentlocation=14
				lasthallway=2
		}},
		15:{description:roomdescription[15], exits:{west:2}, enter:function(terminal) {
				currentlocation=15
				lasthallway=2
		}},
		16:{description:roomdescription[16], exits:{east:3}, enter:function(terminal) {
				currentlocation=16
				lasthallway=3
		}},
		17:{description:roomdescription[17], exits:{west:3}, enter:function(terminal) {
				currentlocation=17
				lasthallway=3
		}},
		18:{description:roomdescription[18], exits:{east:4}, enter:function(terminal) {
				currentlocation=18
				lasthallway=4
		}},
		19:{description:roomdescription[19], exits:{west:4}, enter:function(terminal) {
				currentlocation=19
				lasthallway=4
		}},
		20:{description:roomdescription[20], exits:{east:5}, enter:function(terminal) {
				currentlocation=20
				lasthallway=5
		}},
		21:{description:roomdescription[21], exits:{west:5}, enter:function(terminal) {
				currentlocation=21
				lasthallway=5
		}},
		22:{description:roomdescription[22], exits:{east:6}, enter:function(terminal) {
				currentlocation=22
				lasthallway=6
		}},
		23:{description:roomdescription[23], exits:{west:6}, enter:function(terminal) {
				currentlocation=23
				lasthallway=6
		}},
		24:{description:roomdescription[24], exits:{east:7}, enter:function(terminal) {
				currentlocation=24
				lasthallway=7
		}},
		25:{description:roomdescription[25], exits:{west:7}, enter:function(terminal) {
				currentlocation=25
				lasthallway=7
		}},
		26:{description:roomdescription[26], exits:{east:8}, enter:function(terminal) {
				currentlocation=26
				lasthallway=8
		}},
		27:{description:roomdescription[27], exits:{west:8}, enter:function(terminal) {
				currentlocation=27
				lasthallway=8
		}},
		28:{description:roomdescription[28], exits:{east:9}, enter:function(terminal) {
				currentlocation=28
				lasthallway=9
		}},
		29:{description:roomdescription[29], exits:{west:9}, enter:function(terminal) {
				currentlocation=29
				lasthallway=9
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
			terminal.print(roomdescription[currentlocation]);	
			if (Adventure.location.exits) {
				if (gamemode == 2) {
					terminal.print(timeinfo);
				} else {
					terminal.print('');
				}
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
		if (lightstatus[currentlocation] == 1) {
			flicker($('#screen'));
		}
	} else {
		terminal.print('This action cannot be executed now.');
	}
};

TerminalShell.commands['debug'] = function(terminal) {
	terminal.print('currentlocation = '+currentlocation);
	terminal.print('ghostlocation = '+ghostlocation);
	terminal.print('hallway_length = '+hallway_length);
	terminal.print('length = '+length);
	for (i = 0; i <= itemname.length ; i++) {
		terminal.print(itemname[i]+' = '+itemlocation[i]);
	}
}

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
			if (destination >= 10 && destination <= 99 && currentlocation != hallway_length) {
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
		terminal.print('This action cannot be executed now.');
	}
};

TerminalShell.commands['yes'] = function(terminal) {
	if (menu == 'newgame') {
		location.reload(true);
	} else {
		Terminal.print('Could not find a question to answer "yes" to.');
	}
}

TerminalShell.commands['no'] = function(terminal) {
	if (menu == 'newgame') {
		Terminal.print('No new game has been started, please refresh the page if you want to continue playing.');
	} else {
		Terminal.print('Could not find a question to answer "no" to.');
	}
}

TerminalShell.commands['1'] = function(terminal) {
	if (menu == 'wayofplaying') {
		Terminal.print('Singleplayer selected.');
		menu='gamemode'
		Terminal.print('Please choose a gamemode:');
		Terminal.print('1. Ghost');
	} else if (menu == 'gamemode') {
		gamemode=1 // Ghost Mode
		gameover=0
		initializeGamemode();
	} else {
		Terminal.print('Could not find a question to answer "1" to.');
	}
}

TerminalShell.commands['2'] = function(terminal) {
	if (menu == 'wayofplaying') {
		Terminal.print('No gamemodes are available yet for local multiplayer. Please choose another way of playing.');
	} else {
		Terminal.print('Could not find a question to answer "2" to.');
	}
}

TerminalShell.commands['3'] = function(terminal) {
	if (menu == 'wayofplaying') {
		browser=navigator.appName
		if ($.browser.name == 'msie') {
			Terminal.print($('<p>').html('Ugh, Internet Explorer... Generating work-around. As you are waiting, may I refer you to <a href="http://www.abetterbrowser.org/>A Better Browser</a>?'));
			menu='offlineconfirm'
		} else if ($.browser.name == 'firefox' && ($.os.name == 'win' || $.os.name == 'Windows')) {
			Terminal.print('Firefox on Windows only works with a PDF Reader plugin. Please ensure you have one installed and type "continue" to continue.');
			menu='offlineconfirm'
		} else {
			createPDF();
		}
	} else {
		Terminal.print('Could not find a question to answer "3" to.');
	}
}

TerminalShell.commands['continue'] = function(terminal) {
	if (menu == 'offlineconfirm') {
		createPDF();
		menu='';
	} else {
		Terminal.print('Could not find a question to answer "ok" to.');
	}
}

TerminalShell.commands['use'] = Adventure.go = function(terminal, object) {
	// Convert objects to numbers
	objectNameToId(object);
	if (gameover == 0) {
		if (!object) {
			terminal.print('Use what?');
		} else if (objectid == 0) { // Computer
			if (roomcontainsitem[0].indexOf(currentlocation) != -1) {
				using_computer=true
				if (logged_in == false) {
					terminal.print('Please login using the "login" command.');
				} else {
					if (gamemode == 1) {
						Terminal.setWorking(true);
						terminal.print('Searching for the ghost...');
						setTimeout("Terminal.print('You are at: Floor '+currentfloor+'.');", 2000);
						setTimeout("Terminal.print('The ghost is at: Floor '+ghostfloor+'.');", 2500);
						if (ghostlocation >= 0 && ghostlocation <= 9) {
							setTimeout("Terminal.print('The ghost is in the hallway.');", 3000);
						} else if (ghostlocation >= 10 && ghostlocation <= 99) {
							setTimeout("Terminal.print('The ghost is in a room.');", 3000);
						}
						setTimeout("Terminal.print('Searching for weakness...');", 3500);
						setTimeout("Terminal.print('The ghost can be defeated using: '+ghostweakness+'.');", 5000);
						setTimeout("Terminal.print('Connection lost...');", 5000);
						Terminal.setWorking(false);
						using_computer=false
					}
				}
			} else {
				terminal.print('You cannot use '+object+'.');
			}
		} else if (objectid == 3) { // Note
			if (roomcontainsitem[objectid].indexOf(currentlocation) != -1) {
				terminal.print('You grab the note and start reading...');
				terminal.setWorking(true);
				terminal.print('');
				setTimeout("Terminal.print('login: root '+password)", 2000);
				terminal.setWorking(false);
			} else {
				terminal.print('There is no '+roomcontainsitemname[objectid]+' here.');
			}
		} else if (objectid != -1) {
			if (roomcontainsitem[objectid].indexOf(currentlocation) != -1) {
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
			if (roomcontainsitem[objectid].indexOf(currentlocation) != -1) {
				if (gamemode == 1) { // Ghost
					if (inventory.length >= 1) {
						terminal.print('Your inventory is full!');
					} else {
						terminal.print(roomcontainsitemlongname[objectid]+' has been put in your inventory.');
						inventory.push(object);
						roomcontainsitem[objectid].splice(roomcontainsitem[objectid].indexOf(currentlocation), 1)
						description[currentlocation] = descriptionbackup[currentlocation]
						description[currentlocation].splice(description[currentlocation].indexOf(roomcontainsitemlongname[objectid]), 1)
						i = currentlocation
						createDescription(currentlocation);
					}
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
				roomcontainsitem[objectid].push(currentlocation)
				description[currentlocation] = descriptionbackup[currentlocation]
				description[currentlocation].push(roomcontainsitemlongname[objectid])
				i = currentlocation
				createDescription(currentlocation)
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
TerminalShell.commands['inspect'] = function(terminal, object) {
	if (gameover == 0) { 
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
					if (rooms1hascomputer[currentlocation] == 1) {
						Terminal.print('It is an old computer, probably from around the 70s. It seems to be running Unix.');
					} else {
						Terminal.print('You cannot inspect '+object+'.');
					}
				} else if (object == "clock") {
					if (rooms1hasclock[currentlocation] == 1) {
						if (time_passes == false) {
							Terminal.print('The hands of the clock don\'t move, but the clock doesn\'t look like it is broken.'+timeinfo);
						} else {
							Terminal.print('You look at the clock.'+timeinfo);
						}
					} else {
						Terminal.print('You cannot inspect '+object+'.');
					}
				} else if (object == "drawer") {
					if (rooms1hasdrawer[currentlocation] == 1) {
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
		terminal.print('This action cannot be executed now.');
	}
}

// Gamemode-specific code
Adventure.gamemode = function(terminal) {
	if (gamemode == 1) { // Ghost
		ghostmove=getRandomInt(1,10) // Decides if the Ghost moves
		if (ghostmove == 1) {
			amountofghostmoves=amountofghostmoves+1
			ghostlocationfloor=getRandomInt(1,1)
			ghostlocationroom=getRandomInt(0, (length));
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
						ghostlocationroom=getRandomInt(0,(length))
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

function flicker(elems) {
	for (var i = 0; i <= 10000; i++) {
		return window.setTimeout(function() {
			body.style.visibility="hidden";
		}, 100);
	}
}

// Offline PDF gameplay is cool
function createPDF() {
	Terminal.print('Creating PDF file for offline play...');
	pages=1
	output=0
	distance=0
	var doc = new jsPDF();
	doc.setFontSize(12);
	for (i = 0; i <= length; i++) {
		if (i <= hallway_length || i >= 10) {
			if (output >= 19*pages) {
				doc.addPage();
				pages++
				distance=distance-19
			}
			Adventure.location = Adventure.rooms[i]
			doc.text(20, 20+15*distance, i+'. '+roomdescription[i]);
			if (i == 0) {
				var possibleDirections = [];
				possibleDirections.push('north: '+Adventure.location.exits['north']);
				possibleDirections.push('east: '+Adventure.location.exits['east']);
				possibleDirections.push('west: '+Adventure.location.exits['west']);
			} else if (i >= hallway_length && i <= 9) {
				var possibleDirections = [];
				possibleDirections.push('east: '+Adventure.location.exits['east']);
				possibleDirections.push('south: '+Adventure.location.exits['south']);
				possibleDirections.push('west: '+Adventure.location.exits['west']);
			} else {
				var possibleDirections = [];
				$.each(Adventure.location.exits, function(name, id) {
				possibleDirections.push(name+': '+Adventure.location.exits[name]);
				});
			}
			doc.text(20, 25+15*distance, '     Exits: '+possibleDirections.join(', '));
			output++
			distance++
		}
	}
	// Output as Data URI
	doc.output('datauri');
	Terminal.print('Done!');
}

function timer() {
	playtime=0
	setInterval("playtime=playtime+1", 1000);
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
			Terminal.print($('<p>').html('Textmode version 20120715, Copyright (c) 2012 <a href="https://github.com/TheLastProject">Ruben van Os</a>'));
			Terminal.print($('<p>').html('Textmode comes with ABSOLUTELY NO WARRANTY; for details <a href="https://raw.github.com/TheLastProject/textmode/master/LICENSE">click here</a>.'));
			Terminal.print($('<p>').html('This is free software, and you are welcome to redistribute it under certain conditions; <a href="https://raw.github.com/TheLastProject/textmode/master/LICENSE">click here</a> for details or <a href="https://github.com/TheLastProject/textmode">click here</a> for the source code to this project.'));
			Terminal.print('');
			Terminal.print('Type "help" for instructions on how to play.');
			Terminal.print('');
			menu='wayofplaying'
			Terminal.print('Please choose a way of playing (answer by typing the number, followed by enter):');
			Terminal.print('1. Singleplayer');
			Terminal.print('2. Local multiplayer');
			Terminal.print('3. Offline');
			Terminal.promptActive = true;
		}, noData);
});
