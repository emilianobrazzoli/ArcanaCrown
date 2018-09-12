var Discord = require("discord.js");
//var logger = require('winston');
//var auth = require('./auth.json');   // for local
var gestional = require('./gestional.js');
//logger.level = 'debug';

console.log('Your app is init');
//Initialize Discord Bot
var bot = new Discord.Client();

var cmd = function(message) {
    if (message.content.substring(0, 2) == '/d') {
        var respond = gestional.commandDecks(message.author.id, message.channel.id, message.content.toString().toLowerCase(), message);
    } else if (message.content.substring(0, 2) == '/c') {
        var respond = gestional.commandCommon(message.author.id, message.channel.id, message.content.toString().toLowerCase(), message);
    } else if (message.content.substring(0, 2) == '/t') {
        var respond = gestional.commandTarot(message.author.id, message.channel.id, message.content.toString().toLowerCase(), message);
    }
};

bot.on("ready", () => {
    console.log('Connected');
    console.log('Logged');
    console.log('Arcana Crown will open a portal');
});

// message.channel
bot.on('message', message => {
    cmd(message);
});

bot.login(process.env.TOKEN);
console.log('Your app create bot');

console.log(Date.now() + " Can we meet at the a coffee machine?");
