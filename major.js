        var ranks = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI', '0'];
        var suits = ['Il Bagatto', ' La Papessa', 'L\'Imperatrice', 'L Imperatore', 'Il Papa', 'Gli Amanti', 'Il Carro',
            'La Forza', 'L\'Eremita', 'La Ruota della Fortuna', 'La Giustizia', 'L\'Appeso', 'La Morte', 'La Temperanza',
            'Il Diavolo', 'La Torre', 'Le Stelle', 'La Luna', 'Il Sole', 'Il Giudizio', 'Il Mondo', 'Il Matto'
        ];


        module.exports = {
            //eheheheh
            shaffle: function(playerDeck) {
                //todo control parameter: if there are number and if they are <=8
                playerDeck.card = [];
                var ordered = [];
                //for each type of suit
                for (var i = 0; i < suits.length; i++) {
                    //and for each rank
                    //make a card
                    var card = {};
                    card.suit = suits[i];
                    card.rank = ranks[i];
                    card.type = 'major';
                    ordered.push(card);
                }

                if (ordered.length > 0) {
                    for (var x = 0; x < 22; x++) {
                        var randIndex = Math.floor(Math.random() * ordered.length);
                        var cards = ordered.splice(randIndex, 1);
                        playerDeck.card.push(cards[0]);
                    }
                }

            }
        };