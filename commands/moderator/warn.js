const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');
const { RichEmbed } = require('discord.js');

module.exports = class WarnCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'warn',
      group: 'moderator',
      memberName: 'warn',
      description: 'Warns a user.',
      details: oneLine`
        Warning a user is useful for minor, first time rule violations.
        This command warns a user, DMs the user warned, and posts in the mod log channel.
        Permission is locked to moderators and above.
			`,
      examples: ['warn @Bob being a bad apple'],
      args: [{
        key: 'user',
        label: 'user',
        prompt: 'Who would you like to warn? Please mention one only.',
        type: 'member',
        clientPermissions: ['MANAGE_ROLES'],
        infinite: false
      },
      {
        key: 'reason',
        label: 'reason',
        prompt: 'Why is the user being warned?',
        type: 'string',
        infinite: false
      }],
      guildOnly: true
    });
  }
  

  run(message, args) {
    const botlog=this.client.channels.find('name','bot-logs');

    console.log('verifying persimmons')
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.say('You have no power here!');
    console.log('sending warning');
    args.user.send(`
    ':bangbang: **Moderation action** :scales:'
    You have been warned on the server "${message.guild}"!
    Staff member: ${message.author.tag}
    Reason: "${args.reason}"`).catch(console.error);
    
    botlog.send(`${message.author.tag} warned ${args.user}, better watch out or nothing will happen`);
 
  }
  
};