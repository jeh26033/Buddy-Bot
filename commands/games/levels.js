const { Command } = require('discord.js-commando');
const sql = require("sqlite");
sql.open("./score.sqlite"); 
module.exports = class LevelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'level',
            aliases: ['levels','check-level'],
            group: 'games',
            memberName: 'level',
            description: 'Need to check your level? here ya go.',
            examples: [`  "139412744439988224-260202843686830080": {
                            userID : "139412744439988224",
                            guildID : "260202843686830080",
                            points: 0,
                            level: 0,
                            lastSeen: 1519526066444
                          } `],
            args: [{
                    'key': 'user',
                    'label': 'user',
                    'prompt': ' ',
                    'type': 'member',
                    'default': ' ',
                    'infinite': false
                  }],
            guarded: true
        });
      }

    run(message, client) {
       
  console.log('checking levels');
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("Your current level is 0");
      message.reply({embed: {
        color: 3447003,
        description: `Your current level is ${row.level}`
      }});

    });
  }//end of run
}