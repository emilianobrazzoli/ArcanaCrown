
module.exports = {
     reveal : function(playerDeck, cardsNumber) {
        //todo control parameter: if there are number and if they are <=8, <=52
        var localDeck = playerDeck;
        var message = '';
        if (localDeck.card.length > 0 && cardsNumber > 0) {
            if (localDeck.card.length - cardsNumber < 0) {
                cardsNumber = localDeck.card.length;
            }
            for (var i = 0; i < cardsNumber; i++) {
                if (localDeck.card.length > 0) {
                    var card = localDeck.card[(localDeck.card.length - i - 1)];
                    if(message!==''){
                      message=message+', ';
                    }
                    message = message + card.rank + ' ' + card.suit;
                } else if (localDeck.card.length === 0) {
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
        var localDeck = playerDeck;
        var message = '';
        if (localDeck.card.length > 0 && cardsNumber > 0) {
            for (var i = 0; i < cardsNumber; i++) {
                if (localDeck.card.length > 0) {
                    var card = localDeck.card.splice((localDeck.card.length - 1), 1)[0];
                    localDeck.graveyard.push(card);
                    if(message!==''){
                      message=message+', ';
                    }
                    message = message + card.rank + ' ' + card.suit;
                } else if (localDeck.card.length === 0) {
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
        var localDeck = playerDeck;

        var message = '';
        if (localDeck.graveyard.length > 0) {
            for (var i = 0; i < localDeck.graveyard.length; i++) {
                var card = localDeck.graveyard[(i)];
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
    },
    rando : function(playerDeck){
        var localDeck = playerDeck;
        if (localDeck.card.length > 0) {
            for (var x = 0; x <  localDeck.card.length; x++) {
                var randIndex = Math.floor(Math.random() * localDeck.card.length);
                var cards = localDeck.card.splice(randIndex, 1);
                playerDeck.card.push(cards[0]);
            }
        }

    },
    top : function(playerDeck, rank, type){
        var localDeck = playerDeck;
        var done = false;
        var card ={};
        card.rank =rank;
        card.type= type;
        if (localDeck.graveyard.length > 0) {
            for (var i = 0; i < localDeck.graveyard.length; i++) {
                if(card.type === 'minor'){//future implementation per suite
                    if(card.rank.toString().toLowerCase() == localDeck.graveyard[i].rank.toString().toLowerCase()){
                        var cards = playerDeck.graveyard.splice(i, 1);
                        playerDeck.card.push(cards[0]);
                        done = true;
                    }
                }else if(card.type === 'major'){
                    if(card.rank.toString().toLowerCase() == localDeck.graveyard[i].rank.toString().toLowerCase()){
                        var cards = localDeck.graveyard.splice(i, 1);
                        playerDeck.card.push(cards[0]);
                        done = true;
                    }
                }else{
                    //wtf man?
                    return false;
                }
            }
            return done;
        }else{
            return false;
        }

    },
    place : function(playerDeck, rank, type){
        var done =this.top(playerDeck,rank, type);
        this.rando(playerDeck);
        return done;
    }
};