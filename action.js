
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
                    var card = toDraw.card[(toDraw.card.length - i - 1)];
                    if(message!==''){
                      message=message+', ';
                    }
                    message = message + card.rank + ' ' + card.suit;
                } else if (toDraw.card.length === 0) {
                    message = message+'\nHai pescato tutto';
                    break;
                } else {
                    message = 'ERROR 01';
                    break;
                }
            }
            if (message === '') {
                message = 'ERROR 05: nessuna carta trovata!';
            }
        } else {
            message = 'Hai pescato tutto, mescola';
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
                    var card = toDraw.card.splice((toDraw.card.length - 1), 1)[0];
                    toDraw.graveyard.push(card);
                    if(message!==''){
                      message=message+', ';
                    }
                    message = message + card.rank + ' ' + card.suit;
                } else if (toDraw.card.length === 0) {
                    message = message+'\nHai pescato tutto, mescola e ripesca  '+ (cardsNumber-i)+' carte';
                    break;
                } else {
                    message = 'ERROR 02';
                    break;
                }
            }
            if (message === '') {
                message = 'ERROR 04: nessuna carta trovata!';
            }
        } else {
            message = 'Hai pescato tutto, mescola e ripesca';
        }
        return message;

    },
     graveyard : function(playerDeck) {
        //todo control parameter: if there are number and if they are <=8
        var toDraw = playerDeck;

        var message = '';
        if (toDraw.graveyard.length > 0) {
            for (var i = 0; i < toDraw.graveyard.length; i++) {
                var card = toDraw.graveyard[(i)];
                    if(message!==''){
                      message=message+', ';
                    }
                    message = message+ card.rank + ' ' + card.suit;
            }
            if (message === '') {
                message = 'ERROR 03: nessuna carta trovata!';
            }
        } else {
            message = 'Non hai mai pescato';
        }
        return message;
    }
};