/**
 *
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * Copyright (C) 2012-2013  Ruben van Os
 *
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
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


initializeVariables();

function objectNameToId(object) {
	switch (object) {
	case "computer": return 0;
	case "note": return 1;
	case "flashlight": return 2;
	case "crayons": return 3;
	case "screwdriver": return 4;
	case "clock": return 5;
	case "drawer": return 6;
	default: return -1;
	};
};

function getInfoForClickableItems() {
	var item = description[i].slice(0,1);
	for (var k = 0; k < window.roomcontainsitem.length; k++) {
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

// Ask the gamemode in question to initialize itself.
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
	if (hallway_length >= 1 && hallway_length <= 9) window.roomAmount = hallway_length * 2 + 11 + 30 * (amount_of_floors-1);
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
	window.mutator=1;
	window.currentplayer=1;
	window.movesdone=0;
	window.gotlogininfo=false;
	window.variablesInitialized=true;
	window.playerlocation = new Array();
	for (var i = 1; i<=amountofplayers; i++) {
		window.playerlocation[i]=getRandomInt(0, roomAmount);
	}
	clearInterval(variablesTimer);
}

//Generate Rooms
function initializeRooms() {
	window.roomsInitialized=false
	window.roomTime = 0
	roomTimer=setInterval("roomTime++", 1);
	var minX = 1;
	var maxX = 20;
	var roomX = getRandomInt(minX,maxX);
	var minY = 1;
	var maxY = 20;
	var roomY = getRandomInt(minY,maxY);
	var minFloor = 1;
	var maxFloor = 2;
	var roomFloor = getRandomInt(minFloor,maxFloor);
	window.room = []; // The room variable is written in this way: X, Y, Floor, Exit(s), Item(s)
	for (var i = 0; i < 100; i++) {
		window.roomExists = false; // Would be great if you could scope this correctly. [FIXME - Non-Urgent]
		window.room[i] = [];
		window.room[i]["x"] = roomX;
		window.room[i]["y"] = roomY;
		window.room[i]["floor"] = roomFloor;
		window.room[i]["exit"] = [];
		for (var j = 0; j < i; j++) { // Check if there is already a room at the same location
			if ((room[j]["x"] == roomX) && (room[j]["y"] == roomY) && (room[j]["floor"] == roomFloor)) {
				switch (exit) {
					case "north": var oppExit = "south"; break;
					case "east": var oppExit = "west"; break;
					case "south": var oppExit = "north"; break;
					case "west": var oppExit = "east"; break;
					case "up": var oppExit = "down"; break;
					case "down": var oppExit = "up"; break;
				};
				if (room[j]["exit"].indexOf(oppExit) == -1) { room[j]["exit"].push(oppExit); };
				window.roomExists = true;
			};
		};
		var possibleExits = [];
		if (roomY < maxY) { possibleExits.push("north"); }
		if (roomX < maxX) { possibleExits.push("east"); }
		if (roomY > minY) { possibleExits.push("south"); }
		if (roomX > minX) { possibleExits.push("west"); }
		if (roomFloor < maxFloor) { possibleExits.push("up"); }
		if (roomFloor > minFloor) { possibleExits.push("down"); }
		var exit = possibleExits[getRandomInt(0,(possibleExits.length-1))];
		if (roomExists == true) {
		} else {
			if (room[i]["exit"].indexOf(oppExit) == -1) { room[i]["exit"].push(exit); };
		};
		switch (exit) {
			case "north": roomY++; break;
			case "east": roomX++; break;
			case "south": roomY--; break;
			case "west": roomX--; break;
			case "up": roomFloor++; break;
			case "down": roomFloor--; break;
		};
		if (roomExists == true) {
			i--; // Regenerate a proper room instead of the buggy one we just created
		};
	};
	roomsInitialized=true
	clearInterval(roomTimer);
	window.playerlocation[1] = getRandomInt(0,99);
};

// Old, evil, broken code. FIXME
// function initializeItems() {
// 	window.roomsInitialized=false
// 	window.roomTime = 0
// 	roomTimer=setInterval("roomTime++", 1);
// 	window.rooms = new Array(roomAmount);
// 	window.roomdescription = new Array(roomAmount);
// 	window.lightstatus = new Array(roomAmount);
// 	window.itemlocation = new Array(5);
// 	for (var i = 0; i <= 5; i++) {
// 		randomInt=getRandomInt(1, amount_of_floors)
// 		if (randomInt == 1) {
// 			itemlocation[i] = getRandomInt(10, (10+(hallway_length*2-1)));
// 		} else {
// 			itemlocation[i] = getRandomInt(40, roomAmount);
// 		}
// 	}
// 	window.itemname = new Array(5);
// 	window.itemname[0]="computer"
// 	window.itemname[1]="note"
// 	window.itemname[2]="flashlight"
// 	window.itemname[3]="crayons"
// 	window.itemname[4]="screwdriver"
// 	window.note = new Array(roomAmount);
// 
// 	window.roomcontainsitem = new Array(7)
// 	for (var i = 0; i <=7; i++) {
// 		roomcontainsitem[i] = new Array
// 	}
// 	window.roomcontainsitemname = new Array(7)
// 	window.roomcontainsitemlongname = new Array(7)
// 	window.itemaction = new Array(7)
// 	window.roomcontainsitemname[0]="computer"
// 	window.roomcontainsitemlongname[0]="a computer"
// 	window.itemaction[0]="use"
// 	window.roomcontainsitemname[1]="note"
// 	window.roomcontainsitemlongname[1]="a note"
// 	window.itemaction[1]="use"
// 	window.roomcontainsitemname[2]="flashlight"
// 	window.roomcontainsitemlongname[2]="a flashlight"
// 	window.itemaction[2]="take"
// 	window.roomcontainsitemname[3]="crayons"
// 	window.roomcontainsitemlongname[3]="a box of crayons"
// 	window.itemaction[3]="take"
// 	window.roomcontainsitemname[4]="screwdriver"
// 	window.roomcontainsitemlongname[4]="a screwdriver"
// 	window.itemaction[4]="take"
// 	window.roomcontainsitemname[5]="clock"
// 	window.roomcontainsitemlongname[5]="a clock"
// 	window.itemaction[5]="none"
// 	window.roomcontainsitemname[6]="drawer"
// 	window.roomcontainsitemlongname[6]="a drawer"
// 	window.itemaction[6]="none"
// 
// 	window.description = new Array();
// 	window.descriptionbackup = new Array();
// 	for (var i = 0; i <= (roomAmount) ; i++){
// 		window.description[i] = new Array();
// 		window.descriptionbackup[i] = new Array();
// 		if (i >= 0 && i <= 9  || i >= 30 && i <= 39) { // Generate hallway
// 			lightstatus[i] = getRandomInt(1, 3)
// 		} else { // Generate rooms
// 			containsitem=0;
// 			for (var j = 0; j <= itemlocation.length; j++) {
// 				if (itemlocation[j] == 1) {
// 					containsitem=1
// 				}
// 			}
// 			if (getRandomInt(0,1) == 1 && containsitem != 0) {
// 				rooms[i]='locked'
// 				lockedcount++
// 				window.roomdescription[i]='The room is locked'
// 			} else {
// 				for (var j = 0; j <= roomcontainsitem.length; j++) {
// 					if (j <= itemlocation.length) {
// 						if (itemlocation[j] == i) {
// 							roomcontainsitem[j].push(i)
// 							description[i].push(roomcontainsitemlongname[j]);
// 						} else if (j >= 5) {
// 							if (getRandomInt(0,1) == 1) {
// 								roomcontainsitem[j].push(i)
// 								description[i].push(roomcontainsitemlongname[j]);
// 							}
// 						}
// 					}
// 				}
// 			}
// 		}
// 		// Create Description
// 		window.i = i
// 		createDescription();
// 	}
// 	roomsInitialized=true
// 	clearInterval(roomTimer);
// }

function createDescription() { // Old, evil, broken code. FIXME
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
	for (var j = 0; j <= description[i].length; j++) {
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
			for (var j = 7; j <= description[i].length-1; j++) {
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

$(document).ready(function() {
	Terminal.promptActive = false;
	function noData() {
		Terminal.print($('<p>').addClass('error').text('Unable to load startup data. :-('));
		Terminal.promptActive = true;
	}
	$('#screen').bind('cli-load', function(e) {
		$('#screen').one('cli-ready', function(e) {
		});
			Terminal.print($('<p>').html('Textmode version 20130406, Copyright (c) 2012-2013 <a href="https://github.com/TheLastProject">Ruben van Os</a>'));
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
