const { Command } = require('discord.js-commando');
const sql = require("sqlite");
sql.open("./score.sqlite"); 
module.exports = class PointsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'balance',
            aliases: ['check-balance','check-buddybucks','balance'],
            group: 'games',
            memberName: 'balance',
            description: `Just want to prove youre more active than your friends?
                          This command allows you to check your own balance or the balance of someone else.
                          Run \`bal\` to check your own balance or \`bal @Bob#1234\` to check someone else's.`,
            
                     
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
      }
          
  }//end of run
}