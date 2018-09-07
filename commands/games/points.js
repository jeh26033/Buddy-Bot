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
      let score = this.client.getScore.get(message.author.id, message.guild.id);

    // If the score doesn't exist (new user), initialize with defaults. 
    if (!score.dotaid) {
       message.reply({embed: {
            color: 3447003,
            description: `:sparkles: You Currently Have **${score.points}** Buddybucks and are Level **${score.level}**. :sparkles: `
          }});

          }else{
            message.reply({embed: {
            color: 3447003,
            description: oneLine`:sparkles: You Currently Have **${score.points}** Buddybucks, are Level **${score.level}**, your Dota Id is **${score.dotaid}** :sparkles: `
          }});
          }
     
          
 
     /* if (args.user === ' ') {
        sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
          if (!row) {
            message.say('You don\'t have a bank account! Creating one now...');
            sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 0, 0]);
            message.say('Account created.');
            return;
          }
          message.reply({embed: {
            color: 3447003,
            description: `You currently have ${row.points} Buddybucks.`
          }});
        })
          .catch(err => {
            if (err) console.error(`${err} \n${err.stack}`);
            sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER)').then(() => {
              sql.run('INSERT INTO scores (userId , points) VALUES (?, ?)', [message.author.id, 0]);
            });
          });
      } else {
        sql.get(`SELECT * FROM scores WHERE userId ="${args.user.id}"`).then(row => {
          if (!row) {
            message.reply(`The user ${args.user.user.tag} doesn't have a bank account!
            Have them run this command to create one.`);
            return;
          }
          message.reply({embed: {
            color: 3447003,
            description: `${args.user.user.tag} currently has ${row.points} Buddybucks.`
          }});
          
        });
      }*/
          
  }//end of run
}