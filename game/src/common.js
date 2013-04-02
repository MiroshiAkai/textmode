amountofplayers=1;
playerlocation=1;
singleplayermodes = new Array();
multiplayermodes = new Array();

// Ignore enter. This prevents "clicked" events being resent when the player types a command
$('html').bind('keypress', function(e)
{
   if(e.keyCode == 13)
   {
      return false;
   }
});

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

function timer() {
	window.playTime=0;
	window.playTimeTimer=setInterval("playTime++", 1000);
}

function showGameResult() {
	clearInterval(window.playTimeTimer);
	Terminal.print('');
	Terminal.print('=== Game Statistics ===');
	Terminal.print('Gamemode: '+gamemode);
	if (mutator == 1) {
		Terminal.print('Mutator: Turn-based');
	} else if (mutator == 2) {
		Terminal.print('Mutator: Realtime');
	} else {
		Terminal.print('Mutator: Unknown');
	}
	Terminal.print('Amount of moves: '+amountofmoves+'.');
	Terminal.print('Amount of rooms entered: '+amountofroomsentered+'.');
	if (gamemode == "ghost") {
		ghostResult();
	}
	var minutesPlayTime = Math.floor(playTime/60);
	var secondsPlayTime = playTime % 60;
	if (minutesPlayTime == 1 && secondsPlayTime == 0) {
		Terminal.print('Playtime: '+minutesPlayTime+' minute.');
	} else if (minutesPlayTime == 1 && secondsPlayTime == 1) {
		Terminal.print('Playtime: '+minutesPlayTime+' minute and '+secondsPlayTime+' second.');
	} else if (minutesPlayTime == 1 && secondsPlayTime > 1) {
		Terminal.print('Playtime: '+minutesPlayTime+' minute and '+secondsPlayTime+' seconds.');
	} else if (minutesPlayTime > 1 && secondsPlayTime == 0) {
		Terminal.print('Playtime: '+minutesPlayTime+' minutes.');
	} else if (minutesPlayTime > 1 && secondsPlayTime == 1) {
		Terminal.print('Playtime: '+minutesPlayTime+' minutes and '+secondsPlayTime+' second.');
	} else if (minutesPlayTime > 1 && secondsPlayTime > 1) {
		Terminal.print('Playtime: '+minutesPlayTime+' minutes and '+secondsPlayTime+' seconds.');
	} else {
		Terminal.print('Playtime: '+playTime+' seconds.');
	}
	Terminal.print('');
	if (gameresult == 'lost') {
		if (wayofplaying == 1) {
			Terminal.print('The game was LOST');
		} else if (wayofplaying == 2) {
			Terminal.print('Player 2 WON');
		}
	} else if (gameresult == 'won') {
		if (wayofplaying == 1) {
			Terminal.print('The game was WON');
		} else if (wayofplaying == 2) {
			Terminal.print('Player 1 WON');
		}
	} else {
		Terminal.print('The game ended with an undefined status (neither won nor lost)');
	}
	menu='newgame'
	gameover=1
	Terminal.print('Do you want to start a new game?');
	Terminal.print($('<p>').html('<a href="javascript:clicked(\'yes\');">Yes</a> or <a href="javascript:clicked(\'no\');">No</a>'));
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
	Terminal.promptActive = false;
	Terminal.runCommand(''+what+'');
	if ((what != 'look' || what != 'yes') && menu != '' && gameresult != 'start' ) {
		setTimeout("Terminal.runCommand('look');", 2000);
	}
	Terminal.promptActive = true;
}


// Print the inventory list when "Inventory" is chosen in the menu
function onOptionsItemSelected() {
	Terminal.runCommand('inventory');
}
