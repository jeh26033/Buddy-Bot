const {Command} = require('discord.js-commando');

module.exports = class ShootCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kill',
            group: 'fun',
            memberName: 'kill',
            description: 'Asks who to :gun:, and then pings them with a :gun:',
            examples: ['reply'],
            args:[
                {
                    key:'user',
                    prompt:'WHO NEEDS POPPIN',
                    type:'user'
                }
            ]
        });
    }
    run(msg, { user }) {
        console.log('BANG BANG');
        msg.say('takin aim');
        user.send(':gun: BLAPBLAPBLAPBLAPBLAPBRRRRRRRRRP :gun:');
        return msg.say('Finished that foo');
    }
};