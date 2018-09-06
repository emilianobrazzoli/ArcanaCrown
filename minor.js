    
    var suits = [':hearts:', ':diamonds:', ':clubs:', ':spades:'];
    var ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

module.exports = {
     reveal : function(playerDeck, cardsNumber) {
        //todo control parameter: if there are number and if they are <=8, <=52
        var toDraw = playerDeck;
        var message = '';
        if (toDraw.card.length > 0 && cardsNumber > 0) {
            if (toDraw.card.length - cardsNumber < 0) {
                cardsNumber = toDraw.card.length;
            }
            for (var i = 0; i < cardsNumber; i++) {
                if (toDraw.card.length > 0) {
                    card = toDraw.card[(toDraw.card.length - i - 1)];
                    message = message + '   ' + card.rank + ' ' + card.suit;
                } else if (toDraw.card.length === 0) {
                    message = 'You have no more card to reveal';
                    break;
                } else {
                    message = 'ERROR 01';
                    break;
                }
            }
            if (message === '') {
                message = 'No found card';
            }
        } else {
            message = 'You have no more card to reveal';
        }
        return message;
    },
     drawCard : function(playerDeck, cardsNumber) {
        //todo control parameter: if there are number and if they are <=8, <=52
        var toDraw = playerDeck;
        var message = '';
        if (toDraw.card.length > 0 && cardsNumber > 0) {
            for (var i = 0; i < cardsNumber; i++) {
                if (toDraw.card.length > 0) {
                    card = toDraw.card.splice((toDraw.card.length - 1), 1)[0];
                    toDraw.graveyard.push(card);
                    message = message + '   ' + card.rank + ' ' + card.suit;
                } else if (toDraw.card.length === 0) {
                    message = message+'You drawed all the card, shaffle and'+ (cardsNumber)+' draw';
                    break;
                } else {
                    message = 'ERROR 02';
                    break;
                }
            }
            if (message === '') {
                message = 'No found card';
            }
        } else {
            message = 'You drawed all the card, shaffle and draw';
        }
        return message;

    },
     graveyard : function(playerDeck) {
        //todo control parameter: if there are number and if they are <=8
        var toDraw = playerDeck;

        var message = '';
        if (toDraw.graveyard.length > 0) {
            for (var i = 0; i < toDraw.graveyard.length; i++) {
                card = toDraw.graveyard[(i)];
                message = message + '   ' + card.rank + ' ' + card.suit;
            }
            if (message === '') {
                message = 'No found card';
            }
        } else {
            message = 'You have no card in the graveyard';
        }
        return message;
    },
     shaffle : function(playerDeck) {
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
                playerDeck.card.push(cards[0]);
            }
        }

    }
};