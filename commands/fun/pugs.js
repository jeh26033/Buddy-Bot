const {Command} = require('discord.js-commando');

module.exports = class PugsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pug-please',
            aliases:['im sad','pugs'],
            group: 'basic',
            memberName: 'pugs',
            description: 'sends a random pug',
            examples: ['pugs']
        });
    }
    run(msg) {
        console.log("Delivering happiness");
     

        var math = Math.random(100);
        console.log(math);
        if (math > .2) {
            var pug = "https://media.giphy.com/media/vbnbQsMr3Gbm/giphy.gif"
        }
        if (math > .3) {
            var pug = "https://media.giphy.com/media/3oEdv898CETgzT5vxu/giphy.gif"
        }
        if (math > .4) {
            var pug = "https://media.giphy.com/media/vbnbQsMr3Gbm/giphy.gif"
        }
        if (math > .5) {
            var pug = "https://media.giphy.com/media/dTJd5ygpxkzWo/giphy.gif"
        }
        if (math > .6) {
            var pug = "https://media.giphy.com/media/3lxD1O74siiz5FvrJs/giphy.gif"
        }
        if (math > .7) {
            var pug = "https://media.giphy.com/media/tYaF80CM7YL96/giphy.gif"
        }
        if (math >= .8) {
            var pug = "https://media.giphy.com/media/ZfPQAbzRm0dZ6/giphy.gif"

        }
        msg.say(pug);
       
    }
};