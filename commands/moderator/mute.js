const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');
const { RichEmbed } = require('discord.js');

module.exports = class MuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'mute',
      group: 'moderator',
      memberName: 'mute',
      description: 'Mutes member ',
      details: oneLine`
        Mutes someone from the discord

			`,
      examples: ['Mute'],
      args: [{
        key: 'member',
        label: 'member',
        prompt: 'Who do you want to Mute?',
        type: 'member',
        clientPermissions: ['MANAGE_ROLES'],
        infinite: false
      },
     {
        key: 'time',
        label: 'time',
        prompt: 'How long do you want to mute them?',
        type: 'float',
        infinite: false
      }
      ],
      guildOnly: true
    });
  }


  

  run(message,args){
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.say('You have no power here!');

  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = args.member;
    // If we have a user mentioned
 
      // Now we get the member from the user
     
      // If the member is in the guild
      if (user) {

        user.addRole('560216107936383037', 'it needed to be done').then(() => {
          // We let the message author know we were able to kick the person
          message.reply(`Successfully muted ${user.name}`);
         
          
          console.log('unmuted')
           
        }).catch(err => {

          message.reply('I was unable to Mute the user');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
  } 
  
};