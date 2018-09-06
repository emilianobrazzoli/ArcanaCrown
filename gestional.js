

    var minor = require('./minor.js');
    
        var decks = [];

        // take the position of the player deck
        function deckPosition(playerName) {
            var deckPosition = decks.length;
            for (var x = 0; x < decks.length; x++) {
                if (decks[x].player === playerName) {
                    deckPosition = x
                }
            }
            //if there isn't a deck it will create one
            if (deckPosition === decks.length) {
                var toAdd ={
                    card: [],
                    hand: [],
                    graveyard: [],
                    player: playerName
                };
                minor.shaffle(toAdd);
                decks.push(toAdd);
            }

            return deckPosition;
        }

        var deck = function (playerName){
            return decks[deckPosition(playerName)];
        }
        // reset all the deck
        var reset = function() {
            decks = [];
        }

      var init = function(playerName) {
        //todo controll the player name
        var deckPosition = deckPosition(playerName);
        // if is the first time it will shaffle two time
        //todo better code
        shaffle(deckPosition);
    }

    module.exports = {
        command : function(userID, channelID, message) {
            var respond ={ who: userID,
                what:'Cannot find an appropriate answer',
                where:channelID
            }
            if (decks.length >= 80) {
                respond.what = 'To many deck on memory! At the end of the game reset all!';
            }
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
                                respond.what = 'draw: '+ minor.drawCard(deck(userID), args[2]);
                            } else {
                                respond.what = 'Command wrong: declare draw how many cards es /d draw 52';
                            }
                            break;
                        case 'shaffle':
                            if (args.length === 2) {
                                init(userID);
                                respond.what = 'shaffled';
                            } else {
                                respond.what = 'Command wrong: declare a shaffle es /d shaffle';
                            }
                            break;
                        case 'reveal':
                            if (args.length === 3) {
                                respond.what = 'reveal: '+minor.reveal(deck(userID), args[2]);
                            } else {
                                respond.what = 'Command wrong: declare reveal how many cards es /d reveal 52';
                            }
                            break;
                        case 'graveyard':
                            if (args.length === 3) {
                                respond.what = 'graveyard: '+ minor.graveyard(deck(userID));
                            } else {
                                respond.what = 'Command wrong: declare graveyard and how many cards es /d graveyard 1';
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
                                respond.what = 'reset all deck!';
                            } else {
                                respond.what = 'Command wrong: declare reset /d reset';
                            }
                            break;
                            // Just add any case commands if you want to..
                    }
                }
            }
            return respond;
        }
    };