    var Discord = require('discord.io');
    
	var auth = require('./auth.json');
module.exports = {
         send : function(who, where, what){
             	var bot = new Discord.Client({
                    token: auth.token,
                    autorun: true
                });
            bot.sendMessage({
                            to: where,
                            message: '@'+who+' '+ what
                        });
        }
    };              