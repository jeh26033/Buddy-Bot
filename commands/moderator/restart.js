const {Command} = require('discord.js-commando');
const commando = require('discord.js-commando');
const { oneLine, stripIndents } = require('common-tags');
const { RichEmbed } = require('discord.js');
const Discord = require('discord.js');
module.exports = class RestartCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'restart',
            group: 'moderator',
            memberName: 'restart',
            description: 'rerstarts buddy.',
            examples: ['restart'],
           
        });
    }
    hasPermission(msg) {
    if (!this.client.isOwner(msg.author)) return 'Only the bot owner(s) may use this command.';    
    return this.client.isOwner(msg.author);
}
    run(msg) {
        

        resetBot();
        msg.channel.send('I\'m Back');

    }
};
