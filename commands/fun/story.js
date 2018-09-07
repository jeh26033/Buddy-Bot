const {Command} = require('discord.js-commando');

module.exports = class StoryCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'story',
            aliases:['storytime','stew'],
            group: 'basic',
            memberName: 'story',
            description: 'Tells an epic yarn.',
            examples: ['tell me a story']
        });
    }
    run(msg) {
        console.log("tellin a story");
        return msg.say("Only the most pure and delicious of the red meats," +
            " this heavenly red and tasty protein is surely a gift from above!\n" +
            " https://en.wikipedia.org/wiki/Beef#/media/File:Standing-rib-roast.jpg");
    }
};