const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');
const { RichEmbed } = require('discord.js');
const fs = require('fs');
const os = require('os');

module.exports = class suggestionsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'suggestions',
      aliases:['suggest','suggestion'],
      group: 'general',
      memberName: 'suggestions',
      description: 'temporary use suggestion command',
      details: oneLine`
        use to have suggestions.
			`,
      examples: ['suggestions'],
      args: [{
        key: 'suggestion',
        label: 'suggestion',
        prompt: 'what would you like to suggestion? this is anonymous',
        type: 'string',
        infinite: false
      }],
      guildOnly: true
    });
  }
  

  run(message, args) {
    console.log('suggestive conversation');
    if (message.channel.name === 'suggestion-box'){
      console.log('truthful elf');
      return message.channel.send({embed: {
        color: 0x8a2be2,
        title:`vote with :arrow_up: and :arrow_down:`,
        description: `Suggestion: ${args.suggestion}`
      }});
    }else {
      console.log('naughty elf');
      return message.channel.send({embed: {
          color: 0x8a2be2,
          description: 'Don\'t use that here'
          }})
        .then(msg => {
          msg.delete(10000)
        })
        .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
    }
  }
}