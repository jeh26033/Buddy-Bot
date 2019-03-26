const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');
const { RichEmbed } = require('discord.js');

module.exports = class pruneuserCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pruneuser',
      group: 'moderator',
      memberName: 'pruneusers',
      description: 'Prunes inactive users.',
      details: oneLine`
        Define whether this is a dry run, and how many days inactive people need to be in order to be pruned.
			`,
     
      args: [{
        key: 'dryrun',
        label: 'dryrun',
        prompt: 'is this a dry run?',
        type: 'boolean',
        clientPermissions: ['MANAGE_ROLES'],
        infinite: false
      },
      {
        key: 'days',
        label: 'days',
        prompt: 'how many days of inactivity?',
        type: 'integer',
        infinite: false
      }],
      guildOnly: true
    });
  }
  

  run(message, args) {
    const botlog=this.client.channels.find('name','bot-logs');
    console.log('verifying persimmons');


    if(!message.member.hasPermission('MANAGE_ROLES')) return message.say('You have no power here!');

    if (args.dryrun===true) {
      message.guild.pruneMembers(args.days, true)
      .then(pruned => message.reply(`This will prune ${pruned} people!`))
      .catch(console.error);
    }
    if (args.dryrun===false) {
      message.guild.pruneMembers(args.days)
        .then(pruned => message.reply(`I just pruned ${pruned} people!`))
        .catch(console.error);
    }
   
  }
  
};