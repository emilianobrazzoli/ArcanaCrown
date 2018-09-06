        var dialog = require('./dialog.js');

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

        // reset all the deck
        var reset = function() {
            decks = [];
        }


    module.exports = {
        command : function(userID, channelID, message) {
            if (decks.length >= 80) {
                dialog.send(userID, channelID, 'To many deck on memory! At the end of the game reset all!');
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
                                dialog.send(userID, channelID, 'draw:');
                                drawCard(deckPosition(userID), args[2]);
                            } else {
                                dialog.send(userID, channelID, 'Command wrong: declare draw how many cards es /d draw 52');
                            }
                            break;
                        case 'shaffle':
                            if (args.length === 2) {
                                init(userID);
                                dialog.send(userID, channelID, 'shaffled:');
                            } else {
                                dialog.send(userID, channelID, 'Command wrong: declare a shaffle es /d shaffle');
                            }
                            break;
                        case 'reveal':
                            if (args.length === 3) {
                                dialog.send(userID, channelID, 'reveal:');
                                reveal(deckPosition(userID), args[2]);
                            } else {
                                dialog.send(userID, channelID, 'Command wrong: declare reveal how many cards es /d reveal 52');
                            }
                            break;
                        case 'graveyard':
                            if (args.length === 3) {
                                dialog.send(userID, channelID, 'graveyard:');
                                graveyard(deckPosition(userID));
                            } else {
                                dialog.send(userID, channelID, 'Command wrong: declare graveyard and how many cards es /d graveyard 1');
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
                                dialog.send(userID, channelID, 'reset all deck!');
                            } else {
                                dialog.send(userID, channelID, 'Command wrong: declare reset /d reset');
                            }
                            break;
                            // Just add any case commands if you want to..
                    }
                }
            }
        }
    };