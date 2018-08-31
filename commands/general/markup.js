const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');
const { RichEmbed } = require('discord.js');


module.exports = class MarkdownCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'markdown',
            group: 'general',
            memberName: 'markdown',
            description: 'sends a nice message with discord markdown info',
            details: oneLine `Sends a nice embed with the discord markdown shortcuts in it.`,
            examples: ['markdown']


        });
    }
    run(message) {
      const botlog=this.client.channels.find('name','bot-logs');
      botlog.send('Markdown used');
      console.log('Spreading lovely markdowns');
      const embed = {
        "title": "Mark downs",
        
        "color": 9442302,
        "fields": [
          {
            "name": "*Italics*",
            "value": "```*italics* or _italics_```"
          },
          {
            "name": "**Bold**",
            "value": "```**bold**```"
          },
          {
            "name": "***Bold-Italics***",
            "value": "```***bold-italics***```"
          },
          {
            "name": "__Underline__",
            "value": "```__underline__```"
          },
          {
            "name": "__*Underline Italics*__",
            "value": "```__*Underline Italics*__```"
          },
          {
            "name": "__**Bold-Underline**__",
            "value": "```__**Bold-Underline**__```"
          },
          {
            "name": "__***Bold-Underline-italics***__",
            "value": "```__***Bold-Underline-italics***__```"
          },
          {
            "name": "~~Strikethrough~~",
            "value": "```~~Strikethrough~~```"
          }
        ]
      };
      message.say({ embed });
    }

};