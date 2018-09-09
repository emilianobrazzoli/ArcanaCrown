        var channel = [];
        var positionChannel = function(channelID) {
            var position = channel.length;
            for (var i = 0; i < channel.length; i++) {
                if (channel[i].id === channelID) {
                    position = i;
                }
            }
            if (position === channel.length) {

                var toAdd = {
                    decks: [],
                    c: null,
                    t: null,
                    id: channelID
                }
                channel.push(toAdd);
                return position;
            } else {
                return position;
            }

        }

        var getChannel = function(channelID) {
            if (channel.length >= 80) {
                'Troppo mazzi per un cartomante! Quando finisci la partita lancia un: /d resetta!';
            }
            return channel[positionChannel(channelID)];
        }


        module.exports = {
            getChannel: function(channelID) {
                return getChannel(channelID);
            }
        }