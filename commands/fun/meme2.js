const { Command } = require('discord.js-commando');
const https = require('https');
const got = require('got');

module.exports = class SecondmemeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'meme2',
            aliases: [''],
            group: 'fun',
            memberName: 'memes2',
            description: 'Sends sends the space-fact of the day',
            examples: ['space']
        });
      }

    run(msg) {
        console.log('Getting memes');
        msg.say('Getting you a meme, one sec')
        got('https://api.imgflip.com/get_memes', { json: true }).then(response => {
	  console.log(response.body.memes);
	  console.log(response.body.explanation);
	}).catch(error => {
	  console.log(error.response.body);
	});

  };
}