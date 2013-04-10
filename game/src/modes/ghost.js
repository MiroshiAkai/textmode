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

function gamemodeInit() {
	window.inventorylimit = 1;
	window.gamemodeInitialized = false;
	window.gamemodeTime = 0;
	gamemodeTimer=setInterval("gamemodeTime++", 1);
	randomInt=getRandomInt(2,4);
	// window.ghostweakness=itemname[randomInt]; // Can reenable this when the new item system is in place. FIXME
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
	window.gamemodeInitialized=true
	clearInterval(gamemodeTimer);
};

function gamemodeMain() {
	if (gamemode == "ghost") { // Ghost
		if (wayofplaying == 1) {
			ghostmove=getRandomInt(1,5) // Decides if the Ghost moves
		}
		if (ghostmove == 1) {
			amountofghostmoves++
			playerlocation[2]=getRandomInt(0, (roomAmount));
		}
		if (playerlocation[1] == playerlocation[2]) {
			if ($.inArray(ghostweakness, inventory) != -1) {
				if (wayofplaying == 1 || (wayofplaying == 2 && currentplayer == 1)) {
					Terminal.print('You use the '+ghostweakness+' in your inventory on the ghost.');
					Terminal.print('The ghost makes a terrible noise and disappears.');
					Terminal.print('GAME OVER!');
				} else {
					Terminal.print('Player one uses '+ghostweakness+' on you!');
					Terminal.print('You scream in agony as your body fades away.');
					Terminal.print('GAME OVER!');
				}
				gameresult='won'
				gameover=1
			} else {
				if ((getRandomInt(0,1) == 1)) {
					if (wayofplaying == 1 || (wayofplaying == 2 && currentplayer == 1)) {
						Terminal.print('The ghost got you! GAME OVER!');
					} else {
						Terminal.print('You got player 1! GAME OVER!');
					}
					gameresult='lost'
					gameover=1
				} else {
					if (wayofplaying == 1 || (wayofplaying == 2 && currentplayer == 1)) {
						Terminal.print('BOO!');
					} else {
						Terminal.print('You find player 1, but are unable to do more than scare him.');
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
					Terminal.print('You feel a cold shiver...');
				}
			}
		}
	}
	if ((gameresult=='won') || (gameresult=='lost')) {
		showGameResult();
	}
};

function gamemodeEndTurn() {
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
		Terminal.print('You are the ghost. '+ghostlocationinfo+' '+playerlocationinfo);
		Terminal.print('Do you want to teleport to a random location?');
		Terminal.print($('<p>').html('<a href="javascript:clicked(\'yes\');">Yes</a> or <a href="javascript:clicked(\'no\');">No</a>'));
		menu='ghostplayer2teleport'
	}
}

function gamemodeUseComputer() {
	Terminal.setWorking(true);
	Terminal.print('Searching for the ghost...');
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
}
function gamemodeIncreaseChance() {
	if (logged_in == true && ($.inArray(ghostweakness, inventory) != -1) && gamemode == 1) {
		if (getRandomInt(0,2) == 1) {
			if (wayofplaying == 1 || (wayofplaying == 2 && currentplayer == 1)) {
				Terminal.print('You use the '+ghostweakness+' in your inventory on the ghost.');
				Terminal.print('The ghost makes a terrible noise and disappears.');
				Terminal.print('GAME OVER!');
			} else {
				Terminal.print('Player one uses '+ghostweakness+' on you!');
				Terminal.print('You scream in agony as your body fades away.');
				Terminal.print('GAME OVER!');
			}
			gameresult='won'
			gameover=1
		}
	}
};

function gamemodeResult() {
	Terminal.print('Amount of ghost moves: '+amountofghostmoves+'.');
	Terminal.print('Amount of scares survived: '+amountofscaressurvived+'.');
};

initializeEverything(); //Done loading, time to init!
timer(); // Oh yeah, and start running a timer. We want to tell players how long they've been playing for at the end.
