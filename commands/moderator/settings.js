const Discord = require('discord.js');
const editJsonFile = require("edit-json-file");
const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');
const { RichEmbed } = require('discord.js');
const fs = require('fs');
const os = require('os');
const client = new Discord.Client();
//const settings = require("../../settings.json");
const stalkSettings = require("../../stalkSettings.json");
module.exports = class settingsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'settings',
      group: 'moderator',
      memberName: 'settings',
      description: 'changes various settings',
      details: oneLine`
        Use this command when introducing your new buddy to your server.
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

    let guildName = `settings/settings_${message.guild.id}`
    let file = editJsonFile(`${guildName}.json`);

    // file.set("starboard", "");

    // file.set("botlog", "");
    // file.set("stalk", "false");



    //console.log(settings.starboard);
    console.log('verifying persimmons');
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.say('You have no power here!');


    if (args.setting === 'starboard') {
      console.log('changing starboard');
      file.set("starboard", args.command);

    }

    if (args.setting === 'stalk') {
      console.log('changing stalk setting');
      file.set("stalk", args.command);

    }
    if (args.setting === 'print') {
      var myJSON = JSON.stringify(file.get());
      console.log('printing settings');
      message.channel.send(myJSON);

    }
   
    file.save();
    message.channel.send('resetting...')
  }
  
};