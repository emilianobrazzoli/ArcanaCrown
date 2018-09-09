        var suits = [':hearts:', ':diamonds:', ':clubs:', ':spades:'];
        var ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

        module.exports = {
            //eheheheh
            shaffle: function(playerDeck) {
                //todo control parameter: if there are number and if they are <=8
                playerDeck.card = [];

                var ordered = [];
                //for each type of suit
                for (var i = 0; i < suits.length; i++) {
                    //and for each rank
                    for (var j = 0; j < ranks.length; j++) {
                        //make a card
                        var card = {};
                        card.suit = suits[i];
                        card.rank = ranks[j];
                        card.type = 'minor';
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