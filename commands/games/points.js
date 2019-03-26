const { Command } = require('discord.js-commando');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const { oneLine } = require('common-tags');
module.exports = class PointsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'balance',
            aliases: ['check-balance','check-buddybucks','balance'],
            group: 'games',
            memberName: 'balance',
            description: `Just want to prove youre more active than your friends? run this to find out your current balance!`,
            
                     
            args: [{
              'key': 'user',
              'label': 'user',
              'prompt': ' ',
              'type': 'member',
              'default': ' ',
              'infinite': false
            }],
        });
      }

    run(message, args) {
      



          
 
      if (args.user === ' ') {
        let score = this.client.getScore.get(message.author.id, message.guild.id)
        if (!score.dotaid) {
           message.reply({embed: {
                color: 0x8a2be2,
                description: `:sparkles: You Currently Have **${Math.floor(score.points)}** Buddybucks and are Level **${score.level}**. :sparkles: `,
                value: `Run the dota command to input your dota 2 ID and unlock other dota-related commands!`
              }});

              }else{
                message.reply({embed: {
                color: 0x8a2be2,
                description: oneLine`:sparkles: You Currently Have **${Math.floor(score.points)}** Buddybucks, are Level **${score.level}**, Dota Id is **${score.dotaid}** :sparkles: `
              }});
              }
         
      } else {
        let score = this.client.getScore.get(args.user.id, message.guild.id) 
        //score= Math.floor(score);
        if (!score.dotaid) {
           message.reply({embed: {
                color: 0x8a2be2,
                description: `:sparkles: ${args.user} currently has **${Math.floor(score.points)}** Buddybucks and are Level **${score.level}**. :sparkles: `,
                value: `Run the dota command to input your dota 2 ID and unlock other dota-related commands!`
              }});

              }else{
                message.reply({embed: {
                color: 0x8a2be2,
                description: oneLine`:sparkles: ${args.user} currently has **${score.points}** BB's, is LVL **${score.level}**, Dota Id is **${score.dotaid}** :sparkles: `
              }});
              }
      }
          
  }//end of run
}