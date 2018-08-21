const { Command } = require('discord.js-commando');
const https = require('https');

module.exports = class SpacejamCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'space-jam',
            aliases: ['space-fact', 'space'],
            group: 'fun',
            memberName: 'memes',
            description: 'Sends sends the space-fact of the day',
            examples: ['space']
        });
      }

    run(msg) {
        console.log('Here is a space fact');
        msg.say('Getting you a fact, one sec')
        https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            msg.say('here is NASA Space fact of the day');
            msg.say(JSON.parse(data).explanation);
        });

        }).on("error", (err) => {
          console.log("Error: " + err.message);
        });

  };
}