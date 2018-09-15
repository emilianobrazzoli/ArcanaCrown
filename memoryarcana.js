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
        return channel;
        console.log('modify channel');
    }

}


var getChannel = function(channelID) {
    return find(channelID);
}

var setChannel = function(channelID, channelToAdd) {
    try {
        channelToAdd.insertTime = Date.now() ;
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
