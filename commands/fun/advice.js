const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');
const { RichEmbed } = require('discord.js');
const request = require('request');

module.exports = class AdviceCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'advice',
      group: 'fun',
      memberName: 'advice',
      description: 'get some friendly advice',
      details: oneLine`
			Use this command to help you in life, love, and everything else. 
			`,
      examples: ['advice']
     
    });
  }
run(message, bot, send){
    let cn = request("http://api.adviceslip.com/advice", function (err, res, body) {
        try {
            let cnj = JSON.parse(body)
            message.channel.send(cnj.slip.advice)
        } catch (e) {
            return send("**Advice machine :b:roke**")
        }
    });
  } 
}