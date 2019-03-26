const {Command} = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reply',
            group: 'basic',
            memberName: 'reply',
            description: 'Replies with a Message.',
            examples: ['reply'],
            validate: text => {
    if (text.length < 201) return true;
}
        });
    }
    run(message) {
        this.client.emit("guildMemberAdd", message.member);
        message.channel.send("Test").then(sentMessage => sentMessage.edit("Blah"));
        //return msg.say('@here');

    }
};