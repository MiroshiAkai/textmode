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
time_passes=true
logged_in=false
using_computer=false
menu=false
silent_move=false
password=getRandomInt(0,9)+''+getRandomInt(0,9)+''+getRandomInt(0,9)+''+getRandomInt(0,9)
currentfloor=1
var inventory = [];
gameresult='playing'

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
var rooms1description = new Array(hallway_length*2+1);
var computerlocation = getRandomInt(0, (hallway_length*2+1));
var crayonlocation = getRandomInt(0, (hallway_length*2+1));
var flashlightlocation = getRandomInt(0, (hallway_length*2+1));
var notelocation = getRandomInt(0, (hallway_length*2+1));
var note = new Array(hallway_length*2+1);
var screwdriverlocation = getRandomInt(0, (hallway_length*2+1));

var rooms1hasclock = new Array(hallway_length*2+1);
var rooms1hascomputer = new Array(hallway_length*2+1);
var rooms1hascrayon = new Array(hallway_length*2+1);
var rooms1hasdrawer = new Array(hallway_length*2+1);
var rooms1hasflashlight = new Array(hallway_length*2+1);
var rooms1hasnote = new Array(hallway_length*2+1);
var rooms1hasscrewdriver = new Array(hallway_length*2+1);
for (var i = 0; i <= (hallway_length*2+1) ; i++){
	if (getRandomInt(0,1) == 1 && computerlocation != i && notelocation != i) {
		rooms1[i]='locked'
		lockedcount=lockedcount+1
		description = 'This room is locked';
	} else {
		description='You are in a room.'
		if (computerlocation == i) {
			rooms1hascomputer[i]=1
			description = description + ' It contains a computer.';
		} else {
			rooms1hascomputer[i]=0
		}
		if (getRandomInt(0,1) == 1) {
			rooms1hasdrawer[i]=1
			description = description + ' It contains a drawer.';
		} else {
			rooms1hasdrawer[i]=0
		}
		if (getRandomInt(0,1) == 1) {
			rooms1hasclock[i]=1
			description = description + ' It contains a clock.';
		} else {
			rooms1hasclock[i]=0
		}
		if ((notelocation == i) || (getRandomInt(0,1) == 1)) {
			rooms1hasnote[i]=1
			description = description + ' It contains a note.';
			if (notelocation == i) {
				note[i]='login: root '+password;
			} else {
				randomInt=getRandomInt(0,1)
				if (randomInt == 0) {
					note[i]='You\'re going to die...'
				} else if (randomInt == 1) {
					note[i]='There\'s a computer on the first floor'
				}
			}
		} else {
			rooms1hasnote[i]=0
		}
		if (crayonlocation == i) {
			rooms1hascrayon[i]=1
			description = description + ' There is crayon here.';
		} else {
			rooms1hascrayon[i]=0
		}
		if (screwdriverlocation == i) {
			rooms1hasscrewdriver[i]=1
			description = description + ' There is a screwdriver here.';
		} else {
			rooms1hasscrewdriver[i]=0
		}
		if (flashlightlocation == i) {
			rooms1hasflashlight[i]=1
			description = description + ' There is a flashlight.';
		} else {
			rooms1hasflashlight[i]=0
		}
	}
	rooms1description[i] = description
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
		10:{description:rooms1description[0], exits:{east:0}, enter:function(terminal) {
				currentlocation=10
		}},
		11:{description:rooms1description[1], exits:{west:0}, enter:function(terminal) {
				currentlocation=11
		}},
		12:{description:rooms1description[2], exits:{east:1}, enter:function(terminal) {
				currentlocation=12
		}},
		13:{description:rooms1description[3], exits:{west:1}, enter:function(terminal) {
				currentlocation=13
		}},
		14:{description:rooms1description[4], exits:{east:2}, enter:function(terminal) {
				currentlocation=14
		}},
		15:{description:rooms1description[5], exits:{west:2}, enter:function(terminal) {
				currentlocation=15
		}},
		16:{description:rooms1description[6], exits:{east:3}, enter:function(terminal) {
				currentlocation=16
		}},
		17:{description:rooms1description[7], exits:{west:3}, enter:function(terminal) {
				currentlocation=17
		}},
		18:{description:rooms1description[8], exits:{east:4}, enter:function(terminal) {
				currentlocation=18
		}},
		19:{description:rooms1description[9], exits:{west:4}, enter:function(terminal) {
				currentlocation=19
		}},
		20:{description:rooms1description[10], exits:{east:5}, enter:function(terminal) {
				currentlocation=20
		}},
		21:{description:rooms1description[11], exits:{west:5}, enter:function(terminal) {
				currentlocation=21
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
		
		10002:{description:'You open the drawers.', enter:function(terminal) {
			terminal.print('');
			terminal.setWorking(true);
			setTimeout("Terminal.print('You find a note and read its content.');", 2000);
			setTimeout("Terminal.print('');", 4000);
			setTimeout("Terminal.print('root '+password);", 4000);
			setTimeout("Terminal.print('');", 4000);
			setTimeout("Terminal.print('----------------');", 4000);
			setTimeout("Terminal.setWorking(false);", 4000);
			setTimeout("Adventure.goTo(Terminal, 0);", 4000);
		}},
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
	if (silent_move == false) {
		terminal.print(Adventure.location.description);	
		if (Adventure.location.exits) {
			terminal.print(timeinfo);
			if (currentlocation == 0) {
				var possibleDirections = ['north', 'east', 'west'];
			} else if (currentlocation >= hallway_length) {
				var possibleDirections = ['east', 'south', 'west'];
			} else {
				var possibleDirections = [];
				$.each(Adventure.location.exits, function(name, id) {
				possibleDirections.push(name);
				});
			}
			terminal.print('Exits: '+possibleDirections.join(', '));
			terminal.print('Hallway length: '+hallway_length+'');
			if (menu != false) {
				terminal.print('');
				if (menu == "newgame") {
					terminal.print('Would you like to start a new game?');
				}
			}
		}
	}
};

TerminalShell.commands['go'] = Adventure.go = function(terminal, direction) {
	if (Adventure.location.exits && direction in Adventure.location.exits) {
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
			} else {
				amountofmoves=amountofmoves+1
				Adventure.goTo(terminal, Adventure.location.exits[direction]);
			}
		} else if (destination >= 10 && destination <= 99) {
			if (direction == 'west') {
				destination=currentlocation
			} else {
				if (direction == 'east') {
					destination=currentlocation+1
				}
			}
			if (rooms1[destination] == 'locked') {
				Terminal.print('The door is locked!')
				Terminal.runCommand('look')
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
	objectlocation=currentlocation-10
	if (!object) {
		terminal.print('Use what?');
	} else if (object == "door") {
		if (rooms1[currentlocation] == 'locked') {
			Terminal.print('The door is locked!');
		} else {
			Terminal.print('You open the door.');
			Adventure.goTo(Terminal, i+10);
		}
	} else if (object == "clock") {
		if (rooms1hasclock[objectlocation] == 1) {
			terminal.print('You cannot use '+object+'.');
		} else {
			terminal.print('You cannot use '+object+'.');
		}
	} else if (object == "computer") {
		if (rooms1hascomputer[objectlocation] == 1) {
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
					setTimeout("Terminal.print('Connection closed...');", 5000);
					Terminal.setWorking(false);
					using_computer=false
				}
			}
		} else {
			terminal.print('You cannot use '+object+'.');
		}
	} else if (object == "drawer") {
		if (rooms1hasdrawer[objectlocation] == 1) {
			terminal.print('You cannot use '+object+'.');
		} else {
			terminal.print('You cannot use '+object+'.');
		}
	} else if (object == "note") {
		terminal.print('You grab the note and start reading...');
		terminal.setWorking(true);
		terminal.print('');
		setTimeout("Terminal.print(note[objectlocation])", 2000);
		terminal.setWorking(false);
	} else {
		terminal.print('You cannot use '+object+'.');
	}
};

TerminalShell.commands['take'] = Adventure.go = function(terminal, object) {
	objectlocation=currentlocation-10
	if (!object) {
		terminal.print('Take what?');
	} else {
		if ((object == 'crayon' && crayonlocation == objectlocation) || (object == 'flashlight' && flashlightlocation == objectlocation) || (object == 'screwdriver' && screwdriverlocation == objectlocation)) {
			if (gamemode == 1) { // Ghost
				if (inventory.length >= 1) {
					terminal.print('Your inventory is full!');
				} else {
					terminal.print(object+' has been put in your inventory.');
					inventory.push(object);
				}
			}
		} else {
			terminal.print('You cannot take '+object+'.');
		}
	}
};

TerminalShell.commands['drop'] = Adventure.go = function(terminal, object) {
	if (!object) {
		terminal.print('Drop what?');
	} else {
		if ($.inArray(object, inventory) != -1) {
			// Remove from inventory code here...
			objectlocation=currentlocation-10
			if (object == 'crayon') {
				crayonlocation=currentlocation
				var inventory = [];
			} else if (object == 'flashlight') {
				flashlightlocation=currentlocation
				var inventory = [];
			} else if (object == 'screwdriver') {
				screwdriverlocation=currentlocation
				var inventory = [];
			}
			terminal.print('You dropped '+object+'.');
		} else {
			terminal.print('Could not find '+object+' in your inventory.');
		}
	}
};

TerminalShell.commands['inventory'] = function(terminal) {
	inventoryoutput='Inventory: '
	for (i = 0; i < inventory.length; i++) {
		inventoryoutput=inventoryoutput+inventory[i]
	}
	if (inventoryoutput == 'Inventory: ') {
		terminal.print('Your inventory is empty.')
	} else {
		terminal.print(inventoryoutput);
	}
};
TerminalShell.commands['inspect'] = function(terminal, object) {
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
};

TerminalShell.commands['sleep'] = TerminalShell.commands['rest'] = function(terminal, duration) {
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
};

TerminalShell.commands['login'] = function(terminal, username, passwd) {
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
			} else {
				if ((getRandomInt(0,1) == 1)) {
					terminal.print('The ghost got you! GAME OVER!');
					gameresult='lost'
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
			terminal.print('You are at '+currentlocation+'. The ghost is at '+ghostlocation+'.');
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
