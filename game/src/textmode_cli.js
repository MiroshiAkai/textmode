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
		window.room[i]["items"] = [];
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
	initializeItems();
};

// Initialize Items
function initializeItems() {
	items = [];
	for (var i = 0; i <= 6; i++) {
		items[i] = [];
		items[i]["name"] = [];
		items[i]["longname"] = [];
		items[i]["action"] = [];
		items[i]["min"] = [];
		items[i]["max"] = [];
	};
	items["computer"] = 0;
	items[0]["name"] ="computer";
	items[0]["longname"] = "a computer";
	items[0]["action"] = "use";
	items[0]["min"] = 1;
	items[0]["max"] = 1;
	items["note"] = 1;
	items[1]["name"] ="note";
	items[1]["longname"] = "a note";
	items[1]["action"] = "use";
	items[1]["min"] = 1;
	items[1]["max"] = 1;
	items["flashlight"] = 2;
	items[2]["name"] = "flashlight";
	items[2]["longname"] = "a flashlight";
	items[2]["action"] = "take";
	items[2]["min"] = 1;
	items[2]["max"] = 1;
	items["crayons"] = 3;
	items[3]["name"] = "crayons";
	items[3]["longname"] = "a box of crayons";
	items[3]["action"] = "take";
	items[3]["min"] = 1;
	items[3]["max"] = 100;
	items["screwdriver"] = 4;
	items[4]["name"] ="screwdriver";
	items[4]["longname"] = "a screwdriver";
	items[4]["action"] = "take";
	items[4]["min"] = 1;
	items[4]["max"] = 1;
	items["clock"] = 5;
	items[5]["name"] = "clock";
	items[5]["longname"] = "a clock";
	items[5]["action"] = "none";
	items[5]["min"] = -1;
	items[5]["max"] = -1;
	items["drawer"] = 6;
	items[6]["name"] = "drawer";
	items[6]["longname"] = "a drawer";
	items[6]["action"] = "none";
	items[6]["min"] = -1;
	items[6]["max"] = -1;
 
 	for (var i = 0; i < items.length; i++) {
		var placed = 0;
		while (items[i]["min"] > placed) { // At least place the minimum required
			var placeat = getRandomInt(0,(room.length-1));
			if (room[placeat]["items"].indexOf(items[i]["name"]) == -1) { // Check if this room doesn't already have the item
				room[placeat]["items"].push(items[i]["name"]);
				placed++;
			};
		};
		while ((items[i]["max"] > placed) || (items[i]["max"] == -1)) { // Make sure we're not placing too much
			if (getRandomInt(0,10) != 0) { // Are we going to place more? The mystery! The tension!
				var placeat = getRandomInt(0,(room.length-1));
				if (room[placeat]["items"].indexOf(items[i]["name"]) == -1) {
					room[placeat]["items"].push(items[i]["name"]);
					placed++;
				};
			} else {
				break;
			};
		};
	};
};

function createDescription() {
	var description = [];
	if (room[playerlocation[currentplayer]]["items"].length >= 1) {
		for (var i = 0; i < room[playerlocation[currentplayer]]["items"].length; i++) {
			description.push(room[playerlocation[currentplayer]]["items"][i]);
		};
	};
	console.log(description);
	var roomdescription = "You are in a room.";
	for (var j = 0; j <= description.length; j++) {
		if (j == 0 && description.length >= 2) {
			if (items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"] != "none") {
				roomdescription = roomdescription + ' The room contains <a href="javascript:clicked(\''+items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"]+' '+items[items[room[playerlocation[currentplayer]]["items"][j]]]["name"]+'\')">'+description.splice(0,1)+'</a>';
			} else {
				roomdescription = roomdescription + ' The room contains '+description.splice(0,1);
			};
		} else if (j == 0 && description.length >= 1) {
			if (items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"] != "none") {
				roomdescription = roomdescription + ' It only contains <a href="javascript:clicked(\''+items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"]+' '+items[items[room[playerlocation[currentplayer]]["items"][j]]]["name"]+'\')">'+description.splice(0,1)+'</a>.';
			} else {
				roomdescription = roomdescription + ' It only contains '+description.splice(0,1)+'.'
			};
		} else if (j == 0) {
			roomdescription = roomdescription + ' It is empty.'
		};
		if (j == 1 && description.length >= 3) {
			if (items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"] != "none") {
				roomdescription = roomdescription + ', <a href="javascript:clicked(\''+items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"]+' '+items[items[room[playerlocation[currentplayer]]["items"][j]]]["name"]+'\')">'+description.splice(0,1)+'</a>';
			} else {
				roomdescription = roomdescription + ', '+description.splice(0,1)
			};
		} else if (j == 1) {
			if (items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"] != "none") {
				roomdescription = roomdescription + ' and <a href="javascript:clicked(\''+items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"]+' '+items[items[room[playerlocation[currentplayer]]["items"][j]]]["name"]+'\')">'+description.splice(0,1)+'</a>.';
			} else {
				roomdescription = roomdescription + ' and '+description.splice(0,1)+'.'
			};
		};
		if (j == 2) {
			if (items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"] != "none") {
				roomdescription = roomdescription + ', and <a href="javascript:clicked(\''+items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"]+' '+items[items[room[playerlocation[currentplayer]]["items"][j]]]["name"]+'\')">'+description.splice(0,1)+'</a>.';
			} else {				
				roomdescription = roomdescription + ', and '+description.splice(0,1)+'.'
			};
		};
		if (j == 3 && description.length >= 5) {
			if (items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"] != "none") {
				roomdescription = roomdescription + ' It also contains <a href="javascript:clicked(\''+items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"]+' '+items[items[room[playerlocation[currentplayer]]["items"][j]]]["name"]+'\')">'+description.splice(0,1)+'</a>';
			} else {
				roomdescription = roomdescription + ' It also contains '+description.splice(0,1)
			};
		} else if (j == 3) {
			if (items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"] != "none") {
				roomdescription = roomdescription + ' It also contains <a href="javascript:clicked(\''+items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"]+' '+items[items[room[playerlocation[currentplayer]]["items"][j]]]["name"]+'\')">'+description.splice(0,1)+'</a>.';
			} else {
				roomdescription = roomdescription + ' It also contains '+description.splice(0,1)+'.'
			};
		};
		if (j == 4 && description.length >= 6) {
			if (items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"] != "none") {
				roomdescription = roomdescription + ', <a href="javascript:clicked(\''+items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"]+' '+items[items[room[playerlocation[currentplayer]]["items"][j]]]["name"]+'\')">'+description.splice(0,1)+'</a>';
			} else {			
				roomdescription = roomdescription + ', '+description.splice(0,1)
			};
		} else if (j == 4) {
			if (items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"] != "none") {
				roomdescription = roomdescription + ' and <a href="javascript:clicked(\''+items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"]+' '+items[items[room[playerlocation[currentplayer]]["items"][j]]]["name"]+'\')">'+description.splice(0,1)+'</a>.';
			} else {
				roomdescription = roomdescription + ' and '+description.splice(0,1)+'.'
			};
		};
		if (j == 5) {
			if (items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"] != "none") {
				roomdescription = roomdescription + ' and <a href="javascript:clicked(\''+items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"]+' '+items[items[room[playerlocation[currentplayer]]["items"][j]]]["name"]+'\')">'+description.splice(0,1)+'</a>.';
			} else {
				roomdescription = roomdescription + ' and '+description.splice(0,1)+'.'
			};
		};
		if (j == 6 && description.length == 7) {
			if (items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"] != "none") {
				roomdescription = roomdescription + ' You can also see <a href="javascript:clicked(\''+items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"]+' '+items[items[room[playerlocation[currentplayer]]["items"][j]]]["name"]+'\')">'+description.splice(0,1)+'</a>.';
			} else {			  
				roomdescription = roomdescription + ' You can also see '+description.splice(0,1)+'.'
			};
		} else if (j == 6 && description.length >= 8) {
			if (items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"] != "none") {
				roomdescription = roomdescription + ' You can also see <a href="javascript:clicked(\''+items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"]+' '+items[items[room[playerlocation[currentplayer]]["items"][j]]]["name"]+'\')">'+description.splice(0,1)+'</a>';
			} else {		  
				roomdescription = roomdescription + ' You can also see '+description.splice(0,1)
			};
		};
		if (j == 7) {
			for (var j = 7; j <= description.length-1; j++) {
				if (items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"] != "none") {
					roomdescription = roomdescription + ', <a href="javascript:clicked(\''+items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"]+' '+items[items[room[playerlocation[currentplayer]]["items"][j]]]["name"]+'\')">'+description.splice(0,1)+'</a>';
				} else {			  
					roomdescription = roomdescription + ', '+description.splice(0,1)
				};
			};
			if (j == description.length) {
				if (items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"] != "none") {
					roomdescription = roomdescription + ' and <a href="javascript:clicked(\''+items[items[room[playerlocation[currentplayer]]["items"][j]]]["action"]+' '+items[items[room[playerlocation[currentplayer]]["items"][j]]]["name"]+'\')">'+description.splice(0,1)+'</a>.';
				} else {			  
					roomdescription = roomdescription + ' and '+description.splice(0,1)+'.'
				};
			};
		};
	};
	Terminal.print($('<p>').html(roomdescription));
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
			Terminal.print($('<p>').html('Textmode development version 20130420, Copyright (c) 2012-2013 <a href="https://github.com/TheLastProject">Ruben van Os</a>'));
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
