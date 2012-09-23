amountofplayers=1;
initializeVariables();

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
		objectid=0;
	} else if (object == "note") {
		objectid=1;
	} else if (object == "flashlight") {
		objectid=2;
	} else if (object == "crayons") {
		objectid=3;
	} else if (object == "screwdriver") {
		objectid=4;
	} else if (object == "clock") {
		objectid=5;
	} else if (object == "drawer") {
		objectid=6;
	} else {
		objectid=-1;
	}
}

function getInfoForClickableItems() {
	var item = description[i].slice(0,1);
	for (k = 0; k < window.roomcontainsitem.length; k++) {
		if (item == window.roomcontainsitemlongname[k]) {
			window.itemnumber = k;
		}
	}
}

// Initialize... EVERYTHING
function initializeEverything() {
	initializeVariables();
	while (variablesInitialized != true) {
	}
	initializeRooms();
	while (roomsInitialized != true) {
	}
	if (gamemode != 0) {
		initializeGamemode();
	}
	while (variablesInitialized == false && roomsInitialized == false && gamemodeInitialized == false) {
	}
}

// Early semi-randomization code
function initializeVariables() {
	window.variablesInitialized=false
	window.variablesTime=0
	variablesTimer=setInterval("variablesTime++", 1);
	window.lockedcount=0
	window.hallway_length=getRandomInt(3,9)
	window.amount_of_floors=getRandomInt(1,2)
	if (hallway_length == 1) {
		window.roomAmount=13+(30*(amount_of_floors-1));
	} else if (hallway_length == 2) {
		window.roomAmount=15+(30*(amount_of_floors-1));
	} else if (hallway_length == 3) {
		window.roomAmount=17+(30*(amount_of_floors-1));
	} else if (hallway_length == 4) {
		window.roomAmount=19+(30*(amount_of_floors-1));
	} else if (hallway_length == 5) {
		window.roomAmount=21+(30*(amount_of_floors-1));
	} else if (hallway_length == 6) {
		window.roomAmount=23+(30*(amount_of_floors-1));
	} else if (hallway_length == 7) {
		window.roomAmount=25+(30*(amount_of_floors-1));
	} else if (hallway_length == 8) {
		window.roomAmount=27+(30*(amount_of_floors-1));
	} else if (hallway_length == 9) {
		window.roomAmount=29+(30*(amount_of_floors-1));
	}
	// Indexing variables like a gentleman
	window.amountofmoves=0;
	window.amountofroomsentered=0;
	window.time=getRandomInt(0,24);
	if (time > 12) {
		window.timeinfo='\nIt is now '+(time-12)+':00PM';
	} else {
		window.timeinfo='\nIt is now '+time+':00AM.';
	}
	window.destination=0;
	window.lasthallway=0;
	window.time_passes=true;
	window.logged_in=false;
	window.using_computer=false;
	window.menu=false;
	window.silent_move=false;
	window.password=getRandomInt(0,9)+''+getRandomInt(0,9)+''+getRandomInt(0,9)+''+getRandomInt(0,9);
	window.currentfloor=1;
	window.inventory = [];
	window.gameresult='start';
	window.gameover=0;
	window.objectid=-1;
	window.mutator=1;
	window.currentplayer=1;
	window.movesdone=0;
	window.gotlogininfo=false;
	window.variablesInitialized=true;
	window.playerlocation = new Array();
	for (i=1; i<=amountofplayers; i++) {
		window.playerlocation[i]=getRandomInt(0, roomAmount);
	}
	clearInterval(variablesTimer);
}
	
// Execute gamemode-specific commands
function initializeGamemode() {
	window.gamemodeInitialized=false
	window.gamemodeTime=0
	gamemodeTimer=setInterval("gamemodeTime++", 1);
	if (gamemode == 1) {
		randomInt=getRandomInt(2,4);
		window.ghostweakness=itemname[randomInt];
		window.amountofghostmoves=0;
		window.amountofscaressurvived=0;
		window.playerlocation[2]=getRandomInt(0,roomAmount);
		if (mutator == 2) {
			// Realtime-specific code here
		}
		if (wayofplaying == 2) {
			Terminal.print('Current player: Player '+currentplayer);
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
	window.gamemodeInitialized=true
	clearInterval(gamemodeTimer);
}

//Generate rooms
function initializeRooms() {
	window.roomsInitialized=false
	window.roomTime = 0
	roomTimer=setInterval("roomTime++", 1);
	window.rooms = new Array(roomAmount);
	window.roomdescription = new Array(roomAmount);
	window.lightstatus = new Array(roomAmount);
	window.itemlocation = new Array(5);
	for (i = 0; i <= 5; i++) {
		randomInt=getRandomInt(1, amount_of_floors)
		if (randomInt == 1) {
			itemlocation[i] = getRandomInt(10, (10+(hallway_length*2-1)));
		} else {
			itemlocation[i] = getRandomInt(40, roomAmount);
		}
	}
	window.itemname = new Array(5);
	window.itemname[0]="computer"
	window.itemname[1]="note"
	window.itemname[2]="flashlight"
	window.itemname[3]="crayons"
	window.itemname[4]="screwdriver"
	window.note = new Array(roomAmount);

	window.roomcontainsitem = new Array(7)
	for (i = 0; i <=7; i++) {
		roomcontainsitem[i] = new Array
	}
	window.roomcontainsitemname = new Array(7)
	window.roomcontainsitemlongname = new Array(7)
	window.itemaction = new Array(7)
	window.roomcontainsitemname[0]="computer"
	window.roomcontainsitemlongname[0]="a computer"
	window.itemaction[0]="use"
	window.roomcontainsitemname[1]="note"
	window.roomcontainsitemlongname[1]="a note"
	window.itemaction[1]="use"
	window.roomcontainsitemname[2]="flashlight"
	window.roomcontainsitemlongname[2]="a flashlight"
	window.itemaction[2]="take"
	window.roomcontainsitemname[3]="crayons"
	window.roomcontainsitemlongname[3]="a box of crayons"
	window.itemaction[3]="take"
	window.roomcontainsitemname[4]="screwdriver"
	window.roomcontainsitemlongname[4]="a screwdriver"
	window.itemaction[4]="take"
	window.roomcontainsitemname[5]="clock"
	window.roomcontainsitemlongname[5]="a clock"
	window.itemaction[5]="none"
	window.roomcontainsitemname[6]="drawer"
	window.roomcontainsitemlongname[6]="a drawer"
	window.itemaction[6]="none"

	window.description = new Array();
	window.descriptionbackup = new Array();
	for (var i = 0; i <= (roomAmount) ; i++){
		window.description[i] = new Array();
		window.descriptionbackup[i] = new Array();
		if (i >= 0 && i <= 9  || i >= 30 && i <= 39) { // Generate hallway
			lightstatus[i] = getRandomInt(1, 3)
		} else { // Generate rooms
			containsitem=0;
			for (var j = 0; j <= itemlocation.length; j++) {
				if (itemlocation[j] == 1) {
					containsitem=1
				}
			}
			if (getRandomInt(0,1) == 1 && containsitem != 0) {
				rooms[i]='locked'
				lockedcount++
				window.roomdescription[i]='The room is locked'
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
		// Create Description
		window.i = i
		createDescription();
	}
	roomsInitialized=true
	clearInterval(roomTimer);
}
function createDescription() {
	window.descriptionbackup[i] = description[i].slice(0, description[i].length);
	if ((i >= 0 && i <= 9) || (i >= 30 && i <= 39)) { // Generate hallway
		window.roomdescription[i] = 'You are in a hallway.'
		if (lightstatus[i] != 1) {
			roomdescription[i] = roomdescription[i] + ' The fluorescent lamp shines brightly.'
		} else if (lightstatus[i] == 1) {
			roomdescription[i] = roomdescription[i] + ' The fluorescent lamp flickers.'
		}
	} else {
		window.roomdescription[i] = 'You are in a room.'
	}
	for (j = 0; j <= description[i].length; j++) {
		if (j == 0 && description[i].length >= 2) {
			getInfoForClickableItems();
			if (window.itemaction[itemnumber] != "none") {
				roomdescription[i] = roomdescription[i] + ' The room contains <a href="javascript:clicked(\''+window.itemaction[itemnumber]+' '+window.roomcontainsitemname[itemnumber]+'\')">'+description[i].shift()+'</a>';
			} else {
				roomdescription[i] = roomdescription[i] + ' The room contains '+description[i].shift();
			}
		} else if (j == 0 && description[i].length >= 1) {
			getInfoForClickableItems();
			if (window.itemaction[itemnumber] != "none") {
				roomdescription[i] = roomdescription[i] + 'It only contains <a href="javascript:clicked(\''+window.itemaction[itemnumber]+' '+window.roomcontainsitemname[itemnumber]+'\')">'+description[i].shift()+'</a>.';
			} else {
				roomdescription[i] = roomdescription[i] + ' It only contains '+description[i].shift()+'.'
			}
		} else if (j == 0 && ((i >= 10 && i >= 29) || (i >=40 && i <= 59))) {
			roomdescription[i] = roomdescription[i] + ' It is empty.'
		}
		if (j == 1 && description[i].length >= 3) {
			getInfoForClickableItems();
			if (window.itemaction[itemnumber] != "none") {
				roomdescription[i] = roomdescription[i] + ', <a href="javascript:clicked(\''+window.itemaction[itemnumber]+' '+window.roomcontainsitemname[itemnumber]+'\')">'+description[i].shift()+'</a>';
			} else {
				roomdescription[i] = roomdescription[i] + ', '+description[i].shift()
			}
		} else if (j == 1) {
			getInfoForClickableItems();
			if (window.itemaction[itemnumber] != "none") {
				roomdescription[i] = roomdescription[i] + ' and <a href="javascript:clicked(\''+window.itemaction[itemnumber]+' '+window.roomcontainsitemname[itemnumber]+'\')">'+description[i].shift()+'</a>.';
			} else {
				roomdescription[i] = roomdescription[i] + ' and '+description[i].shift()+'.'
			}
		}
		if (j == 2) {
			getInfoForClickableItems();
			if (window.itemaction[itemnumber] != "none") {
				roomdescription[i] = roomdescription[i] + ', and <a href="javascript:clicked(\''+window.itemaction[itemnumber]+' '+window.roomcontainsitemname[itemnumber]+'\')">'+description[i].shift()+'</a>.';
			} else {				
				roomdescription[i] = roomdescription[i] + ', and '+description[i].shift()+'.'
			}
		}
		if (j == 3 && description[i].length >= 5) {
			getInfoForClickableItems();
			if (window.itemaction[itemnumber] != "none") {
				roomdescription[i] = roomdescription[i] + ' It also contains <a href="javascript:clicked(\''+window.itemaction[itemnumber]+' '+window.roomcontainsitemname[itemnumber]+'\')">'+description[i].shift()+'</a>';
			} else {
				roomdescription[i] = roomdescription[i] + ' It also contains '+description[i].shift()
			}
		} else if (j == 3) {
			getInfoForClickableItems();
			if (window.itemaction[itemnumber] != "none") {
				roomdescription[i] = roomdescription[i] + ' It also contains <a href="javascript:clicked(\''+window.itemaction[itemnumber]+' '+window.roomcontainsitemname[itemnumber]+'\')">'+description[i].shift()+'</a>.';
			} else {
				roomdescription[i] = roomdescription[i] + ' It also contains '+description[i].shift()+'.'
			}
		}
		if (j == 4 && description[i].length >= 6) {
			getInfoForClickableItems();
			if (window.itemaction[itemnumber] != "none") {
				roomdescription[i] = roomdescription[i] + ', <a href="javascript:clicked(\''+window.itemaction[itemnumber]+' '+window.roomcontainsitemname[itemnumber]+'\')">'+description[i].shift()+'</a>';
			} else {			
				roomdescription[i] = roomdescription[i] + ', '+description[i].shift()
			}
		} else if (j == 4) {
			getInfoForClickableItems();
			if (window.itemaction[itemnumber] != "none") {
				roomdescription[i] = roomdescription[i] + ' and <a href="javascript:clicked(\''+window.itemaction[itemnumber]+' '+window.roomcontainsitemname[itemnumber]+'\')">'+description[i].shift()+'</a>.';
			} else {
				roomdescription[i] = roomdescription[i] + ' and '+description[i].shift()+'.'
			}
		}
		if (j == 5) {
			getInfoForClickableItems();
			if (window.itemaction[itemnumber] != "none") {
				roomdescription[i] = roomdescription[i] + ' and <a href="javascript:clicked(\''+window.itemaction[itemnumber]+' '+window.roomcontainsitemname[itemnumber]+'\')">'+description[i].shift()+'</a>.';
			} else {
				roomdescription[i] = roomdescription[i] + ' and '+description[i].shift()+'.'
			}
		}
		if (j == 6 && description[i].length == 7) {
			getInfoForClickableItems();
			if (window.itemaction[itemnumber] != "none") {
				roomdescription[i] = roomdescription[i] + ' You can also see <a href="javascript:clicked(\''+window.itemaction[itemnumber]+' '+window.roomcontainsitemname[itemnumber]+'\')">'+description[i].shift()+'</a>.';
			} else {			  
				roomdescription[i] = roomdescription[i] + ' You can also see '+description[i].shift()+'.'
			}
		} else if (j == 6 && description[i].length >= 8) {
			getInfoForClickableItems();
			if (window.itemaction[itemnumber] != "none") {
				roomdescription[i] = roomdescription[i] + ' You can also see <a href="javascript:clicked(\''+window.itemaction[itemnumber]+' '+window.roomcontainsitemname[itemnumber]+'\')">'+description[i].shift()+'</a>';
			} else {		  
				roomdescription[i] = roomdescription[i] + ' You can also see '+description[i].shift()
			}
		}
		if (j == 7) {
			for (j = 7; j <= description[i].length-1; j++) {
			getInfoForClickableItems();
				if (window.itemaction[itemnumber] != "none") {
					roomdescription[i] = roomdescription[i] + ', <a href="javascript:clicked(\''+window.itemaction[itemnumber]+' '+window.roomcontainsitemname[itemnumber]+'\')">'+description[i].shift()+'</a>';
				} else {			  
					roomdescription[i] = roomdescription[i] + ', '+description[i].shift()
				}
			}
			if (j == description[i].length) {
				getInfoForClickableItems();
				if (window.itemaction[itemnumber] != "none") {
					roomdescription[i] = roomdescription[i] + ' and <a href="javascript:clicked(\''+window.itemaction[itemnumber]+' '+window.roomcontainsitemname[itemnumber]+'\')">'+description[i].shift()+'</a>.';
				} else {			  
					roomdescription[i] = roomdescription[i] + ' and '+description[i].shift()+'.'
				}
			}
		}
	}
}

Adventure = {
	rooms: {
		0:{exits:{north:1, east:11, west:10, up:30}, enter:function(terminal) {
				playerlocation[currentplayer]=0
		}},
		1:{exits:{north:2, east:13, south:0, west:12}, enter:function(terminal) {
				playerlocation[currentplayer]=1
		}},
		2:{exits:{north:3, east:15, south:1, west:14}, enter:function(terminal) {
				playerlocation[currentplayer]=2
		}},
		3:{exits:{north:4, east:17, south:2, west:16}, enter:function(terminal) {
				playerlocation[currentplayer]=3
		}},
		4:{exits:{north:5, east:19, south:3, west:18}, enter:function(terminal) {
				playerlocation[currentplayer]=4
		}},
		5:{exits:{north:6, east:21, south:4, west:20}, enter:function(terminal) {
				playerlocation[currentplayer]=5
		}},	
		6:{exits:{north:7, east:23, south:5, west:22}, enter:function(terminal) {
				playerlocation[currentplayer]=6
		}},
		7:{exits:{north:8, east:25, south:6, west:24}, enter:function(terminal) {
				playerlocation[currentplayer]=7
		}},
		8:{exits:{north:9, east:27, south:7, west:26}, enter:function(terminal) {
				playerlocation[currentplayer]=8
		}},
		9:{exits:{east:29, south:8, west:28}, enter:function(terminal) {
				playerlocation[currentplayer]=9
		}},	
		10:{exits:{east:0}, enter:function(terminal) {
				playerlocation[currentplayer]=10
				lasthallway=0
		}},
		11:{exits:{west:0}, enter:function(terminal) {
				playerlocation[currentplayer]=11
				lasthallway=0
		}},
		12:{exits:{east:1}, enter:function(terminal) {
				playerlocation[currentplayer]=12
				lasthallway=1
		}},
		13:{exits:{west:1}, enter:function(terminal) {
				playerlocation[currentplayer]=13
				lasthallway=1
		}},
		14:{exits:{east:2}, enter:function(terminal) {
				playerlocation[currentplayer]=14
				lasthallway=2
		}},
		15:{exits:{west:2}, enter:function(terminal) {
				playerlocation[currentplayer]=15
				lasthallway=2
		}},
		16:{exits:{east:3}, enter:function(terminal) {
				playerlocation[currentplayer]=16
				lasthallway=3
		}},
		17:{exits:{west:3}, enter:function(terminal) {
				playerlocation[currentplayer]=17
				lasthallway=3
		}},
		18:{exits:{east:4}, enter:function(terminal) {
				playerlocation[currentplayer]=18
				lasthallway=4
		}},
		19:{exits:{west:4}, enter:function(terminal) {
				playerlocation[currentplayer]=19
				lasthallway=4
		}},
		20:{exits:{east:5}, enter:function(terminal) {
				playerlocation[currentplayer]=20
				lasthallway=5
		}},
		21:{exits:{west:5}, enter:function(terminal) {
				playerlocation[currentplayer]=21
				lasthallway=5
		}},
		22:{exits:{east:6}, enter:function(terminal) {
				playerlocation[currentplayer]=22
				lasthallway=6
		}},
		23:{exits:{west:6}, enter:function(terminal) {
				playerlocation[currentplayer]=23
				lasthallway=6
		}},
		24:{exits:{east:7}, enter:function(terminal) {
				playerlocation[currentplayer]=24
				lasthallway=7
		}},
		25:{exits:{west:7}, enter:function(terminal) {
				playerlocation[currentplayer]=25
				lasthallway=7
		}},
		26:{exits:{east:8}, enter:function(terminal) {
				playerlocation[currentplayer]=26
				lasthallway=8
		}},
		27:{exits:{west:8}, enter:function(terminal) {
				playerlocation[currentplayer]=27
				lasthallway=8
		}},
		28:{exits:{east:9}, enter:function(terminal) {
				playerlocation[currentplayer]=28
				lasthallway=9
		}},
		29:{exits:{west:9}, enter:function(terminal) {
				playerlocation[currentplayer]=29
				lasthallway=9
		}},
		30:{exits:{north:31, east:41, west:40, down:0}, enter:function(terminal) {
				playerlocation[currentplayer]=30
		}},
		31:{exits:{north:32, east:43, south:30, west:42}, enter:function(terminal) {
				playerlocation[currentplayer]=31
		}},
		32:{exits:{north:33, east:45, south:31, west:44}, enter:function(terminal) {
				playerlocation[currentplayer]=32
		}},
		33:{exits:{north:34, east:47, south:32, west:46}, enter:function(terminal) {
				playerlocation[currentplayer]=33
		}},
		34:{exits:{north:35, east:49, south:33, west:48}, enter:function(terminal) {
				playerlocation[currentplayer]=34
		}},
		35:{exits:{north:36, east:51, south:34, west:50}, enter:function(terminal) {
				playerlocation[currentplayer]=35
		}},	
		36:{exits:{north:37, east:53, south:35, west:52}, enter:function(terminal) {
				playerlocation[currentplayer]=36
		}},
		37:{exits:{north:38, east:55, south:36, west:54}, enter:function(terminal) {
				playerlocation[currentplayer]=37
		}},
		38:{exits:{north:39, east:57, south:37, west:56}, enter:function(terminal) {
				playerlocation[currentplayer]=38
		}},
		39:{exits:{east:59, south:38, west:58}, enter:function(terminal) {
				playerlocation[currentplayer]=39
		}},	
		40:{exits:{east:30}, enter:function(terminal) {
				playerlocation[currentplayer]=40
				lasthallway=30
		}},
		41:{exits:{west:30}, enter:function(terminal) {
				playerlocation[currentplayer]=40
				lasthallway=30
		}},
		42:{exits:{east:31}, enter:function(terminal) {
				playerlocation[currentplayer]=42
				lasthallway=31
		}},
		43:{exits:{west:31}, enter:function(terminal) {
				playerlocation[currentplayer]=43
				lasthallway=31
		}},
		44:{exits:{east:32}, enter:function(terminal) {
				playerlocation[currentplayer]=44
				lasthallway=32
		}},
		45:{exits:{west:32}, enter:function(terminal) {
				playerlocation[currentplayer]=45
				lasthallway=32
		}},
		46:{exits:{east:33}, enter:function(terminal) {
				playerlocation[currentplayer]=46
				lasthallway=33
		}},
		47:{exits:{west:33}, enter:function(terminal) {
				playerlocation[currentplayer]=47
				lasthallway=33
		}},
		48:{exits:{east:34}, enter:function(terminal) {
				playerlocation[currentplayer]=48
				lasthallway=34
		}},
		49:{exits:{west:34}, enter:function(terminal) {
				playerlocation[currentplayer]=49
				lasthallway=34
		}},
		50:{exits:{east:35}, enter:function(terminal) {
				playerlocation[currentplayer]=50
				lasthallway=35
		}},
		51:{exits:{west:35}, enter:function(terminal) {
				playerlocation[currentplayer]=51
				lasthallway=35
		}},
		52:{exits:{east:36}, enter:function(terminal) {
				playerlocation[currentplayer]=52
				lasthallway=36
		}},
		53:{exits:{west:36}, enter:function(terminal) {
				playerlocation[currentplayer]=53
				lasthallway=36
		}},
		54:{exits:{east:37}, enter:function(terminal) {
				playerlocation[currentplayer]=54
				lasthallway=37
		}},
		55:{exits:{west:37}, enter:function(terminal) {
				playerlocation[currentplayer]=55
				lasthallway=37
		}},
		56:{exits:{east:38}, enter:function(terminal) {
				playerlocation[currentplayer]=56
				lasthallway=38
		}},
		57:{exits:{west:38}, enter:function(terminal) {
				playerlocation[currentplayer]=57
				lasthallway=38
		}},
		58:{exits:{east:39}, enter:function(terminal) {
				playerlocation[currentplayer]=58
				lasthallway=39
		}},
		59:{exits:{west:39}, enter:function(terminal) {
				playerlocation[currentplayer]=59
				lasthallway=39
		}},
	},
	status: {
		alive: true,
	},
	
	goTo: function(terminal, id) {
		movesdone++
		Adventure.location = Adventure.rooms[id];
		if (Adventure.location.enter) {
			Adventure.location.enter(terminal);
		}
		Adventure.look(terminal);
		silent_move=false
		using_computer=false
		if (wayofplaying == 1) {
			calledfrom='go'
			Adventure.gamemode(terminal);
		}
	}
};

playerlocation[currentplayer] = Adventure.location = Adventure.rooms[0];

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
}

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
	} else {
		Terminal.print('Could not find a question to answer "yes" to.');
	}
}

TerminalShell.commands['no'] = function(terminal) {
	if (menu == 'newgame') {
		Terminal.print('No new game has been started, please refresh the page if you want to continue playing.');
	} else if (menu == 'ghostplayer2teleport') {
		ghostmove=0
		Adventure.gamemode(terminal);
		gameover=0
		Terminal.runCommand('end');
	} else {
		Terminal.print('Could not find a question to answer "no" to.');
	}
}

TerminalShell.commands['1'] = function(terminal) {
	if (menu == 'wayofplaying') {
		Terminal.print('Singleplayer selected.');
		wayofplaying=1;
		menu='gamemode';
		Terminal.print('Please choose a gamemode:');
		Terminal.print($('<p>').html('<a href="javascript:clicked(1);">1. Ghost</a>'));
	} else if (menu == 'gamemode') {
		gamemode=1 // Ghost Mode
		amountofplayers=2; // NPCs are players too, to make singleplayer and multiplayer work together more easily
		gameover=0;
		initializeEverything();
		timer();
	} else {
		Terminal.print('Could not find a question to answer "1" to.');
	}
}

TerminalShell.commands['2'] = function(terminal) {
	if (menu == 'wayofplaying') {
		Terminal.print('Local multiplayer selected.');
		wayofplaying=2;
		menu='gamemode';
		Terminal.print('Please choose a gamemode:');
		Terminal.print($('<p>').html('<a href="javascript:clicked(1);">1. Ghost (up to 2 players)</a>'));
	} else {
		Terminal.print('Could not find a question to answer "2" to.');
	}
}

TerminalShell.commands['3'] = function(terminal) {
	browser=navigator.appName
	if ((menu == 'wayofplaying') && ($.browser.name != 'msie' && $.browser.name != 'safari')) {
		gamemode=0;
		initializeEverything();
		createPDF();
		menu='wayofplaying';
		printgamemodemenu();
	} else {
		Terminal.print('Could not find a question to answer "3" to.');
	}
}

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
					if (gamemode == 1) {
						Terminal.setWorking(true);
						terminal.print('Searching for the ghost...');
						setTimeout("Terminal.print('You are at: Floor '+currentfloor+'.');", 2000);
						setTimeout("Terminal.print('The ghost is at: Floor '+ghostfloor+'.');", 2500);
						if (playerlocation[2] >= 0 && playerlocation[2] <= 9) {
							setTimeout("Terminal.print('The ghost is in the hallway.');", 3000);
						} else if (playerlocation[2] >= 10 && playerlocation[2] <= 99) {
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
				if (gamemode == 1) { // Ghost
					if (inventory.length >= 1) {
						terminal.print('Your inventory is full!');
					} else {
						terminal.print(roomcontainsitemlongname[objectid]+' has been put in your inventory.');
						inventory.push(object);
						roomcontainsitem[objectid].splice(roomcontainsitem[objectid].indexOf(playerlocation[currentplayer]), 1)
						description[playerlocation[currentplayer]] = descriptionbackup[playerlocation[currentplayer]]
						description[playerlocation[currentplayer]].splice(description[playerlocation[currentplayer]].indexOf(roomcontainsitemlongname[objectid]), 1)
						i = playerlocation[currentplayer]
						createDescription(playerlocation[currentplayer]);
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
		if (gamemode == 1) {
			ghostmove=0
			Adventure.gamemode(terminal);
			if (currentplayer == 1) {
				gameover = 0
			}
			if (currentplayer == 2) {
				gameover = 1
				if (playerlocation[2] >= 10) {
					ghostlocationinfo='You are in a room.'
					if (playerlocation[2]%2 == 0 && Adventure.location.exits['east'] == playerlocation[1]) {
						playerlocationinfo='Player 1 is in the hallway directly east of you.'
					} else if (playerlocation[2]%2 != 1 && Adventure.location.exits['west'] == playerlocation[1]) {
						playerlocationinfo='Player 1 is in the hallway directly west of you.'
					} else {
						playerlocationinfo='Player 1 is not close to you.'
					}
				} else {
					ghostlocationinfo='You are in the hallway.'
					if (playerlocation[1] <= 9) {
						playerlocationinfo='Player 1 is in the hallway as well.'
					} else {
						playerlocationinfo='Player 1 is in a room.'
					}
				}
				terminal.print('You are the ghost. '+ghostlocationinfo+' '+playerlocationinfo);
				terminal.print('Do you want to teleport to a random location?');
				Terminal.print($('<p>').html('<a href="javascript:clicked(\'yes\');">Yes</a> or <a href="javascript:clicked(\'no\');">No</a>'));
				menu='ghostplayer2teleport'
			}
		}
	} else {
		terminal.print('This action cannot be executed now.');
	}
}

// Gamemode-specific code
Adventure.gamemode = function(terminal) {
	if (gamemode == 1) { // Ghost
		if (wayofplaying == 1) {
			ghostmove=getRandomInt(1,10) // Decides if the Ghost moves
		}
		if (ghostmove == 1) {
			amountofghostmoves++
			playerlocation[2]=getRandomInt(0, (roomAmount));
		}
		if (playerlocation[1] == playerlocation[2]) {
			if ($.inArray(ghostweakness, inventory) != -1) {
				if (wayofplaying == 1 || (wayofplaying == 2 && currentplayer == 1)) {
					terminal.print('You use the '+ghostweakness+' in your inventory on the ghost.');
					terminal.print('The ghost makes a terrible noise and disappears.');
					terminal.print('GAME OVER!');
				} else {
					terminal.print('Player one uses '+ghostweakness+' on you!');
					terminal.print('You scream in agony as your body fades away.');
					terminal.print('GAME OVER!');
				}
				gameresult='won'
				gameover=1
			} else {
				if ((getRandomInt(0,1) == 1)) {
					if (wayofplaying == 1 || (wayofplaying == 2 && currentplayer == 1)) {
						terminal.print('The ghost got you! GAME OVER!');
					} else {
						terminal.print('You got player 1! GAME OVER!');
					}
					gameresult='lost'
					gameover=1
				} else {
					if (wayofplaying == 1 || (wayofplaying == 2 && currentplayer == 1)) {
						terminal.print('BOO!');
					} else {
						terminal.print('You find player 1, but are unable to do more than scare him.');
					}
					shake($('#screen'));
					amountofscaressurvived++
					amountofghostmoves++
					ghostlocationfloor=getRandomInt(1,1)
					if (getRandomInt(1,2) == 1) {
						ghostlocationroom=getRandomInt(0, hallway_length);
					} else {
						ghostlocationroom=getRandomInt(0,(roomAmount))
					}
					if (ghostlocationfloor == 1) {
						playerlocation[2]=ghostlocationroom
						if ((playerlocation[2] > hallway_length) && (playerlocation[2] <=9)) {
							playerlocation[2] = hallway_length
						}
					}
				}
			}
		} else {
			if (getRandomInt(1,20) == 1) {
				if (wayofplaying == 1 || (wayofplaying == 2 && currentplayer == 1)) {
					terminal.print('You feel a cold shiver...');
				}
			}
		}
	}
	if ((gameresult=='won') || (gameresult=='lost')) {
		Adventure.gameresult(terminal);
	}
};

Adventure.gameresult = function(terminal) {
	clearInterval(window.playTimeTimer);
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
		terminal.print('Playtime: '+playTime+' seconds.');
		terminal.print('');
		if (gameresult == 'lost') {
			if (wayofplaying == 1) {
				terminal.print('The game was LOST');
			} else if (wayofplaying == 2) {
				terminal.print('Player 2 WON');
			}
		} else if (gameresult == 'won') {
			if (wayofplaying == 1) {
				terminal.print('The game was WON');
			} else if (wayofplaying == 2) {
				terminal.print('Player 1 WON');
			}
		} else {
			terminal.print('The game ended with an undefined status (neither won nor lost)');
		}
	}
	menu='newgame'
	gameover=1
	terminal.print('Do you want to start a new game?');
	Terminal.print($('<p>').html('<a href="javascript:clicked(\'yes\');">Yes</a> or <a href="javascript:clicked(\'no\');">No</a>'));
};

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
	for (i = 0; i <= roomAmount; i++) {
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
	window.playTime=0;
	window.playTimeTimer=setInterval("playTime++", 1000);
}

function printgamemodemenu() {
	browser=navigator.appName
	Terminal.print('Please choose a way of playing:');
	Terminal.print($('<p>').html('<a href="javascript:clicked(1);">1. Singleplayer</a>'));
	Terminal.print($('<p>').html('<a href="javascript:clicked(2);">2. Local multiplayer</a>'));
	if ($.browser.name != 'msie' && $.browser.name != 'safari') {
		Terminal.print($('<p>').html('<a href="javascript:clicked(3);">3. Offline</a>'));
	}
}

// Make stuff clickable for mobile devices
function clicked(what) {
	Terminal.runCommand(''+what+'');
	if ((what != 'look' || what != 'yes') && menu != '' && gameresult != 'start' ) {
		setTimeout("Terminal.runCommand('look');", 2000);
	}
	gameresult = 'playing';
}

// Print the inventory list when "Inventory" is chosen in the menu
function onOptionsItemSelected() {
	Terminal.runCommand('inventory');
}

TerminalShell.commands['suicide'] = function(terminal) {
	gameover=1;
	gameresult='lost';
	Adventure.gameresult(terminal);
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
			Terminal.print($('<p>').html('Textmode version 20120923, Copyright (c) 2012 <a href="https://github.com/TheLastProject">Ruben van Os</a>'));
			Terminal.print($('<p>').html('Textmode comes with ABSOLUTELY NO WARRANTY; for details <a href="https://raw.github.com/TheLastProject/textmode/master/LICENSE">click here</a>.'));
			Terminal.print($('<p>').html('This is free software, and you are welcome to redistribute it under certain conditions; <a href="https://raw.github.com/TheLastProject/textmode/master/LICENSE">click here</a> for details or <a href="https://github.com/TheLastProject/textmode">click here</a> for the source code to this project.'));
			Terminal.print('');
			Terminal.print($('<p>').html('<a href="javascript:clicked(\'help\');">Click here or type "help" for instructions on how to play.</a>'));
			Terminal.print('');
			menu='wayofplaying'
			printgamemodemenu();
			Terminal.promptActive = true;
		}, noData);
});