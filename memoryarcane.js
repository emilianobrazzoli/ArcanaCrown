var delegate = require('./delegate.js');

var find = function(channelID) {
    var channel = delegate.findById(channelID);
    if (channel === null || channel.id === null || channel.id === undefined) {

        var toAdd = {
            decks: [],
            c: null,
            t: null,
            id: channelID
        }
        console.log('Add new channel');
        delegate.create(toAdd);
        return toAdd;
    } else {
        console.log('found ' + channel.id);
        return channel;
    }

}


var getChannel = function(channelID) {
    return find(channelID);
}

var setChannel = function(channelID, channelToAdd) {
    try {
        delegate.merge(channelID, channelToAdd);
        return channelToAdd;
    } catch (error) {
        console.log('Server setChannel error: ' + error);
        return false;
    };
}

module.exports = {
    getChannel: function(channelID) {
        return getChannel(channelID);
    },
    setChannel: function(channelID, channelToAdd) {
        return setChannel(channelID, channelToAdd);
    }
}