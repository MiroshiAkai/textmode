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

//Generate rooms
var rooms1 = new Array(hallway_length*2+1);
var rooms1description = new Array(hallway_length*2+1);
var computerlocation = getRandomInt(1, (hallway_length*2+1));
var rooms1hascomputer = new Array(hallway_length*2+1);
var rooms1hasdrawer = new Array(hallway_length*2+1);
var rooms1hasclock = new Array(hallway_length*2+1);
for (var i = 0; i <= hallway_length*2+1 ; i++){
	if (getRandomInt(0,1) == 1 && computerlocation != i) {
		rooms1[i]='locked'
		lockedcount=lockedcount+1
		rooms1description[i] = 'This room is locked';
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
		rooms1description[i] = description
	}
}


// Indexing variables like a gentleman
time=getRandomInt(0,24)
if (time > 12) {
	timeinfo='\nIt is now '+(time-12)+':00PM';
} else {
	timeinfo='\nIt is now '+time+':00AM.';
}
destination=0
time_passes=true
logged_in=false
timeService=false
using_computer=false
time_installed=false
savestatus=0
menu=false
autosave=false
silent_move=false
password=getRandomInt(0,9)+''+getRandomInt(0,9)+''+getRandomInt(0,9)+''+getRandomInt(0,9)+''+getRandomInt(0,9)+''+getRandomInt(0,9)

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
		
		10000:{description:'You are now using the computer.', exits:{back:0}, objects:{computer: 10000}, enter:function(terminal) {
				currentlocation=10000
				using_computer=true
				if (!logged_in) {
					Terminal.print('Please login using the "login" command.');
				} else {
					terminal.setWorking(true);
					Terminal.print('Connecting to the secure shell...');
					setTimeout("Terminal.print('Connected succesfully.');", 2000);
					if (!time_installed) {
						setTimeout("Terminal.print('')", 3000);
						setTimeout("Terminal.print('****************************************************');", 3000);
						setTimeout("Terminal.print('Please be sure to read the installation instructions');", 3000);
						setTimeout("Terminal.print('before proceeding with the configuration procedure!');", 3000);
						setTimeout("Terminal.print('****************************************************');", 3000);
						if (!timeService) {
							duration=1500
							setTimeout("Terminal.print('Makefile:34: *** timeService is undefined.  Stop.');", 3*duration);
							setTimeout("Terminal.setWorking(false);",3*duration);
						} else {
							if (timeService == "valuewewant") {
								duration=1500
								setTimeout("Terminal.print('cd build.AMD/perlx-5.14.0-i686-linux-thread-multi; TOP=/home/omni/Desktop/time-2.9.9 /usr/bin/perl /home/omni/Desktop/time-2.9.9/perl/ext/Makefile.PL');", 3*duration);
								setTimeout("Terminal.print('make[1]: Entering directory `/home/omni/Desktop/time-2.9.9/build.AMD/perlx-5.14.0-i686-linux-thread-multi');", 4*duration);
								setTimeout("Terminal.print('cc -c  -I/home/omni/Desktop/time-2.9.9/lib/PTL/include -D_REENTRANT -D_GNU_SOURCE -fno-strict-aliasing -pipe -fstack-protector -I/usr/local/include -D_LARGEFILE_SOURCE -D_FILE_OFFSET_BITS=64 -march=i686 -mtune=generic -O2 -pipe   -DVERSION=\ -DXS_VERSION=\ -fPIC '-I/usr/lib/perl5/core_perl/CORE'  -DPerlVersion=5014 -Wno-nonnull CPlusPlus.c');", 5*duration);
								setTimeout("Terminal.print('CPlusPlus.xs: In function 'XS_time__Core__CPlusPlus_create_function_wrapper':');", 6*duration);
								setTimeout("Terminal.print('Compiled succesfully');", 8*duration);
								setTimeout("Terminal.print('Installing Time module...');", 10*duration);
								setTimeout("Terminal.print('Time module succesfully installed. Use start time to start it');", 13*duration);
								setTimeout("Terminal.setWorking(false);", 13*duration);
								time_installed=true
								savestatus=3
								if (autosave == true) {
									Terminal.runCommand('save');
								}
							} else {
								duration=1500
								setTimeout("terminal.print('Makefile:34: *** timeService has an incorrect value.  Stop.');", 3*duration);
								setTimeout("Terminal.setWorking(false);",3*duration);
							}
						}
					}
				}
			}
		},
		10001:{description:'You grab the note and read its content.', enter:function(terminal) {
			terminal.print('');
			terminal.setWorking(true);
			setTimeout("Terminal.setWorking(false);", 2000);
			setTimeout("Terminal.print('The note is empty.');", 2000);
			setTimeout("Terminal.print('');", 2000);
			setTimeout("Terminal.print('----------------');", 2000);
			setTimeout("Adventure.goTo(Terminal, 0);", 2000);
		}},
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
			} else if (currentlocation == hallway_length) {
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
				if (menu == "restart") {
					terminal.print('Game wants to know if you want to restart the game (yes/no)');
				}
				if (menu == "autosave") {
					terminal.print('Game wants to know if you want to enable autosave (yes/no)');
				}
				if (menu == "savefiledetected") {
					terminal.print('Game wants to know if you want to load your previous savefile (yes/no)');
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
				Adventure.goTo(terminal, Adventure.location.exits[direction]);
			}
		} else {
			Adventure.goTo(terminal, Adventure.location.exits[direction]);
		}
	} else if (!direction) {
		terminal.print('Go where?');
	} else {
		terminal.print('You cannot go '+direction+'.');
	}
};

TerminalShell.commands['exit'] = TerminalShell.commands['back'] = function(terminal, direction) {
	Terminal.runCommand('go back');
}

TerminalShell.commands['yes'] = function(terminal) {
	if (!menu) {
		Terminal.print('Could not find a question to answer "yes" to.');
	}
}

TerminalShell.commands['no'] = function(terminal) {
	if (!menu) {
		Terminal.print('Could not find a question to answer "no" to.');
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
	} else if (object == "computer") {
		if (rooms1hascomputer[objectlocation] == 1) {
			Adventure.goTo(Terminal, 10000)
		} else {
			terminal.print('You cannot use '+object+'.');
		}
	} else if (object == "clock") {
		if (rooms1hasclock[objectlocation] == 1) {
			Adventure.goTo(Terminal, 10000)
		} else {
			terminal.print('You cannot use '+object+'.');
		}
	} else if (object == "drawer") {
		if (rooms1hasdrawer[objectlocation] == 1) {
			Adventure.goTo(Terminal, 10002)
		} else {
			terminal.print('You cannot use '+object+'.');
		}
	} else {
		terminal.print('You cannot use '+object+'.');
	}
};

TerminalShell.commands['inspect'] = function(terminal, object) {
	objectlocation=currentlocation-10
	if (!object) {
		Terminal.print('Inspect what?');
	} else {
		if (currentlocation == 1) {
			if (object == "door") {
				Terminal.print('This door leads to the laboratory');
			} else if (object == "wall") {
				Terminal.print('It looks like a pretty normal concrete wall.');
			} else {
				Terminal.print('You cannot inspect '+object+'.');
			}
			
		} else if (currentlocation == 201) {
			if (object == "door") {
				if (time>=7 && time<=17) {
					Terminal.print('The door is slightly rusty, due to the old age. Upon inspecting the door and the lock, you come to the conclusion the door is open.');
				} else {
					Terminal.print('The door is slightly rusty, due to the old age. Upon inspecting the door and the lock, you come to the conclusion the door is closed.');
				}
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


TerminalShell.commands['set'] = function(terminal, variable, value) {
	if (!variable) {
		terminal.print('Usage: set variable value.');
	}
	if (variable == "timeService") {
		if (!value) {
			if (!timeService) {
				terminal.print(variable+' has no value.');
			} else {
				terminal.print(variable+': '+timeService);
			}
		} else {
			timeService=value;
			terminal.print('Variable '+variable+' has been sat to '+value);
			if (value == "valuewewant") {
				savestatus=2
				if (autosave == true) {
					Terminal.runCommand('save');
				}
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
							savestatus=1
							if (autosave == true) {
								Terminal.runCommand('save');
							}
							silent_move=true
							Adventure.goTo(terminal, 10000);
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

TerminalShell.commands['start'] = function(terminal, program) {
	if (!using_computer) {
		terminal.print('Unrecognized command. Type "help" for assistance.');
	} else {
		if (!program) {
			terminal.print('Usage: start program.');
		} else {
			if (program == "time") {
				if (time_installed == true) {
					terminal.setWorking(true);
					terminal.print('Starting time...');
					setTimeout("Terminal.print('Time was started succesfully');", 2000);
					setTimeout("Terminal.setWorking(false);", 2000);
					time_passes=true
				} else {
					terminal.print(program+' could not be found.');
				}
			} else {
				terminal.print(program+' could not be found.');
			}
		}
	}
};

TerminalShell.commands['stop'] = function(terminal, program) {
	if (!using_computer) {
		terminal.print('Unrecognized command. Type "help" for assistance.');
	} else {
		if (!program) {
			terminal.print('Usage: stop program.');
		} else {
			if (program == "time") {
				if (time_installed == "true") {
					terminal.setWorking(true);
					terminal.print('Stopping time...');
					setTimeout("Terminal.print('Time was stopped succesfully');", 2000);
					setTimeout("Terminal.setWorking(false);", 2000);
					time_passes=false
				} else {
					terminal.print(program+' could not be found.');
				}
			} else {
				terminal.print(program+' could not be found.');
			}
		}
	}
};

// No peeking!
TerminalShell.commands['help'] = TerminalShell.commands['halp'] = function(terminal) {
	terminal.print('Type "yes" or "no" to answer questions given by the system.');
	terminal.print('Type "go" to go to a direction. For example, "go west" to go west.');
	terminal.print('Type "look" to look around the environment.');
	terminal.print('Type "inspect" to inspect an object. For example, "inspect clock" to inspect a clock.');
	terminal.print('Type "use" to use an object in the room. For example, type "use computer" to use a computer in the room. The "use" command is used for all kinds of interaction, so if you want to read a book write "use book" to do so.');
	terminal.print('To stop using an object, type "back", "go back" or "exit".');
}; 

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
			Terminal.runCommand('look');
		}, noData);
});
