	var Discord = require("discord.js");
	//var logger = require('winston');
	//var auth = require('./auth.json');   // for local
	var gestional = require('./gestional.js');
	//logger.level = 'debug';

  console.log('Your app is init');
	//Initialize Discord Bot
	var bot = new Discord.Client();

	var cmd = function( message) {
      if (message.content.substring(0, 2) == '/d') {
        var respond = gestional.command(message.member, '', message.content);
        message.reply( respond.what);
		  }
	};

  bot.on("ready", () =>  {
	    console.log('Connected');
	    console.log('Logged in as: ');
	    console.log(bot.username + ' - (' + bot.id + ')');
	});

  // message.channel
	bot.on('message',  message =>{
      cmd(message);
      });

  bot.login(process.env.TOKEN);
  console.log('Your app create bot' );