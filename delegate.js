var JsonDB = require('node-json-db');

var clean = function() {
    var db = new JsonDB('arcanaDB', false, false);
    
    try {
        var find = db.getData('/channelList/');
        if (find === null || find === undefined) {
            return null;
        } 
        for(var key in find) {
            if(find.hasOwnProperty(key)) {
                var channel = find[key];
                var difference = Date.now() - channel.insertTime;
                if(difference>1 ){ //if(difference>10800000 ){
                    console.log('Clean: ' + channel.id);
                    db.delete('/channelList/'+channel.id);
                    db.save();
                }
            }
        }
    } catch (error) {
        console.log('Server clean error: ' + error);
        return;
    }
}

var findById = function(channelID) {
    var db = new JsonDB('arcanaDB', false, false);
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
    var db = new JsonDB('arcanaDB', false, false);
    try {
        db.push('/channelList/' + channelID, channelToMerge);
        db.save();
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
    },
    clean: function() {
        return clean();
    }
}
