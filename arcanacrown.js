	var Discord = require('discord.io');
	var logger = require('winston');
	var auth = require('./auth.json');
	var gestional = require('./gestional.js');
        


	logger.level = 'debug';

	//Initialize Discord Bot
	var bot = new Discord.Client({
	    token: auth.token,
	    autorun: true
	});

	bot.on('ready', function(evt) {
	    logger.info('Connected');
	    logger.info('Logged in as: ');
	    logger.info(bot.username + ' - (' + bot.id + ')');
	});

	bot.on('message', function(user, userID, channelID, message, evt) {
	    gestional.command(userID, channelID, message);
	});
	