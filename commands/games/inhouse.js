const {Command} = require('discord.js-commando');

module.exports = class InhouseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'inhouse',
            group: 'games',
            memberName: 'inhouse',
            description: 'Lets people join a queue for inhouses, then pings when enough people have joined',
            examples: ['Inhouse'],

        });
    }
    run(msg) {
        
        return msg.say('Hi, I\'m awake!');

    }
};