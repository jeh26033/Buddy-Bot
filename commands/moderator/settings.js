const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');
const { RichEmbed } = require('discord.js');
const fs = require('fs');
const os = require('os');
const settings = require("../../settings.json");

module.exports = class settingsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'settings',
      group: 'moderator',
      memberName: 'settings',
      description: 'changes various settings',
      details: oneLine`
        use this command when introducing your new buddy to your server.
        This will set multiple variables such as: what channel to use for stars,
        a bot-log, a user to make fun of, etc. 
			`,
      examples: ['settings starboard'],
      args: [{
        key: 'setting',
        label: 'set',
        prompt: 'What setting would you like to change? Options currently include: starboard and user',
        type: 'string',
        clientPermissions: ['MANAGE_ROLES'],
        infinite: false
      },  
      {
        key: 'command',
        label: 'com',
        prompt: 'What would you like to change that to?',
        type: 'string',
        clientPermissions: ['MANAGE_ROLES'],
        infinite: false
      }],
      guildOnly: true
    });
  }
  

  run(message, args) {
    console.log(settings.starboard);
    console.log('verifying persimmons');
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.say('You have no power here!');


    if (args.setting === 'starboard') {
      console.log('changing starboard');
      let settings = {
        starboard: args.command,
      }
      let data = JSON.stringify(settings, null, 2);
      fs.writeFile('settings.json', data, err => console.error);
      //fs.writeFileSync('settings.json', data);

    }
    if (args.setting === 'user') {
      console.log('changing user');
      let settings = {
        user: args.command,
      }
      let data = JSON.stringify(settings, null, 2);
      fs.writeFileSync('settings.json', data);

    }
  }
  
};