const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');

module.exports = class KickCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      group: 'moderator',
      memberName: 'kick',
      description: 'kicks member from server',
      details: oneLine`
        kicks someone from the discord

			`,
      examples: ['kick'],
      args: [{
        key: 'member',
        label: 'member',
        prompt: 'Who do you want to kick?',
        type: 'member',
        clientPermissions: ['MANAGE_ROLES'],
        infinite: false
      },{
        key: 'reason',
        label: 'reason',
        prompt: 'Reason for kick',
        type: 'string',
        infinite: false
      }],
      guildOnly: true
    });
  }


  

  run(message,args){
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.say('You have no power here!');

  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = args.member;
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {

        member.kick(args.reason).then(() => {
          // We let the message author know we were able to kick the person
          message.reply(`Successfully kicked ${user.tag}`);
        }).catch(err => {

          message.reply('I was unable to kick the member');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }


  
  };
  } 
  
};