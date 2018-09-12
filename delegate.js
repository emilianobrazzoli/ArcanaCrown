var JsonDB = require('node-json-db');

var clean = function() {

}

var findById = function(channelID) {
    var db = new JsonDB('arcanaDB', true, false);
    db.reload();
    try {
        var find = db.getData('/channelList/' + channelID);
        if (find === null || find === undefined) {
            return null;
        } else {
            return find;
        }
    } catch (error) {
        console.log('Server findById error: ' + error);
        return null;
    };
}


var merge = function(channelID, channelToMerge) {
    var db = new JsonDB('arcanaDB', true, false);
    try {
        db.push('/channelList/' + channelID, channelToMerge);
        db.save();
        db.reload();
        clean();
        console.log('Server merged: ' + channelID);
        return true;
    } catch (error) {
        console.log('Server merge error: ' + error);
        return false;
    }
}

var create = function(channelToAdd) {
    merge(channelToAdd.id, channelToAdd);
}

module.exports = {

    findById: function(channelID) {
        return findById(channelID);
    },
    create: function(channelToAdd) {
        return create(channelToAdd);
    },
    merge: function(channelID, channelToMerge) {
        return merge(channelID, channelToMerge);
    }
}