const {Command} = require('discord.js-commando');

module.exports = class DespacitoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            aliases:['play'],
            group: 'basic',
            memberName: 'play',
            description: 'with a song',
            examples: ['play despacito'],
            args: [{
                key: 'video',
                label: 'media',
                prompt: 'Play What?',
                type: 'string',
                infinite: false
              }]
           
        });
    }
    run(msg,args) {
        if (args='despacito') {
            return msg.say(`https://www.youtube.com/watch?v=kJQP7kiw5Fk`);
        }else{
            return msg.say(`https://www.youtube.com/watch?v=kJQP7kiw5Fk`);
        }
    }
};
