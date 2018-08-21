const { Command } = require('discord.js-commando');
const https = require('https');

module.exports = class ScheduleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ti8',
            aliases: ['ti 8', 'schedule','group stage'],
            group: 'games',
            memberName: 'ti8',
            description: 'Sends the schedule for the most recent esports tournament',
            examples: ['ti 8 schedule']
        });
      }

    run(msg) {
        console.log('getting you a schedule');
        msg.say('WELCOME. To the INTERNATIONAL EIGHT')
       const embed = {
        "title": "schedule",
        "description": "```A nice list of schedule```",
        "color": 9442302,
        "fields": [
          {
            "name": "*August 15, 2018 - 12:00 EDT*",
            "value": "``````"
          },
          {
            "name": "**IG vs MSKI**",
            "value": "```****```"
          },
          {
            "name": "***PSG.LGD vs OG***",
            "value": "```******```"
          },
          {
            "name": "**EG VS VGJ.T**",
            "value": "```watch this one```"
          },
          {
            "name": "**Liquid VS Fnatic**",
            "value": "``````"
          }
          
        ]
      };
      msg.say({ embed });
    }
    
}