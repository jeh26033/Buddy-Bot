const {Command} = require('discord.js-commando');

module.exports = class ayyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ayy',
            group: 'basic',
            memberName: 'ayy',
            description: 'goes ayy, lmao',
            examples: ['ayy']
        });
    }
    run(msg) {
        console.log('aayyy!')
        
        return msg.say(`:laughing: LMAO`);
    }
};