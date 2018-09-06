var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');


var decks = [];
var suits = ['cuori', 'quadri', 'fiori', 'picche'];
var ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

var deckCommand = function() {



}
var reveal = function(deckNumber, cardsNumber) {
	//todo control parameter: if there are number and if they are <=8, <=52
	var toDraw = decks[deckNumber];
	var message = '';
	if (toDraw.card.length > 0 && cardsNumber > 0) {
		if (toDraw.card.length - cardsNumber < 0) {
			cardsNumber = toDraw.card.length;
		}
		for (var i = 0; i < cardsNumber; i++) {
			if (toDraw.card.length > 0) {
				card = toDraw.card[(toDraw.card.length - i - 1)];
				message = message+'   '+ card.rank + ' ' + card.suit;
			} else if (toDraw.card.length === 0) {
				bot.sendMessage({
					to: channelID,
					message: '@'+userID+' You have no more card to reveal  '
				});
				break;
			} else {
				bot.sendMessage({
					to: channelID,
					message: '@'+userID+' ERROR 01 '
				});
				break;
			}
		}
		if(message === ''){
			message = 'No found card';
		}
		bot.sendMessage({
			to: channelID,
			message: '@'+userID+' '+message
		});
	} else {
		bot.sendMessage({
			to: channelID,
			message: '@'+userID+' You have no more card to reveal '
		});
	}
}
var drawCard = function(deckNumber, cardsNumber) {
	//todo control parameter: if there are number and if they are <=8, <=52
	var toDraw = decks[deckNumber];
	var message = '';
	if (toDraw.card.length > 0 && cardsNumber > 0) {
		for (var i = 0; i < cardsNumber; i++) {
			if (toDraw.card.length > 0) {
				card = toDraw.card.splice((toDraw.card.length - 1), 1)[0];
				toDraw.graveyard.push(card);
				message = message+'   '+ card.rank + ' ' + card.suit;
			} else if (toDraw.card.length === 0) {
				bot.sendMessage({
					to: channelID,
					message: '@'+userID+' You drawed all the card, shaffle and draw '
				});
				break;
			} else {
				bot.sendMessage({
					to: channelID,
					message: '@'+userID+' ERROR 02 '
				});
				break;
			}
		}
		if(message === ''){
			message = 'No found card';
		}
		bot.sendMessage({
			to: channelID,
			message: '@'+userID+' '+message
		});
	} else {
		bot.sendMessage({
			to: channelID,
			message: '@'+userID+' You drawed all the card, shaffle and draw ' + (cardsNumber) + ' cards '
		});
	}

}
var graveyard = function(deckNumber) {
	//todo control parameter: if there are number and if they are <=8
	var toDraw = decks[deckNumber];

	var message = '';
	if (toDraw.graveyard.length > 0) {
		for (var i = 0; i < toDraw.graveyard.length; i++) {
			card = toDraw.graveyard[(i)];
			message=message+'   '+card.rank + ' ' + card.suit;
		}
		if(message === ''){
			message = 'No found card';
		}
		bot.sendMessage({
			to: channelID,
			message: '@'+userID+' '+message
		});
	}else{
		bot.sendMessage({
			to: channelID,
			message: '@'+userID+' You have no card in the graveyard '
		});
	}

}
var shaffle = function(deckNumber) {
	//todo control parameter: if there are number and if they are <=8

	var ordered = [];
	//for each type of suit
	for (var i = 0; i < suits.length; i++) {
		//and for each rank
		for (var j = 0; j < ranks.length; j++) {
			//make a card
			var card = {};
			card.suit = suits[i];
			card.rank = ranks[j];
			ordered.push(card);
		}
	}

	if (ordered.length > 0) {
		for (var x = 0; x < 52; x++) {
			var randIndex = Math.floor(Math.random() * ordered.length);
			var cards = ordered.splice(randIndex, 1);
			decks[deckNumber].card.push(cards[0]);
		}
	}

}
var init = function(playerName) {
	//todo controll the player name
	var deckPosition = deckPosition(playerName);
	// if is the first time it will shaffle two time
	//todo better code
	shaffle(deckPosition);
}

function deckPosition(playerName) {
	var deckPosition = decks.length;
	for (var x = 0; x < decks.length; x++) {
		if (decks[x].player === playerName) {
			deckPosition = x
		}
	}
	//if there isn't a deck it will create one
	if (deckPosition === decks.length) {
		decks.push({
			card: [],
			hand: [],
			graveyard: [],
			player: playerName
		})
		shaffle(deckPosition);
	}

	return deckPosition;
}

var reset= function(){
	decks= [];
}

//Configure logger settings
logger.remove(logger.transports.Console);
//logger.add(logger.transports.Console, {
//	colorize: true
//});
logger.level = 'debug';
//Initialize Discord Bot
var bot = new Discord.Client({
	token: auth.token,
	autorun: true
});
bot.on('ready', function(evt) {
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function(user, userID, channelID, message, evt) {

	var boxValue = message;
	// Our bot needs to know if it will execute a command
	// It will listen for messages that will start with `/d`
	if (boxValue.substring(0, 2) == '/d') {
		var args = boxValue.substring(1).split(' ');
		if (args.length >= 2) {
			var cmd = args[1];

			switch (cmd) {
			// !ping
			case 'ping':
				alert('pong');
				break;
			case 'draw':
				if (args.length === 3) {
					bot.sendMessage({
						to: channelID,
						message: '@'+userID+' draw: '
					});
					drawCard(deckPosition(userID), args[2]);
				} else {
					bot.sendMessage({
						to: channelID,
						message: '@'+userID+' Command wrong: declare draw how many cards es /d draw 52'
					});
				}
				break;
			case 'shaffle':
				if (args.length === 2) {
					init(userID);
					bot.sendMessage({
						to: channelID,
						message: '@'+userID+' shaffled: '
					});
				} else {
					bot.sendMessage({
						to: channelID,
						message: '@'+userID+' Command wrong: declare a shaffle es /d shaffle'
					});
				}
				break;
			case 'reveal':
				if (args.length === 3) {
					bot.sendMessage({
						to: channelID,
						message: '@'+userID+' reveal: '
					});
					reveal(deckPosition(userID), args[2]);
				} else {
					bot.sendMessage({
						to: channelID,
						message: '@'+userID+'Command wrong: declare reveal how many cards es /d reveal 52'
					});
				}
				break;
			case 'graveyard':
				if (args.length === 3) {
					bot.sendMessage({
						to: channelID,
						message: '@'+userID+' graveyard: '
					});
					graveyard(deckPosition(userID));
				} else {
					bot.sendMessage({
						to: channelID,
						message: '@'+userID+'Command wrong: declare graveyard and how many cards es /d graveyard 1'
					});
				}
				break;
			case 'top':
				break;
			case 'discard':
				break;
			case 'hand':
				break;
			case 'reset':
				if (args.length === 2) {
					reset();
					bot.sendMessage({
						to: channelID,
						message: '@'+userID+' reset all deck! '
					});
				} else {
					bot.sendMessage({
						to: channelID,
						message: '@'+userID+'Command wrong: declare reset /d reset'
					});
				}
				break;
				// Just add any case commands if you want to..
			}
		}
	}
});