var Discord = require("discord.js");
//var logger = require('winston');
//var auth = require('./auth.json');   // for local
var gestional = require('./gestional.js');
//logger.level = 'debug';

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

//coffeeeeee every 3 minuts
/**/
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
    response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    http.get(`http://caffeinabot.glitch.me/`);
    http.get(`http://caffeinabot2.glitch.me/`);
}, 280000);
