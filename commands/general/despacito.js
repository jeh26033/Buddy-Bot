const {Command} = require('discord.js-commando');

module.exports = class DespacitoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play despacito',
            aliases:['despacito','play-despacito'],
            group: 'basic',
            memberName: 'despacito',
            description: 'Replies with a bad song.',
            examples: ['play despacito'],
           
        });
    }
    run(msg) {
        
        return msg.say(`https://www.youtube.com/watch?v=kJQP7kiw5Fk`);

    }
};
