initializeVariables();

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

// Ask the gamemode in question to initialize itself. Preferrably, this will automatically do "gamemodeInit()" stuff. [FIXME] when you have time.
function initializeGamemode() {
	gamemodeInit();
};

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
			roomdescription[i] = roomdescription[i] + ' The fluorescent lamp shines brightly. '
		} else if (lightstatus[i] == 1) {
			roomdescription[i] = roomdescription[i] + ' The fluorescent lamp flickers. '
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
				roomdescription[i] = roomdescription[i] + ' It only contains <a href="javascript:clicked(\''+window.itemaction[itemnumber]+' '+window.roomcontainsitemname[itemnumber]+'\')">'+description[i].shift()+'</a>.';
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
			gamemodeMain();
		}
	}
};

Adventure.location = Adventure.rooms[0];

$(document).ready(function() {
	Terminal.promptActive = false;
	function noData() {
		Terminal.print($('<p>').addClass('error').text('Unable to load startup data. :-('));
		Terminal.promptActive = true;
	}
	$('#screen').bind('cli-load', function(e) {
		$('#screen').one('cli-ready', function(e) {
		});
			Terminal.print($('<p>').html('Textmode version 20130331, Copyright (c) 2012-2013 <a href="https://github.com/TheLastProject">Ruben van Os</a>'));
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
