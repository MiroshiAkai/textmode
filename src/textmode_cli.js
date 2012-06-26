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

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

var xkcd = {
	latest: null,
	last: null,
	cache: {},
	base: 'http://dynamic.xkcd.com/api-0/jsonp/comic/',
	
	get: function(num, success, error) {
		if (num == null) {
			path = '';
		} else if (Number(num)) {
			path = String(num);
		} else {
			error(false);
			return false;
		}
		
		if (num in this.cache) {
			this.last = this.cache[num];
			success(this.cache[num]);
		} else {
			return $.ajax({
				url: this.base+path,
				dataType: 'jsonp',
				success: $.proxy(function(data) {
					this.last = this.cache[num] = data;
					success(data);
				}, this),
				error: error});
		}
	}
};

function linkFile(url) {
	return {type:'dir', enter:function() {
		window.location = url;
	}};
}

Filesystem = {
	'info.txt': {type:'file', read:function(terminal) {
		terminal.print('Welcome to Textmode');
		terminal.print($('<p>').html('Programmed and storyboard by <a href="https://github.com/TheLastProject">TheLastProject</a>'));
		terminal.print($('<p>').html('Using the <a href="https://github.com/chromakode/xkcdfools">xkcdfools</a> codebase.'));
		terminal.print($('<p>').html('Source code is available on <a href="https://github.com/TheLastProject/textmode">github</a>.'));
		terminal.print('');
	}},
	'license.txt': {type:'file', read:function(terminal) {
		terminal.print($('<p>').html('Client-side logic for Wordpress CLI theme :: <a href="http://thrind.xamai.ca/">R. McFarland, 2006, 2007, 2008</a>'));
		terminal.print($('<p>').html('jQuery rewrite and overhaul :: <a href="http://www.chromakode.com/">Chromakode, 2010</a>'));
		terminal.print();
		$.each([
			'This program is free software; you can redistribute it and/or',
			'modify it under the terms of the GNU General Public License',
			'as published by the Free Software Foundation; either version 2',
			'of the License, or (at your option) any later version.',
			'',
			'This program is distributed in the hope that it will be useful,',
			'but WITHOUT ANY WARRANTY; without even the implied warranty of',
			'MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the',
			'GNU General Public License for more details.',
			'',
			'You should have received a copy of the GNU General Public License',
			'along with this program; if not, write to the Free Software',
			'Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.'
		], function(num, line) {
			terminal.print(line);
		});
	}}
};
TerminalShell.pwd = Filesystem;

// Indexing variables like a gentleman
time=3
if (time > 12) {
	timeinfo='\nIt is now '+(time-12)+':00PM';
} else {
	timeinfo='\nIt is now '+time+':00AM.';
}
time_passes=false
logged_in=false
timeService=false
using_computer=false
time_installed=false
savestatus=0
menu=false
autosave=false

Adventure = {
	rooms: {
		0:{description:'You are sitting behind a desk in a science laboratory. The desk has a single drawer. In front of you you have a computer and a note lying next to it.', exits:{west:1}, objects:{computer:10000, note:10001, drawer:10002}, location:0, enter:function(terminal) {
				currentlocation=0
				using_computer=false
		}},
		1:{description:'You are in the hallway, next to the computer you first saw.', exits:{east:0, north:2, south:4}, enter:function(terminal) {
				currentlocation=1
		}},
		2:{description:'You are in the hallway, next to some stairs.', exits:{south:1, north:3, up:100, down:200}, enter:function(terminal) {
				currentlocation=2
		}},
		3:{description:'There is nothing interesting here, just more classrooms.', exits:{south:2}, enter:function(terminal) {
				currentlocation=3
		}},
		4:{description:'There is nothing interesting here, just more classrooms.', exits:{north:1}, enter:function(terminal) {
				currentlocation=4
		}},
		100:{description:'You walk up the stairs and reach for the door. Upon grabbing the door knob, you notice the door is locked.', exits:{down:2}, enter:function(terminal) {
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
					setTimeout("Terminal.setWorking(false);", 2000);
					setTimeout("Terminal.print('Connected succesfully. Ready to execute commands');", 2000);
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
			setTimeout("Terminal.print('kolosos kolosos');", 4000);
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
		Adventure.look(terminal);
		if (Adventure.location.enter) {
			Adventure.location.enter(terminal);
		}
	}
};
currentlocation = Adventure.location = Adventure.rooms[0];

//Experimental save feature...
TerminalShell.commands['save'] = function(terminal) {
	createCookie('omnisavefile',savestatus,30)
	createCookie('omnisavefilelocation',currentlocation, 30)
	Terminal.print('Game saved, hopefully succesfully');
}

//Experimental load feature...
TerminalShell.commands['load'] = function(terminal) {
	currentlocation = readCookie('omnisavefilelocation');
	Adventure.goTo(Terminal,currentlocation);
	loadinfo = readCookie('omnisavefile');
	if (loadinfo >= 1) {
		logged_in=true
		Terminal.print('Looks like we loaded your game, huh');
	}
	if (loadinfo >= 2) {
		timeService="valuewewant"
	}
	if (loadinfo >= 3) {
		time_installed=true
	}
}

//Experimental save delete feature...
TerminalShell.commands['restart'] = function(terminal) {
	Terminal.print('This will delete your savefile and restart the game. Are you sure you want to do this? (yes/no)');
	menu="restart"
}

TerminalShell.commands['look'] = Adventure.look = function(terminal) {
	if (currentlocation == 0) {
		if (time_passes == false) {
			Terminal.print('You are in an old science laboratory, with a computer and note lying down on a desk in front of you. There is a clock hanging on the concrete wall, but time doesn\'t seem to pass on it. There is a small wet spot on the floor near you. Besides that, the room doesn\'t appear to have any interesting content.');
		} else {
			Terminal.print('You are in an old science laboratory, with a computer and note lying down on a desk in front of you. There is a clock hanging on the concrete wall, on which time passes slowly. There is a small wet spot on the floor near you. Besides that, the room doesn\'t appear to have any interesting content.');
		}	
	} else {
		terminal.print(Adventure.location.description);	
	}
	if (Adventure.location.exits) {
		terminal.print(timeinfo);
		var possibleDirections = [];
		$.each(Adventure.location.exits, function(name, id) {
			possibleDirections.push(name);
		});
		terminal.print('Exits: '+possibleDirections.join(', '));
		if (!menu) {
		} else {
			terminal.print('');
			if (menu == "restart") {
				terminal.print('Game still wants to know if you want to restart the game (yes/no)');
			}
			if (menu == "autosave") {
				terminal.print('Game still wants to know if you want to enable autosave (yes/no)');
			}
			if (menu == "savefiledetected") {
				terminal.print('Game still wants to know if you want to load your previous savefile (yes/no)');
			}
		}
	}
};

TerminalShell.commands['go'] = Adventure.go = function(terminal, direction) {
	if (Adventure.location.exits && direction in Adventure.location.exits) {
		if (time_passes == true) {
			random_time_passing=Math.round(Math.random() * 5)
			if (random_time_passing==5) {
				time=time+1
			}
		}
		if (time >= 24) {
			time=(time-24)
		}
		if (time > 12) {
			timeinfo='\nIt is now '+(time-12)+':00PM';
		} else {
			timeinfo='\nIt is now '+time+':00AM.';
		}
		Adventure.goTo(terminal, Adventure.location.exits[direction]);
	} else if (!direction) {
		terminal.print('Go where?');
	} else if (direction == 'down') {
		terminal.print("On our first date?");
	} else {
		terminal.print('You cannot go '+direction+'.');
	}
};

TerminalShell.commands['exit'] = TerminalShell.commands['back'] = function(terminal, direction) {
	Terminal.runCommand('go back');
}

TerminalShell.commands['yes'] = function(terminal) {
	if (!menu) {
		Terminal.print('Could not find a question to answer "yes" to');
	}
	if (menu == "restart") {
		createCookie("omnisavefile","",-1);
		createCookie("omnisavefilelocation","",-1);
		menu=false
		window.location.reload()
	}
	if (menu == "autosave") {
		autosave=true
		Terminal.print('Autosave has been enabled');
		menu=false
	}
	if (menu == "savefiledetected") {
		Terminal.runCommand('load');
		Terminal.print('Would you like to enable autosave? (yes/no)');
		menu="autosave"
	}
}

TerminalShell.commands['no'] = function(terminal) {
	if (!menu) {
		Terminal.print('Could not find a question to answer "no" to');
	}
	if (menu == "restart") {
		Terminal.print('Your savefile has not been deleted');
		menu=false
	}
	if (menu == "autosave") {
		autosave=false
		Terminal.print('The game will not save automatically. Please type "save" when you want to save your game');
		menu=false
	}
	if (menu == "savefiledetected") {
		Terminal.print('Save file will not be loaded. Please note that if you enable autosave or save manually, your save file will be overwritten');
		Terminal.print('Would you like to enable autosave? (yes/no)');
		menu="autosave"
	}
}

TerminalShell.commands['use'] = Adventure.go = function(terminal, object) {
	if (Adventure.location.objects && object in Adventure.location.objects) {
		Adventure.goTo(terminal, Adventure.location.objects[object]);
	} else if (!object) {
		terminal.print('Use what?');
	} else if (object == "door") {
		if (currentlocation == 201) {
			if (time>=7 && time<=17) {
				Terminal.print('You open the door');
				Adventure.goTo(Terminal, 202);
			} else {
				Terminal.print('The door is locked');
			}
		} else {
			terminal.print('You cannot use '+object+' or '+object+' is not in this room.');
		}
	} else {
		terminal.print('You cannot use '+object+' or '+object+' is not in this room.');
	}
};

TerminalShell.commands['inspect'] = function(terminal, object) {
	if (!object) {
		Terminal.print('Inspect what?');
	} else {
		if (currentlocation == 0) {
			if (object == "computer") {
				Terminal.print('It is an old computer, probably from around the 70s. It seems to be running Unix.');
			} else if (object == "clock") {
				if (time_passes == false) {
					Terminal.print('The hands of the clock don\'t move, but the clock doesn\'t look like it is broken.'+timeinfo);
				} else {
					Terminal.print('You look at the clock.'+timeinfo);
				}
			} else if (object == "desk") {
				Terminal.print('It is just a wooden desk.');
			} else if (object == "drawer") {
				Terminal.print('The drawer is made of wood, and seems slightly damaged due to old age, from the looks of it. It appears to be openable.');
			} else if (object == "note") {
				Terminal.print('It\'s a yellow sticky note, nothing remarkable, really.');
			} else if (object == "spot") {
				Terminal.print('You walk towards the wet spot on the floor and sit down next to it. Upon inspecting it, you inhale a gas without smell coming from it and temporarily lose consciousness...');
				duration=2
				$('#screen').fadeOut(4000);
				window.setTimeout(function() {
					terminal.setWorking(false);
					$('#screen').fadeIn();
					if (time_passes == true) {
						time=time+(duration)
						if (time >= 24) {
							time=(time-24)
						}
						if (time > 12) {
							timeinfo='\nIt is now '+(time-12)+':00PM';
						} else {
							timeinfo='\nIt is now '+time+':00AM.';
						}
					}
						terminal.print(timeinfo);
				}, 6000);
			}
		} else if (currentlocation == 201) {
			if (object == "door") {
				if (time>=7 && time<=17) {
					Terminal.print('The door is slightly rusty, due to the old age. Upon inspecting the door and the lock, you come to the conclusion the door is open.');
				} else {
					Terminal.print('The door is slightly rusty, due to the old age. Upon inspecting the door and the lock, you come to the conclusion the door is closed.');
				}
			} else {
				Terminal.print('You cannot inspect '+object+' or '+object+' is not in this room.');
			}
		} else {
			Terminal.print('You cannot inspect '+object+' or '+object+' is not in this room.');
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
				time=(time-24)
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

TerminalShell.commands['login'] = function(terminal, username, password) {
	if (!using_computer) {
		terminal.print('Unrecognized command. Type "help" for assistance.');
	} else {
		if (logged_in == true) {
			terminal.print('You are already logged in!')
		} else {
			if (!username) {
				terminal.print('Usage: login username password');
			} else {
				if (username == 'kolosos') {
					if (!password) {
						terminal.print('You must enter a password!');
					} else {
						if (password == 'kolosos') {
							logged_in=true
							terminal.print('You have logged in succesfully.');
							savestatus=1
							if (autosave == true) {
								Terminal.runCommand('save');
							}
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

TerminalShell.commands['make'] = function(terminal) {
	if (!using_computer) {
		terminal.print('Unrecognized command. Type "help" for assistance.');
	} else {
		if (!logged_in) {
			terminal.print('Please login first!');
		} else {
			if (!timeService) {
				duration=400
				terminal.setWorking(true);
				terminal.print('****************************************************');
				terminal.print('Please be sure to read the installation instructions');
				terminal.print('before proceeding with the configuration procedure!');
				terminal.print('****************************************************');
				setTimeout("Terminal.print('Makefile:34: *** timeService is undefined.  Stop.');", 3*duration);
				setTimeout("Terminal.setWorking(false);",3*duration);
			} else {
				if (timeService == "valuewewant") {
					duration=400
					terminal.setWorking(true);
					terminal.print('****************************************************');
					terminal.print('Please be sure to read the installation instructions');
					terminal.print('before proceeding with the configuration procedure!');
					terminal.print('****************************************************');
					setTimeout("Terminal.print('cd build.AMD/perlx-5.14.0-i686-linux-thread-multi; TOP=/home/omni/Desktop/time-2.9.9 /usr/bin/perl /home/omni/Desktop/time-2.9.9/perl/ext/Makefile.PL');", 3*duration);
					setTimeout("Terminal.print('make[1]: Entering directory `/home/omni/Desktop/time-2.9.9/build.AMD/perlx-5.14.0-i686-linux-thread-multi');", 4*duration);
					setTimeout("Terminal.print('cc -c  -I/home/omni/Desktop/time-2.9.9/lib/PTL/include -D_REENTRANT -D_GNU_SOURCE -fno-strict-aliasing -pipe -fstack-protector -I/usr/local/include -D_LARGEFILE_SOURCE -D_FILE_OFFSET_BITS=64 -march=i686 -mtune=generic -O2 -pipe   -DVERSION=\ -DXS_VERSION=\ -fPIC '-I/usr/lib/perl5/core_perl/CORE'  -DPerlVersion=5014 -Wno-nonnull CPlusPlus.c');", 5*duration);
					setTimeout("Terminal.print('CPlusPlus.xs: In function 'XS_time__Core__CPlusPlus_create_function_wrapper':');", 6*duration);
					setTimeout("Terminal.print('Compiled succesfully');", 10*duration);
					setTimeout("Terminal.print('Installing Time module...');", 12*duration);
					setTimeout("Terminal.print('Time module succesfully installed. Use start time to start it');", 15*duration);
					setTimeout("Terminal.setWorking(false);", 15*duration);
					time_installed=true
					savestatus=3
					if (autosave == true) {
						Terminal.runCommand('save');
					}
				} else {
					duration=400
					terminal.setWorking(true);
					terminal.print('****************************************************');
					terminal.print('Please be sure to read the installation instructions');
					terminal.print('before proceeding with the configuration procedure!');
					terminal.print('****************************************************');
					setTimeout("terminal.print('Makefile:34: *** timeService has an incorrect value.  Stop.');", 3*duration);
					setTimeout("Terminal.setWorking(false);",3*duration);
				}
			}
		}
	}
};

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
	terminal.print('Type "go" to go to a direction. For example, "go west" to go west.');
	terminal.print('Type "look" to look around the environment.');
	terminal.print('Type "inspect" to inspect an object.');
	terminal.print('Type "use" to use an object in the room. For example, type "use computer" to use a computer in the room. The "use" command is used for all kinds of interaction, so if you want to read a book write "use book" to do so.');
	terminal.print('To stop using an object, type "back", "go back" or "exit".');
}; 

var konamiCount = 0;
$(document).ready(function() {
	Terminal.promptActive = false;
	function noData() {
		Terminal.print($('<p>').addClass('error').text('Unable to load startup data. :-('));
		Terminal.promptActive = true;
	}
	$('#screen').bind('cli-load', function(e) {
		xkcd.get(null, function(data) {
			if (data) {
				xkcd.latest = data;
				$('#screen').one('cli-ready', function(e) {
					<!-- Terminal.runCommand('cat welcome.txt'); -->
				});
					currentlocation=0
					Terminal.print('Welcome to Textmode');
					Terminal.print($('<p>').html('Programmed and storyboard by <a href="https://github.com/TheLastProject">TheLastProject</a>'));
					Terminal.print($('<p>').html('Based on the <a href="https://github.com/chromakode/xkcdfools">xkcdfools</a> codebase.'));
					Terminal.print($('<p>').html('Source code is available on <a href="https://github.com/TheLastProject/textmode">github</a>.'));
					Terminal.print('');
					Terminal.print('Type "help" for instructions on how to play.');
					Terminal.print('');
					loadinfo = readCookie('omnisavefile');
					if (loadinfo != null) {
						menu="savefiledetected"
						Terminal.print('A save file has been detected. Would you like to load it? (yes/no)');
					} else {
					Terminal.print('Would you like to enable autosave? (yes/no)');
					menu="autosave"
					}
					Terminal.runCommand('');
			} else {
				noData();
			}
		}, noData);
	});
	
	$(document).konami(function(){
		function shake(elems) {
			elems.css('position', 'relative');
			return window.setInterval(function() {
				elems.css({top:getRandomInt(-3, 3), left:getRandomInt(-3, 3)});
			}, 100);	
		}
		
		if (konamiCount == 0) {
			$('#screen').css('text-transform', 'uppercase');
		} else if (konamiCount == 1) {
			$('#screen').css('text-shadow', 'gray 0 0 2px');
		} else if (konamiCount == 2) {
			$('#screen').css('text-shadow', 'orangered 0 0 10px');
		} else if (konamiCount == 3) {
			shake($('#screen'));
		} else if (konamiCount == 4) {
			$('#screen').css('background', 'url(/unixkcd/over9000.png) center no-repeat');
		}
		
		$('<div>')
			.height('100%').width('100%')
			.css({background:'white', position:'absolute', top:0, left:0})
			.appendTo($('body'))
			.show()
			.fadeOut(1000);
		
		if (Terminal.buffer.substring(Terminal.buffer.length-2) == 'ba') {
			Terminal.buffer = Terminal.buffer.substring(0, Terminal.buffer.length-2);
			Terminal.updateInputDisplay();
		}
		TerminalShell.sudo = true;
		konamiCount += 1;
	});
});
