const {Command} = require('discord.js-commando');

module.exports = class HugCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hug',
            group: 'fun',
            memberName: 'hug',
            description: 'Asks who to hug, and then sends them a nice hug',
            examples: ['reply'],
            args:[
                {
                    key:'user',
                    prompt:'WHO NEEDS hugging.',
                    type:'user'
                }
            ]
        });
    }
    run(msg, { user }) {
        console.log('Hugged!');
        msg.say('takin aim');
        msg.say('HAVE HUG');
        return msg.say('HUGGED that HUMAN');
    }
};