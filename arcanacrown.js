var Discord = require("discord.js");
var gestional = require('./gestional.js');

const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(__dirname + '/dist/'));
app.use('/src/assets', express.static(__dirname + '/src/assets/'));
app.listen(process.env.PORT || 8080);

//Initialize Discord Bot
var bot = new Discord.Client();

var cmd = function(message) {
    if (message.content.substring(0, 2) == '/d') {
        console.log(message.author.id+' in '+ message.channel.id+' do '+ message.content.toString());
        var respond = gestional.commandDecks(message.author.id, message.channel.id, message.content.toString().toLowerCase(), message);
    } else if (message.content.substring(0, 2) == '/c') {
        console.log(message.author.id+' in '+ message.channel.id+' do '+ message.content.toString());
        var respond = gestional.commandCommon(message.author.id, message.channel.id, message.content.toString().toLowerCase(), message);
    } else if (message.content.substring(0, 2) == '/t') {
        console.log(message.author.id+' in '+ message.channel.id+' do '+ message.content.toString());
        var respond = gestional.commandTarot(message.author.id, message.channel.id, message.content.toString().toLowerCase(), message);
    }
};

bot.on("ready", () => {
    console.log('Arcana Crown will open a portal');
});

// message.channel
bot.on('message', message => {
    cmd(message);
});
bot.login(process.env.TOKEN);